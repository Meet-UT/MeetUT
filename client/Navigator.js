import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from "./screen/Authentication/Login";
import SignupScreen from "./screen/Authentication/Signup";
import HomeScreen from "./screen/Home/Home";
import ChatScreen from "./screen/Chat/Chat";
import {createAppContainer} from "react-navigation";
import ChatListScreen from "./screen/Chat/ChatList";
import Splash from './screen/Landing/Splash';
import ResetPasswordScreen from './screen/Authentication/ResetPassword';
import SettingScreen from './screen/Settings/Setting';
import VerificationScreen from './screen/Authentication/Verification'
import ForgotPasswordScreen from './screen/Authentication/ForgotPassword';
import GetEmailScreen from './screen/Authentication/GetEmail';

import DemographicsScreen from "./screen/Onboarding/Demographics";
import PersonalScreen from "./screen/Onboarding/Personal";
import AcademicScreen from "./screen/Onboarding/Academic";
import ReasonScreen from "./screen/Onboarding/Reason";
import HobbiesScreen from "./screen/Onboarding/Hobbies";
import SpecificHobbyScreen from "./screen/Onboarding/SpecificHobby"
import ProjectInterestsScreen from "./screen/Onboarding/Project-interests"
import IndustryScreen from "./screen/Onboarding/Industry"
import {Dimensions} from 'react-native';

import * as Font from 'expo-font';
import { forestgreen } from 'color-name';
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

    Demographics:{
        screen: DemographicsScreen,
        navigationOptions:{
            title:"Onboarding",
            headerStyle: {
                backgroundColor: '#3590F2',
            },
            headerLeft: ()=> null,
            headerTintColor: '#ffff',
            headerTitleStyle: {
                fontFamily: "timeburner",
                fontSize: 30,
                marginLeft: width * 0.23
            },
        }

    },
    Personal:{
        screen: PersonalScreen,
        navigationOptions:{
            title:"Onboarding",
            headerStyle: {
                backgroundColor: '#3590F2',
            },
            headerLeft: ()=> null,
            headerTintColor: '#ffff',
            headerTitleStyle: {
                fontFamily: "timeburner",
                fontSize: 30,
                marginLeft: width * 0.23
            },
        }

    },
    Academic:{
        screen: AcademicScreen,
        navigationOptions:{
            title:"Onboarding",
            headerStyle: {
                backgroundColor: '#3590F2',
            },
            headerLeft: ()=> null,
            headerTintColor: '#ffff',
            headerTitleStyle: {
                fontFamily: "timeburner",
                fontSize: 30,
                marginLeft: width * 0.23
            },
        }

    },
    Reason:{
        screen: ReasonScreen,
        navigationOptions:{
            title:"Onboarding",
            headerStyle: {
                backgroundColor: '#3590F2',
            },
            headerLeft: ()=> null,
            headerTintColor: '#ffff',
            headerTitleStyle: {
                fontFamily: "timeburner",
                fontSize: 30,
                marginLeft: width * 0.23
            },
        }

    },
    Hobbies:{
        screen: HobbiesScreen,
        navigationOptions:{
            title:"Onboarding",
            headerStyle: {
                backgroundColor: '#3590F2',
            },
            headerLeft: ()=> null,
            headerTintColor: '#ffff',
            headerTitleStyle: {
                fontFamily: "timeburner",
                fontSize: 30,
                marginLeft: width * 0.23
            },
        }

    },
    SpecificHobby:{
        screen: SpecificHobbyScreen,
        navigationOptions:{
            title:"Onboarding",
            headerStyle: {
                backgroundColor: '#3590F2',
            },
            headerLeft: ()=> null,
            headerTintColor: '#ffff',
            headerTitleStyle: {
                fontFamily: "timeburner",
                fontSize: 30,
                marginLeft: width * 0.23
            },
        }

    },
    ProjectInterests:{
        screen: ProjectInterestsScreen,
        navigationOptions:{
            title:"Onboarding",
            headerStyle: {
                backgroundColor: '#3590F2',
            },
            headerLeft: ()=> null,
            headerTintColor: '#ffff',
            headerTitleStyle: {
                fontFamily: "timeburner",
                fontSize: 30,
                marginLeft: width * 0.23
            },
        }

    },
    Industry:{
        screen: IndustryScreen,
        navigationOptions:{
            title:"Onboarding",
            headerStyle: {
                backgroundColor: '#3590F2',
            },
            headerLeft: ()=> null,
            headerTintColor: '#ffff',
            headerTitleStyle: {
                fontFamily: "timeburner",
                fontSize: 30,
                marginLeft: width * 0.23
            },
        }

    },
    Login: {
        screen: LoginScreen,
        navigationOptions:{
            title:"",
        }
    },
    Signup: {
        screen:SignupScreen,
        navigationOptions:{
            title:"",
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
            headerLeft: ()=> null,
            headerTintColor: '#ffff',
            headerTitleStyle: {
                fontFamily: "timeburner",
                fontSize: 30,
                marginLeft: width * 0.3
            },
        }
    },
    Verification: {
        screen: VerificationScreen,
        navigationOptions:{
            title:"",
        }
    },
    ForgotPassword: {
        screen: ForgotPasswordScreen,
        navigationOptions:{
            title:"",
        }
    },
    GetEmail: {
        screen: GetEmailScreen,
        navigationOptions:{
            title:"",
        }
    }

});

export default createAppContainer(Navigator);


