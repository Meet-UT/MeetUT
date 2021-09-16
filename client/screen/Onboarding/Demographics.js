import React, {useEffect, useState} from 'react'
import {View, Image, TextInput, TouchableOpacity, ScrollView, Text, SafeAreaView, Dimensions} from 'react-native'
import SearchableDropdown from 'react-native-searchable-dropdown';
import {Picker} from '@react-native-picker/picker';
import {styles} from '../styles'
const logo =  require('../../assets/logo.png');
const {height, width} = Dimensions.get('window');

const texts = require("../../assets/Texts.json");
const handler = require('../Handler')
const endpoints = require('../../API_endpoints.json')

const Demographics = props => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [genderValue, setGenderValue] = useState("");
    const [religionValue, setReligionValue] = useState("");
    const [languageValues, setLanguageValues] = useState([]);
    const [languageOptions, setLanguageOptions] = useState([]);

    const loadUser = async () =>{
        const languageResponse = await handler.sendRequest(
            endpoints.Server.Onboarding.Questionnaire.Languages,
            texts.HTTP.Get,
            {},
            false,
            props
        )
        if (languageResponse.ok){
            const languageJson = await languageResponse.json()
            const languages = []
            for (let i = 0; i < languageJson.length; i++){
                const languageObject = languageJson[i]
                languages.push({id: languageObject.id, name: languageObject.value})
            }
            setLanguageOptions(languages)
            console.log(languageOptions)
        }
        const response = await handler.sendRequest(
            endpoints.Server.Onboarding.User.baseURL,
            texts.HTTP.Get,
            {},
            false,
            props
        )
        if(response.ok){
            const responseJson = await response.json()
            setFirstName(responseJson.firstName);
            setLastName(responseJson.lastName)
        }
    }

    const generateGenderPicker = () => {
        let items = []
        const options = texts.Screens.Demographics.Gender
        items.push(<Picker.Item key ={""} value={""} label={""} />)
        for (const option in options) {
            const value = options[option]
            items.push(<Picker.Item key ={value} value={value} label={value} />)
        }
        return items
    }
    const generateReligionPicker = () => {
        let items = []
        const options = texts.Screens.Demographics.Religions
        items.push(<Picker.Item key ={""} value={""} label={""} />)
        for (const option in options) {
            const value = options[option]
            items.push(<Picker.Item key ={value} value={value} label={value} />)
        }
        return items
    }
    const renderGenderOtherInput = () => {
        if(genderValue === texts.Screens.Demographics.Gender.Other){
            return (
                <View style={styles.pickerHeader}>
                    <Text style={styles.onboardHeaderFont}>{texts.Global.Common.Specify}</Text>
                    <TextInput
                        style={styles.picker}
                        onChangeText={setGenderValue}
                    />
                </View>
            )
        }
    }
    const renderReligionOtherInput = () => {
        if(religionValue === texts.Screens.Demographics.Religions.Other){
            return (
                <View style={styles.pickerHeader}>
                    <Text style={styles.onboardHeaderFont}>{texts.Global.Common.Specify}</Text>
                    <TextInput
                        style={styles.picker}
                        onChangeText={setReligionValue}
                    />
                </View>
            )
        }
    }

    const save = async () => {
        const body = {
            FirstName : firstName,
            LastName : lastName,
            Gender : genderValue,
            Religion: religionValue,
            Languages : languageValues,
            DateOfBirth : new Date()
        }
        const response = handler.sendRequest(
            endpoints.Server.Onboarding.Questionnaire.Demographics,
            texts.HTTP.Post,
            body,
            false
        )
        if(response.ok){
            props.navigation.navigate({
                routeName: 'Academic'
            })
        }
    }
    useEffect(() => {
        loadUser()
    }, []);

    return (
          <View style={styles.onboardContainer}>
            <View style={styles.inputHeader}>
                <Text style={styles.onboardHeaderFont}>{texts.Global.Common.Firstname}</Text>
            </View>
            <TextInput
                style={styles.onboardInput}
                onChangeText={setFirstName}
                value={firstName}
                placeholder={texts.Global.Common.Firstname}
                placeholderTextColor="black"
            />
            <View style={styles.inputHeader}>
                <Text style={styles.onboardHeaderFont}>{texts.Global.Common.Lastname}</Text>
            </View>
            <TextInput
              style={styles.onboardInput}
              onChangeText={setLastName}
              value={lastName}
              placeholder={texts.Global.Common.Lastname}
              placeholderTextColor="black"
            />
              <SearchableDropdown
                  multi={true}
                  selectedItems={languageValues}
                  onItemSelect={(item) => {
                      const items = languageValues
                      items.push(item)
                      setLanguageValues(items)
                  }}
                  onRemoveItem={(item, index) => {
                      const items = languageValues.filter(x => x.id !== item.id)
                      setLanguageValues(items)
                  }}
                  items={languageOptions}
                  itemStyle={{
                      padding: 10,
                      marginTop: 2,
                      backgroundColor: '#ddd',
                      borderColor: '#bbb',
                      borderWidth: 1,
                      borderRadius: 5,
                  }}
                  containerStyle={{ padding: 5 }}
                  itemTextStyle={{ color: '#222' }}
                  itemsContainerStyle={{ maxHeight: 140 }}
                  textInputProps={
                      {
                          placeholder: "placeholder",
                          underlineColorAndroid: "transparent",
                          style: {
                              padding: 12,
                              borderWidth: 1,
                              borderColor: '#ccc',
                              borderRadius: 5,
                          },
                          onTextChange: {}
                      }
                  }
                  listProps={
                      {
                          nestedScrollEnabled: true,
                      }
                  }
              />
            <View style={styles.pickerHeader}>
                <Text style={styles.onboardHeaderFont}>{texts.Global.Common.Gender}</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={genderValue}
                    ColorValue="black"
                    onValueChange={(itemValue, itemIndex) => setGenderValue(itemValue)}>
                    {generateGenderPicker()}
                </Picker>
            </View>
              {renderGenderOtherInput()}
            <View style={styles.pickerHeader}>
                <Text style={styles.onboardHeaderFont}>{texts.Global.Common.Religion}</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={religionValue}
                    ColorValue="black"
                    onValueChange={(itemValue, itemIndex) => setReligionValue(itemValue)}>
                    {generateReligionPicker()}
                </Picker>
            </View>
              {renderReligionOtherInput()}
            <TouchableOpacity
                style={styles.quizRightButton}
                onPress={() => save()
                }>
                <Text style={styles.quizFont}>{texts.Screens.Demographics.Buttons.SaveAndContinue}</Text>
            </TouchableOpacity>
        </View>
    );
};


export default Demographics;
