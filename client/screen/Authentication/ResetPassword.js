import React, {useState} from 'react'
import {View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, ImageBackground} from 'react-native'
const {height, width} = Dimensions.get('window');
const secureStore = require('../../SecureStore')
const image =  require('../../assets/bg.png');
const resetSubmit = async (email, password, confirm, props) => {
    try {
        // console.log(jwt)
        // console.log(typeof(email))
        const url = 'https://meet-ut-2.herokuapp.com/users/updatePassword/' + email  // TODO: Use config
        // const url = 'http://localhost:3000/users/' + email + '/updatePasword'
        console.log(email)
        console.log(url)
        const response = await fetch(url, {
            method : 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: email,
                password: password,
                confirm: confirm
            })
        });
        console.log('response status ' + response.status)
        // console.log(response.text())
        if (response.status == 200) {
          props.navigation.navigate({
              routeName: 'Login'
          })
        }
    }catch (error){
        console.log(error)
    }
}

const ResetPasswordScreen = props => {
    const [email, onChangeEmail] = useState("");
    const [password, onChangePassword] = useState("");
    const [confirm, onChangeNumber] = useState("");

    return (
        <View style={styles.bg}>
          <ImageBackground source={image} resizeMode="cover" style={styles.image} >
          <Text style={styles.header} >
                  Reset
              </Text>
          <View>
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
                resetSubmit(email, password, confirm, props)
            }}
              style={styles.Button}>
              <Text style={styles.font}>Reset Password</Text>
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
      marginTop: height * 0.05,
      marginLeft: width * 0.2,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      backgroundColor: 'white',
    },
    header: {
      fontSize:50,
      marginLeft: width * 0.33,
      color: "white",
      fontFamily: 'timeburner',
    },
    font: {
      fontFamily: 'timeburner',
      fontSize:18,
      color: "#0E0EA1",
      fontWeight: "500"
    }
  });

export default ResetPasswordScreen;
