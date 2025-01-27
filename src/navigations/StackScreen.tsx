import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAuthState } from "../redux/slices/authSlice";
import LoginScreen from "../screens/authscreens/loginScreens/LoginScreen";
import SignupScreen from "../screens/authscreens/signupscreens/SignupScreen";
import TabScreens from "./TabScreen";
import CalendarEventsScreen from "../screens/appscreens/CalendarEventsScreen";
import FlowChartsScreen from "../screens/appscreens/FlowChartsScreen";
import ResetPasswordScreen from "../screens/authscreens/loginScreens/ResetPasswordScreen";
import EmailVerificationScreen from "../screens/authscreens/signupscreens/EmailVerificationScreen";
import NduMapScreen from "../screens/appscreens/NduMapScreen";
import GPACalculator from "../screens/appscreens/GPACalculator";
import MarkerDetailsScreen from "../screens/appscreens/MarkerDetailsScreen";
import AddEventScreen from "../screens/appscreens/AddEventScreen";
import EventDetailsScreen from "../screens/appscreens/EventDetailsScreen";

const Stack = createStackNavigator();

export default function StackScreens() {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuth, user } = useSelector((state: RootState) => state.auth);
  const role = user?.role;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const loadUser = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        dispatch(setAuthState(JSON.parse(user)));
      }
    };

    const initialize = async () => {
      await loadUser();
      setIsLoading(false);
    };
    initialize();
  }, [dispatch]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuth ? (
        <>
          <Stack.Screen name="TabScreens" component={TabScreens} />
          <Stack.Screen
            name="CalendarEvents"
            component={CalendarEventsScreen}
          />
          <Stack.Screen name="FlowCharts" component={FlowChartsScreen} />
          <Stack.Screen
            name="GPACalculator"
            component={GPACalculator}
            options={{ headerShown: true, title: "GPA Calculator" }}
          />
          <Stack.Screen
            name="NduMapScreen"
            component={NduMapScreen}
            options={{
              headerShown: true,
              title: "NDU Map",
              headerStyle: {
                height: 60,
                paddingTop: 10,
              },
              headerTintColor: "#005eb8",
            }}
          />
          <Stack.Screen
            name="MarkerDetailsScreen"
            component={MarkerDetailsScreen}
          />
          <Stack.Screen name="AddEventScreen" component={AddEventScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignupScreen} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
          <Stack.Screen
            name="EmailVerificationScreen"
            component={EmailVerificationScreen}
          />
          <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
