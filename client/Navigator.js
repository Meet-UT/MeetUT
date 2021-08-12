import {createStackNavigator} from 'react-navigation-stack';
import LandingScreen from './screen/Landing';
import LoginScreen from "./screen/Login";
import SignupScreen from "./screen/SIgnup";
import HomeScreen from "./screen/Home/Home";
import ChatScreen from "./screen/Chat/Chat";
import {createAppContainer} from "react-navigation";
import ChatListScreen from "./screen/Chat/ChatList";
import Splash from './screen/Splash';
import ResetPasswordScreen from './screen/ResetPassword';
import SettingScreen from './screen/Setting';
import {Dimensions} from 'react-native';

import * as Font from 'expo-font';
const customFonts = {
    'timeburner': require('./assets/fonts/timeburner_regular.ttf'),
  };
const {height, width} = Dimensions.get('window');
Font.loadAsync(customFonts);
const Navigator = createStackNavigator({
    Splash: {
        screen:Splash,
        navigationOptions:{
            title:"",
            headerShown: false
        }
    },
    Landing: {
        screen:LandingScreen,
        navigationOptions:{
            title:"",
            headerShown: false
        }
    },
    Login: {
        screen: LoginScreen,
        navigationOptions:{
            title:"",
            headerStyle: {
                backgroundColor: '#3590F2',
            },
        }
    },
    Signup: {
        screen:SignupScreen,
        navigationOptions:{
            title:"",
            headerStyle: {
                backgroundColor: '#3590F2',
            },
        }
    },
    Setting: {
        screen:SettingScreen,
        navigationOptions:{
            title:"Setting",
            headerStyle: {
                backgroundColor: '#3590F2',
            },
            headerLeft: ()=> null,
            headerTintColor: '#ffff',
            headerTitleStyle: { 
                alignSelf: 'center',
                fontFamily: "timeburner",
                fontSize: 30,
            },
        }
    },
    ResetPassword: {
        screen:ResetPasswordScreen,
        navigationOptions:{
            title:""
        }
    },
    Home:{
        screen:HomeScreen,
        navigationOptions:{
            title:"Home",
            headerStyle: {
                backgroundColor: '#3590F2',
            },
            headerLeft: ()=> null,
            headerTintColor: '#ffff',
            headerTitleStyle: { 
                alignSelf: 'center',
                fontFamily: "timeburner",
                fontSize: 30,
            },
        }
    },
    Chat:{
        screen:ChatScreen,
        navigationOptions:{
            title:"",
            headerStyle: {
                backgroundColor: '#3590F2',
            },
            headerTintColor: '#ffff',
            headerTitleStyle: { 
                alignSelf: 'center',
                fontFamily: "timeburner",
                fontSize: 30,
            },
        }
    },
    ChatList:{
        screen: ChatListScreen,
        navigationOptions:{
            title:"Chat List",
            headerStyle: {
                backgroundColor: '#3590F2',
            },
            headerTintColor: '#ffff',
            headerTitleStyle: { 
                fontFamily: "timeburner",
                fontSize: 30,
                marginLeft: width * 0.14
            },
        }
    }
});

export default createAppContainer(Navigator);


