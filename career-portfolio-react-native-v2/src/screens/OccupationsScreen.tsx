import React, { useState, useCallback, useEffect } from "react";
import { View, FlatList, Alert, Keyboard, Pressable } from "react-native";
import { StyleService, Button, useTheme } from "@ui-kitten/components";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Buffer } from "buffer";
import {
  ONET_USERNAME,
  ONET_PASSWORD,
  ONET_ENDPOINT,
} from "react-native-dotenv";
import { useFocusEffect } from "@react-navigation/native";

import { addSelection } from "../app/features/form/formSlice";
import { setAllTasks } from "../app/features/tasks/tasksSlice";
import { getTasksByOccupation, handleErrorResponse } from "../helpers/utils";
import CustomText from "../components/CustomText";
import OccupationsLoading from "../components/loading/OccupationsLoading";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import SelectedOccupationCard from "../components/SelectedOccupationCard";
import OccupationCard from "../components/OccupationCard";
import CustomTextInput from "../components/CustomTextInput";
import {
  navigationRef,
  submissionProgressRef,
} from "../navigation/NavigationHelper";
import ListEmptyComponent from "../components/ListEmptyComponent";
import SectionTitle from "../components/SectionTitle";
import { TaskObject } from "../types";

interface Values {
  occupation: string;
}

const OccupationsScreen = ({ navigation }) => {
  const form = useAppSelector((state) => state.form);
  const [loading, setLoading] = useState(false);
  const [occupations, setOccupations] = useState<string[]>();
  const [chosenOccupation, setChosenOccupation] = useState("");
  const [userInput, setUserInput] = useState<string>("");
  const [query, setQuery] = useState<Values>();

  useFocusEffect(
    useCallback(() => {
      navigationRef.current = navigation;
      submissionProgressRef.current = 0;
    }, [navigation])
  );

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (query?.occupation.length > 0) {
        handleSubmitForm(query);
      }
    }, 200);
    return () => clearTimeout(timeOutId);
  }, [query]);

  const dispatch = useAppDispatch();

  const theme = useTheme();

  const handleNavigation = () => {
    if (chosenOccupation) {
      if (chosenOccupation !== form.onet_title) {
        const payload = {
          inputTitle: userInput,
          onetTitle: chosenOccupation,
          titleId: Date.now(),
        };
        const data: TaskObject[] = getTasksByOccupation(chosenOccupation).map(
          (e) => {
            return {
              task: e.Task,
              taskId: e["Task ID"],
              IWA_Title: e["IWA Title"],
              task_type: "supplementary",
              deleted: false,
            };
          }
        );
        dispatch(addSelection(payload));
        dispatch(setAllTasks(data));
      }
      navigation.navigate("CreateSubmissionStack");
    } else {
      Alert.alert("Error", "Please choose an occupation!");
    }
  };

  const SearchSchema = Yup.object().shape({
    occupation: Yup.string().required("Please enter a valid occupation!"),
  });

  const handleSubmitForm = async (values: Values) => {
    const { occupation } = values;
    setUserInput(occupation);
    try {
      setLoading(true);
      const url = `${ONET_ENDPOINT}${occupation}&start=1&end=50`;
      const res = await axios.get(url, {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${ONET_USERNAME}:${ONET_PASSWORD}`
          ).toString("base64")}`,
        },
      });

      const titles: string[] = [];
      res.data.occupation?.forEach((item) => {
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
      userInput.length > 0 && (
        <ListEmptyComponent label="NO OCCUPATIONS FOUND" />
      )
    );

  return (
    <Pressable style={styles.screen} onPress={() => Keyboard.dismiss()}>
      <SectionTitle title="What is your occupation?">
        <CustomText style={styles.subtitle} fontFamily="semiBold">
          Please enter your{" "}
          <CustomText style={{ color: theme["color-primary-500"] }}>
            current
          </CustomText>{" "}
          occupation, or any occupations previously held.
        </CustomText>
      </SectionTitle>
      <View style={styles.selectedOccupation}>
        <SelectedOccupationCard occupation={chosenOccupation} />
      </View>
      <Formik
        initialValues={{ occupation: "" }}
        onSubmit={handleSubmitForm}
        validationSchema={SearchSchema}
      >
        {({ handleChange, handleBlur, errors, values }) => (
          <>
            <CustomTextInput
              returnKeyType="next"
              size="large"
              placeholder="Enter your occupation here"
              value={values.occupation}
              onChangeText={(text) => {
                handleChange("occupation")(text);
                setQuery({ occupation: text });
              }}
              onBlur={handleBlur("occupation")}
              errorText={errors.occupation}
              loading={loading}
            />
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
    </Pressable>
  );
};

export default OccupationsScreen;

const styles = StyleService.create({
  screen: {
    flex: 1,
    padding: 16,
  },
  subtitle: {
    fontSize: 14,
  },
  selectedOccupation: {
    marginBottom: 12,
  },
  flatList: {
    marginVertical: 12,
  },
  contentContainer: {
    flexGrow: 1,
  },
  cardContainer: {
    padding: 6,
  },
});
