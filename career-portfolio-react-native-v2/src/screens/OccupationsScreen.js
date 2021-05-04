import React, { useState, useCallback } from "react";
import { View, Platform, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Divider,
  Layout,
  TopNavigation,
  StyleService,
  Button,
  Icon,
  useTheme,
  TopNavigationAction,
  Spinner,
  Input,
} from "@ui-kitten/components";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Buffer } from "buffer";

import { addSelection } from "../app/features/form/formSlice";
import { setAllTasks } from "../app/features/tasks/tasksSlice";
import { getTasks, handleErrorResponse } from "../helpers/utils";
import alert from "../components/CustomAlert";
import CustomText from "../components/CustomText";
import OccupationCard from "../components/OccupationCard";
import ShadowCard from "../components/ShadowCard";
import OccupationsLoading from "../components/loading/OccupationsLoading";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const HelpIcon = (props) => (
  <Icon {...props} name="question-mark-circle-outline" />
);

const username = "singapore_university";
const password = "3594cgj";
const token = Buffer.from(`${username}:${password}`).toString("base64");

const OccupationsScreen = ({ navigation }) => {
  const form = useSelector((state) => state.form);
  const [loading, setLoading] = useState(false);
  const [occupations, setOccupations] = useState();
  const [chosenOccupation, setChosenOccupation] = useState();
  const [userInput, setUserInput] = useState();

  const dispatch = useDispatch();

  const theme = useTheme();

  const LoadingIndicator = (props) => {
    const { style } = props;
    return (
      <View style={[style, styles.indicator]}>
        <Spinner size="small" />
      </View>
    );
  };

  const BackAction = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={() => {
        if (Platform.OS === "web") {
          window.history.back();
        } else {
          navigation.goBack();
        }
      }}
    />
  );

  const HelpAction = () => (
    <TopNavigationAction
      icon={HelpIcon}
      onPress={() => {
        alert(
          "Help",
          "If you are unemployed, please enter your previous occupation."
        );
      }}
    />
  );

  const handleNavigation = () => {
    if (chosenOccupation) {
      if (chosenOccupation !== form.onet_title) {
        const payload = {
          inputTitle: userInput,
          onetTitle: chosenOccupation,
          titleId: Date.now(),
        };
        const data = getTasks(chosenOccupation).map((e) => {
          return {
            task: e.Task,
            taskId: e["Task ID"],
            IWA_Title: e["IWA Title"],
            task_type: "supplementary",
            deleted: false,
          };
        });
        dispatch(addSelection(payload));
        dispatch(setAllTasks(data));
      }
      navigation.navigate("CoreTasks");
    } else {
      alert("Error", "Please choose an occupation!");
    }
  };

  const SearchSchema = Yup.object().shape({
    occupation: Yup.string(),
  });

  const handleSubmitForm = async (values) => {
    const { occupation } = values;
    setUserInput(occupation);
    try {
      setLoading(true);
      const url = `https://thingproxy.freeboard.io/fetch/https://services.onetcenter.org/ws/online/search?keyword=${occupation}&start=1&end=100`;
      const res = await axios.get(url, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });

      const titles = [];
      res.data.occupation.forEach((item) => {
        titles.push(item.title);
      });
      setOccupations(titles);
    } catch (err) {
      handleErrorResponse(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOnPress = (value) => {
    setChosenOccupation(value);
  };

  const renderListItems = useCallback((itemData) => {
    return (
      <OccupationCard onPress={handleOnPress}>{itemData.item}</OccupationCard>
    );
  }, []);

  const renderEmptyComponent = () =>
    loading ? (
      <OccupationsLoading />
    ) : (
      <View style={styles.emptyComponent}>
        <CustomText bold>NO OCCUPATIONS FOUND</CustomText>
      </View>
    );

  return (
    <View style={styles.screen}>
      <TopNavigation
        title="What is your occupation?"
        alignment="center"
        accessoryLeft={BackAction}
        accessoryRight={HelpAction}
      />
      <Divider />
      <Layout style={styles.layout}>
        <ShadowCard style={styles.selectedOccupation}>
          <CustomText bold>Selected Occupation</CustomText>
          <CustomText numberOfLines={1}>
            {chosenOccupation || "Please choose an occupation"}
          </CustomText>
        </ShadowCard>
        <Formik
          initialValues={{ occupation: "" }}
          onSubmit={handleSubmitForm}
          validationSchema={SearchSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <>
              <Input
                label="Search Occupations"
                returnKeyType="next"
                size="large"
                placeholder="Enter your occupation here"
                value={values.occupation}
                onChangeText={handleChange("occupation")}
                onBlur={handleBlur("occupation")}
                accessoryRight={(props) => {
                  return (
                    !!errors.occupation && (
                      <Icon
                        {...props}
                        name="alert-circle-outline"
                        fill={theme["color-danger-700"]}
                      />
                    )
                  );
                }}
              />
              <Button
                style={styles.button}
                onPress={handleSubmit}
                appearance="outline"
                accessoryRight={loading ? LoadingIndicator : null}
              >
                SEARCH
              </Button>
              <FlatList
                data={occupations}
                renderItem={renderListItems}
                keyExtractor={(item, index) => String(index)}
                ListEmptyComponent={renderEmptyComponent}
                contentContainerStyle={styles.contentContainer}
              />
              <Button onPress={handleNavigation}>NEXT</Button>
            </>
          )}
        </Formik>
      </Layout>
    </View>
  );
};

export default OccupationsScreen;

const styles = StyleService.create({
  screen: {
    flex: 1,
  },
  layout: {
    flex: 1,
    padding: 10,
  },
  selectedOccupation: {
    height: 75,
    padding: 10,
    marginVertical: 5,
  },
  contentContainer: {
    flexGrow: 1,
  },
  button: {
    marginVertical: 10,
  },
  emptyComponent: {
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  indicator: {
    position: "absolute",
    right: 0,
  },
});
