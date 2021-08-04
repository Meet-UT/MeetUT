import {createStackNavigator} from 'react-navigation-stack';
import LandingScreen from './screen/Landing';
import LoginScreen from "./screen/Login";
import SignupScreen from "./screen/SIgnup";
import HomeScreen from "./screen/Home/Home";
import ChatScreen from "./screen/Chat/Chat";
import {createAppContainer} from "react-navigation";
import ChatListScreen from "./screen/Chat/ChatList";

const Navigator = createStackNavigator({
    Landing: {
        screen:LandingScreen,
        navigationOptions:{
            title:""
        }
    },
    Login: {
        screen: LoginScreen,
        navigationOptions:{
            title:""
        }
    },
    Signup: {
        screen:SignupScreen,
        navigationOptions:{
            title:""
        }
    },
    Home:{
        screen:HomeScreen,
        navigationOptions:{
            title:"",
        }
    },
    Chat:{
        screen:ChatScreen,
        navigationOptions:{
            title:""
        }
    },
    ChatList:{
        screen: ChatListScreen,
        navigationOptions:{
            title:""
        }
    }
});

export default createAppContainer(Navigator);


