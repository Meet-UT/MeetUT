import React, {useState, useEffect} from 'react'
import {
    View,
    Text,
    BackHandler,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    Alert,
    ActivityIndicator, StyleSheet
} from 'react-native'
import {styles} from '../styles'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {NavigationActions, StackActions} from "react-navigation";
const image = require('../../assets/bg.png')
const handler = require('../Handler')
const fixer = require('../Fixer')
const endpoints = require('../../API_endpoints.json')
const texts = require("../../assets/Texts.json");



const LoginScreen = props => {
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', () => true)
    }, [])
    const [email, onChangeEmail] = useState("");
    const [password, onChangePassword] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const renderLoadingIcon = () => {
        if(isLoading){
            return(
                <ActivityIndicator size="large" style={inpageStyle.loading} color="#ffffff" />
            )
        }
    }
    const loginSubmit = async (email, password, props) => {
        setIsLoading(true)
        const body = {
            _id: fixer.email(email),
            password: password
        }
        const response = await handler.sendRequest(
            endpoints.Server.User.Auth.Login,
            texts.HTTP.Post,
            body,
            false,
            props
        )

        if(response.ok){
            const responseJson = await response.json();
            await AsyncStorage.setItem('accessToken', responseJson.accessToken)
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Home' })],
            });
            props.navigation.dispatch(resetAction)
            setIsLoading(false)
        }
        setIsLoading(false)
    }

    return (
        <View style={styles.empty}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View>
                    <Text style={styles.header}>
                        {texts.Global.Common.Login}
                    </Text>

                    <TextInput
                        style={styles.Input}
                        onChangeText={onChangeEmail}
                        value={email}
                        placeholder={texts.Global.Common.Email}
                        placeholderTextColor="white"
                        autoCapitalize='none'
                    />
                    <TextInput
                        style={styles.Input}
                        onChangeText={onChangePassword}
                        value={password}
                        secureTextEntry={true}
                        placeholder={texts.Global.Common.Password}
                        placeholderTextColor="white"
                    />
                    <TouchableOpacity
                        onPress={() => {
                            loginSubmit(email, password, props).then()
                        }}
                        style={styles.Button}>
                        <Text style={styles.font}>{texts.Global.Common.Login}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate({
                                routeName: 'GetEmail'
                            })
                        }}
                        style={styles.Button}>
                        <Text style={styles.font}>{texts.Global.Common.ForgotPassword}</Text>
                    </TouchableOpacity>
                </View>
                {renderLoadingIcon()}
            </ImageBackground>
        </View>
    );
};

const inpageStyle = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default LoginScreen;
