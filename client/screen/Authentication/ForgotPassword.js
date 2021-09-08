import React, {useState, useEffect} from 'react'
import {View, Text, BackHandler, TextInput, ImageBackground, TouchableOpacity, Alert} from 'react-native'
import {styles} from '../styles';
import AsyncStorage from "@react-native-async-storage/async-storage";
const image = require('../../assets/bg.png');
const texts = require("../../assets/Texts.json");
const handler = require('../Handler')
const endpoints = require('../../API_endpoints.json')



const emailSubmit = async (code, props) => {
    const body = {
        verification: code
    }
    const response = await handler.sendRequest(
        endpoints.Server.User.User.ForgotPassword,
        texts.HTTP.Post,
        body,
        false,
        props
    )
    if(response.ok){
        const responseJson = await response.json();
        await AsyncStorage.setItem('accessToken', responseJson.accessToken)
        props.navigation.navigate({
            routeName: 'ResetPassword'
        })
    }
}

const resend = async (props) => {
    const email = await AsyncStorage.getItem('resetPasswordEmail')
    const response = await handler.sendRequest(
        endpoints.Server.User.User.ResendPasswordCode,
        texts.HTTP.Post,
        {_id:email},
        false,
        props
    )
    if(response.ok){
        Alert.alert("",
            texts.Alert.Message.SentCode,
            [{text: texts.Alert.Buttons.OK, onPress: () => {}}])
    }
}

const ForgotPasswordScreen = props => {
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', () => true)
    }, [])

    const [code, onChangeCode] = useState("")

    return (
        <View style={styles.empty}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View>
                    <Text style={styles.verificationHeader}>
                        {texts.Screens.Verification.Verification}
                    </Text>

                    <TextInput
                        style={styles.Input}
                        onChangeText={onChangeCode}
                        value={code}
                        placeholder={texts.Global.Common.Code}
                        placeholderTextColor="white"
                    />
                    <TouchableOpacity
                        onPress={() => {
                            resend(props).then()
                        }}
                        style={styles.Button}>
                        <Text style={styles.font}>{texts.Global.Common.ResendCode}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            emailSubmit(code, props).then()
                        }}
                        style={styles.Button}>
                        <Text style={styles.font}>{texts.Global.Common.Submit}</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
};

export default ForgotPasswordScreen;
