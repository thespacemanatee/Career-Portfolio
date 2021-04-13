import React, { useState, useCallback } from "react";
import { View, Platform, FlatList } from "react-native";
import {
  Divider,
  Layout,
  TopNavigation,
  StyleService,
  Button,
  Icon,
  useTheme,
  TopNavigationAction,
  Card,
} from "@ui-kitten/components";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Buffer } from "buffer";

import { handleErrorResponse } from "../helpers/utils";
import CustomTextInput from "../components/CustomTextInput";
import alert from "../components/CustomAlert";
import CustomText from "../components/CustomText";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const HelpIcon = (props) => (
  <Icon {...props} name="question-mark-circle-outline" />
);

const username = "singapore_university";
const password = "3594cgj";
const token = Buffer.from(`${username}:${password}`, "utf8").toString("base64");

const OccupationsScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [occupations, setOccupations] = useState();
  const [chosenOccupation, setChosenOccupation] = useState();

  const theme = useTheme();

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

  const SearchSchema = Yup.object().shape({
    occupation: Yup.string().required("Please enter your occupation!"),
  });

  const handleSubmitForm = async (values) => {
    const { occupation } = values;
    console.log(occupation);
    try {
      setLoading(true);
      const url = `https://services.onetcenter.org/ws/online/search?keyword=${occupation}&start=1&end=100`;
      const res = await axios.get(url, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });

      const titles = [];
      res.data.occupation.forEach((item) => {
        titles.push(item.title);
      });
      console.log(titles);
      setOccupations(titles);
    } catch (err) {
      handleErrorResponse(err);
    } finally {
      setLoading(false);
    }
  };

  const renderListItems = useCallback((itemData) => {
    const { item } = itemData;
    return (
      <Card>
        <CustomText>{item}</CustomText>
      </Card>
    );
  }, []);

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
        <Formik
          initialValues={{ occupation: "" }}
          onSubmit={handleSubmitForm}
          validationSchema={SearchSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <>
              <CustomTextInput
                label="Enter your occupation"
                returnKeyType="next"
                value={values.occupation}
                onChangeText={handleChange("occupation")}
                onBlur={handleBlur("occupation")}
                error={!!errors.occupation}
                errorText={errors.occupation}
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
              <FlatList
                data={occupations}
                renderItem={renderListItems}
                keyExtractor={(item, index) => String(index)}
                ListEmptyComponent={
                  <View style={styles.emptyComponent}>
                    <CustomText>No Occupations</CustomText>
                  </View>
                }
              />
              <Button onPress={handleSubmit}>Search</Button>
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
  emptyComponent: {
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
});
