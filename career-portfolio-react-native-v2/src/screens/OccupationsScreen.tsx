import React, { useState, useCallback } from "react";
import { View, Platform, FlatList } from "react-native";
import {
  Divider,
  Layout,
  TopNavigation,
  StyleService,
  Button,
  Icon,
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
import { getTasksByOccupation, handleErrorResponse } from "../helpers/utils";
import alert from "../components/CustomAlert";
import CustomText from "../components/CustomText";
import OccupationCard from "../components/OccupationCard";
import OccupationsLoading from "../components/loading/OccupationsLoading";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import SelectedOccupationCard from "../components/SelectedOccupationCard";

interface Values {
  occupation: string;
}

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const HelpIcon = (props) => (
  <Icon {...props} name="question-mark-circle-outline" />
);

const username = "singapore_university";
const password = "3594cgj";
const token = Buffer.from(`${username}:${password}`).toString("base64");

const OccupationsScreen = ({ navigation }) => {
  const form = useAppSelector((state) => state.form);
  const [loading, setLoading] = useState(false);
  const [occupations, setOccupations] = useState<string[]>();
  const [chosenOccupation, setChosenOccupation] = useState();
  const [userInput, setUserInput] = useState<string>();

  const dispatch = useAppDispatch();

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
        const data = getTasksByOccupation(chosenOccupation).map((e) => {
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

  const handleSubmitForm = async (values: Values) => {
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

      const titles: string[] = [];
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
        title="Choose Your Occupation"
        alignment="center"
        accessoryLeft={BackAction}
        accessoryRight={HelpAction}
      />
      <Divider />
      <Layout style={styles.layout}>
        <CustomText style={styles.title} bold>
          What is your occupation?
        </CustomText>
        <SelectedOccupationCard occupation={chosenOccupation} />
        <Formik
          initialValues={{ occupation: "" }}
          onSubmit={handleSubmitForm}
          validationSchema={SearchSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <Input
                label="Search Occupations"
                returnKeyType="next"
                size="large"
                placeholder="Enter your occupation here"
                value={values.occupation}
                onChangeText={handleChange("occupation")}
                onBlur={handleBlur("occupation")}
              />
              <Button
                style={styles.button}
                onPress={() => handleSubmit()}
                appearance="outline"
                accessoryRight={loading ? LoadingIndicator : null}
              >
                SEARCH
              </Button>
              <FlatList
                style={styles.flatList}
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
  title: {
    fontSize: 26,
    marginBottom: 10,
  },
  flatList: {
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
