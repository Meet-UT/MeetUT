import React, {useState} from 'react'
import {View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, ImageBackground, Alert} from 'react-native'

const cfg = require('../cfg.json')
const presenter = require('../Presenter')
const {height, width} = Dimensions.get('window');
const secureStore = require('../../SecureStore')
const image = require('../../assets/bg.png');
const signupSubmit = async (firstName, lastName, email, password, confirm, props) => {
    try {
        const url = cfg.domain + cfg.signup
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                _id: email,
                password: password,
                confirm: confirm
            })
        });

        const responseJson = await response.json();
        if (response.status === 200) {
            await secureStore.Save('UserId', email);
            await secureStore.Save('JWT', responseJson.accessToken);
            await secureStore.Save('RefreshToken', responseJson.refreshToken)
            props.navigation.navigate({
                routeName: 'Verification'
            })
        } else if (response.status === 400) {
            Alert.alert(responseJson.error)
        }
    } catch (error) {
        console.log(error)
        Alert.alert(presenter.internalError())
    }
}


const SignupScreen = props => {
    const [email, onChangeEmail] = useState("");
    const [password, onChangePassword] = useState("");
    const [confirm, onChangeNumber] = useState("");
    const [firstName, onChangeFirstName] = useState("");
    const [lastName, onChangeLastName] = useState("");

    return (
        <View style={styles.bg}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <Text style={styles.header}>
                    Sign Up
                </Text>
                <View>
                    <TextInput
                        style={styles.Input}
                        onChangeText={onChangeFirstName}
                        value={firstName}
                        placeholder="first name"
                        placeholderTextColor="white"
                    />
                    <TextInput
                        style={styles.Input}
                        onChangeText={onChangeLastName}
                        value={lastName}
                        placeholder="last name"
                        placeholderTextColor="white"
                    />
                    <TextInput
                        style={styles.Input}
                        onChangeText={onChangeEmail}
                        value={email}
                        placeholder="email"
                        placeholderTextColor="white"
                    />
                    <TextInput
                        style={styles.Input}
                        onChangeText={onChangePassword}
                        value={password}
                        secureTextEntry={true}
                        placeholder="password"
                        placeholderTextColor="white"
                    />

                    <TextInput
                        style={styles.Input}
                        onChangeText={onChangeNumber}
                        value={confirm}
                        secureTextEntry={true}
                        placeholder="confirm password"
                        placeholderTextColor="white"
                    />
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            signupSubmit(firstName, lastName, email, password, confirm, props)
                        }}
                        style={styles.Button}>
                        <Text style={styles.font}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>

        </View>


    );
};

const styles = StyleSheet.create({
    bg: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    Input: {
        marginTop: height * 0.03,
        marginLeft: width * 0.15,
        height: height * 0.06,
        width: width * 0.7,
        borderRadius: 5,
        borderWidth: 2,
        padding: 10,
        borderColor: "white",
        color: "white"
    },
    Button: {
        width: width * 0.6,
        height: height * 0.06,
        marginTop: height * 0.03,
        marginLeft: width * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: 'white',
    },
    header: {
        fontSize: 50,
        marginLeft: width * 0.27,
        color: "white",
        fontFamily: 'timeburner',
    },
    font: {
        fontFamily: 'timeburner',
        fontSize: 18,
        color: "#0E0EA1",
        fontWeight: "500"
    }
});

export default SignupScreen;