import { StackNavigator } from "react-navigation";
import AsyncStorage from "react-native";
import Homescreen from "./Homescreen"
import Details from "./Details"

import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyClhlrX24AECRXdq1nZvhEGdwC7BHymnNQ",
  authDomain: "myfavorities-49de3.firebaseapp.com",
  databaseURL: "https://myfavorities-49de3.firebaseio.com",
  projectId: "myfavorities-49de3",
  storageBucket: "myfavorities-49de3.appspot.com",
  messagingSenderId: "212535012908"
};
!firebase.apps.length ? firebase.initializeApp(config) : null;

const App = StackNavigator(
  {
    Homescreen: {
      screen: Homescreen,
    },
    Details: {
      screen: Details
    }
  },
  {
    initialRouteName: "Homescreen",
    mode: "modal"
  }
);
export default App;