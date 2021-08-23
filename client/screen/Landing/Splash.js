import React, {useEffect} from 'react'
import {View, Text, StyleSheet, Button, Image, Dimensions, TouchableOpacity, ImageBackground} from 'react-native'


const secureStore = require('../../SecureStore')

const {height, width} = Dimensions.get('window');

const image = require("../../assets/Splash.png");

const Splash = props => {

  const validateJWT = async(jwt) => {
      try {
          const url = 'https://meet-ut-2.herokuapp.com/auth/validateJWT';

          const response = await fetch(url, {
              method : 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  'authorization': 'Bearer ' + jwt
              }
          });
          return response.status === 200

      } catch (error) {
          console.log(error)
      }
  }
  useEffect(() => {
      secureStore.GetValue('JWT').then((jwt) =>{
          validateJWT(jwt).then(
              (result) => {
                  if(result){
                      props.navigation.navigate('Home')
                  } else {
                      props.navigation.navigate('Landing')
                  }
              }
          )
      })
    }, []);
    return (<View style={styles.bg}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      </ImageBackground>
    </View>)
}


const styles = StyleSheet.create({
  buttonContainer:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around',
},
empty:{
    flex:1
},
bg: {
    flex: 1,
},
image: {
    flex: 1,
    justifyContent: "center"
},
container: {
    paddingTop: 100,
    paddingBottom: 45,
    paddingLeft: 100,
},
logo: {
    marginTop: height * 0.05,
    marginLeft: width * 0.355,
    width: 100,
    height: 95,
},
button: {
  width: width * 0.6,
  height: height * 0.06,
  marginTop: height * 0.03,
  marginLeft: width * 0.2,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 15,
  backgroundColor: 'white',
},
text: {
    color: "#0748BB"
}

});

export default Splash;