import React, {useState} from 'react'
import {View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, ImageBackground} from 'react-native'
const {height, width} = Dimensions.get('window');
const secureStore = require('../SecureStore')
const image = { uri: "https://cdn.discordapp.com/attachments/865226240779878400/865235199167299624/blue-pink-halftone-background_53876-99004.jpg" };
const signupSubmit = async (firstName, lastName, email, password, props) => {
    try {
        const url = 'https://meet-ut-2.herokuapp.com/users/create';
        const response = await fetch(url, {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                _id: email,
                password: password
            })
        });
        const responseJson = await response.json();
        await secureStore.Save('UserId', email);
        await secureStore.Save('JWT',responseJson.accessToken);
        await secureStore.Save('RefreshToken', responseJson.refreshToken)
        props.navigation.navigate({
            routeName: 'Home'
        })
    }catch (error){
        console.log(error)
    }
}

const SignupScreen = props => {
    const [email, onChangeEmail] = useState("");
    const [password, onChangePassword] = useState("");
    const [confirm, onChangeNumber] = React.useState(null);
    const [firstName, onChangeFirstName] = useState("");
    const [lastName, onChangeLastName] = useState("");

    return (
        <View style={styles.bg}>
          <ImageBackground source={image} resizeMode="cover" style={styles.image} >
          <Text style={styles.header} >
                  Login
              </Text>
          <View>
          <TextInput
              style={styles.Input}
              onChangeText={onChangeFirstName}
              value={firstName}
              placeholder="first name"
            />
            <TextInput
              style={styles.Input}
              onChangeText={onChangeLastName}
              value={lastName}
              placeholder="last name"
            />
          <TextInput
              style={styles.Input}
              onChangeText={onChangeEmail}
              value={email}
              placeholder="email"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.Input}
              onChangeText={onChangePassword}
              value={password}
              secureTextEntry={true}
              placeholder="password"
              keyboardType="numeric"
            />
            
        <TextInput
              style={styles.Input}
              onChangeText={onChangeNumber}
              value={confirm}
              secureTextEntry={true}
              placeholder="confirm password"
              keyboardType="numeric"
            />
          </View>
        <View>
          <TouchableOpacity
              onPress={() => {
                signupSubmit(firstname, lastname, email, password, props)
            }}
              style={styles.Button}>
              <Text>Sign Up</Text>
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
      borderColor: "white"
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
      fontSize:30,
      marginLeft: width * 0.38,
    }
  });

export default SignupScreen;
