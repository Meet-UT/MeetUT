import React, {useState, useEffect} from 'react'
import {
    View,
    Text,
    Image,
    BackHandler,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    DevSettings,
    Alert
} from 'react-native'
import {styles} from '../styles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from '../Footer';
import { withNavigation } from 'react-navigation';
const image = require('../../assets/bg.png');
const texts = require("../../assets/Texts.json");
const handler = require('../Handler')
const endpoints = require('../../API_endpoints.json')
import avatars from '../../Avatars'

const {height, width} = Dimensions.get('window')
const signOutSubmit = async () => {
    await AsyncStorage.setItem('accessToken', "")
    DevSettings.reload()
}


const deleteButton = async (props) => {
    try {
        const response = await handler.sendRequest(
            endpoints.Server.User.User.Delete,
            texts.HTTP.Delete,
            {},
            true,
            props
        )

        if (response.ok) {
            Alert.alert("", texts.Alert.Message.Deleted)
            await AsyncStorage.setItem('accessToken', "")
            DevSettings.reload()
        } else {
            await handler.handleResponse(response, props)
        }
    } catch (error) {
        console.log(error)
    }
}

const SettingScreen = props => {
    useEffect(() => {
        getProfile().then()
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', () => true)
    }, [])

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState(0);
    const getProfile = async () => {
        const response = await handler.sendRequest(
            endpoints.Server.User.User.baseURL,
            texts.HTTP.Get,
            {},
            false,
            props
        )

        if (response.ok) {
            const responseJson = await response.json();
            setLastName(responseJson.lastName)
            setFirstName(responseJson.firstName)
            setEmail(responseJson._id)
            if (typeof responseJson.avatar !== 'undefined') {
                setAvatar(responseJson.avatar)
            }


        }
    }


    return (
        <View style={styles.empty}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View style={inpageStyle.profile}>
                    <Image style={styles.avatar} source={avatars[avatar].source}/>
                    <View style={{height: height * 0.1, marginLeft: width * 0.02}}>
                        <Text style={styles.font}>{firstName + ' ' + lastName}</Text>
                        <Text style={styles.font}>{email}</Text>
                    </View>

                </View>
                <View style={{marginTop: 0}}>
                    <TouchableOpacity
                        onPress={() => {
                            signOutSubmit(props).then()
                        }}
                        style={styles.Button}>
                        <Text style={styles.font}>{texts.Screens.Settings.SignOut}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate({
                                routeName: 'ResetPassword'
                            })
                        }}
                        style={styles.Button}>
                        <Text style={styles.font}>{texts.Screens.ResetPassword.ResetPassword}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate({
                                routeName: 'ChangeAvatar'
                            })
                        }}
                        style={styles.Button}>
                        <Text style={styles.font}>{texts.Screens.Avatar.ChangeAvatar}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            deleteButton(props).then()
                        }}
                        style={styles.Button}>
                        <Text style={styles.font}>{texts.Screens.Settings.Delete}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate({
                                routeName: 'Demographics'
                            })
                        }}
                        style={styles.Button}>
                        <Text style={styles.font}>Change preference</Text>
                    </TouchableOpacity>
                </View>
                <Footer navigation={props.navigation}/>
            </ImageBackground>

        </View>


    );
};

const inpageStyle = StyleSheet.create({
    profile: {
        position: "absolute",
        height: height * 0.1,
        width: width,
        top: 0,
        backgroundColor: "white",
        flexDirection: 'row'
    },
})
export default SettingScreen;
