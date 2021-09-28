import React, {Fragment, useEffect, useState} from 'react'
import {View, SafeAreaView, Dimensions, TouchableOpacity, ScrollView, Text, StyleSheet, SectionList} from 'react-native'
import { Picker } from 'react-native'
import {styles} from '../styles'
import {red} from "react-native-reanimated/src/reanimated2/Colors";
const {height, width} = Dimensions.get('window');

const texts = require("../../assets/Texts.json");
const handler = require('../Handler')
const endpoints = require('../../API_endpoints.json')
const lookups = require('../Lookups.json')


const Personal = props => {
    const [reasons, setReasons] = useState([]);
    const [selectedReasons, setSelectedReasons] = useState([]);
    const [projects, setProjects] = useState([]);
    const [selectedProjects, setSelectedProjects] = useState([]);
    const [renderStage, setRenderStage] = useState(0);
    const [forceUpdate, setForceUpdate] = useState(true);

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        const response = await handler.sendRequest(
            endpoints.Server.Onboarding.Questionnaire.Personal,
            texts.HTTP.Get,
            {},
            false,
            props
        )
        if(response.ok){
            const responseJson = await response.json()
            setReasons(responseJson.reasonsToJoin)
            setProjects(responseJson.projectInterests)
        }
    }
    const generateReasonsSelection = () => {
        let section = {
            title:"",
            data:reasons.sort((a,b) => {return a.id - b.id})
        }
        return [section]
    }

    const reasonSelectPress = (item) => {
        if(selectedReasons.filter(x => x.id === item.id).length === 0){
            selectedReasons.push(item)
            setSelectedReasons(selectedReasons)
        }else{
            setSelectedReasons(selectedReasons.filter(x => x.id !== item.id))
        }
        setForceUpdate(!forceUpdate)
    }

    const generateProjectSelection = () => {
        let section = {
            title:"",
            data:projects.sort((a,b) => {return a.id - b.id})
        }
        return [section]
    }
    const projectSelectPress = (item) => {
        if(selectedProjects.filter(x => x.id === item.id).length === 0){
            selectedProjects.push(item)
            setSelectedProjects(selectedProjects)
        }else{
            setSelectedProjects(selectedProjects.filter(x => x.id !== item.id))
        }
        setForceUpdate(!forceUpdate)
    }

    const getReasonItemStyle = (item) =>{
        if(selectedReasons.filter(x => x.id === item.id).length === 0){
            return inpageStyle.item
        }else{
            return inpageStyle.itemSelected
        }
    }
    const getProjectItemStyle = (item) => {
        if(selectedProjects.filter(x => x.id === item.id).length === 0){
            return inpageStyle.item
        }else{
            return inpageStyle.itemSelected
        }
    }
    const renderBody = () => {
        if(renderStage === 0){
            return(
                <Fragment>
                    <View>
                        <Text style={styles.headerFont}>What are your reasons for joining MeetUT?</Text>
                        <SectionList sections={generateReasonsSelection()}
                                     renderItem={({item}) => <Text style={getReasonItemStyle(item)} onPress={() => {
                                         reasonSelectPress(item)
                                     }}>{item.value}</Text>}
                                     keyExtractor={(item, index) => index}
                        >

                        </SectionList>
                        <Text style={styles.headerFont}>Project interests</Text>
                        <SectionList sections={generateProjectSelection()}
                                     renderItem={({item}) => <Text style={getProjectItemStyle(item)} onPress={() => {
                                         projectSelectPress(item)
                                     }}>{item.value}</Text>}
                                     keyExtractor={(item, index) => index}
                        >

                        </SectionList>
                    </View>
                </Fragment>
            )
        }else if(renderStage === 1){
            return(
                <Fragment>

                </Fragment>
            )
        }

    }
    return (
        <SafeAreaView style={styles.onboardContainer}>
            {renderBody()}
            <View style={inpageStyle.quizeFooter}>
                <TouchableOpacity
                    style={styles.quizLeftButton}
                    onPress={() => {
                        if(renderStage == 0){
                            props.navigation.navigate({
                                routeName: 'Academic'
                            })
                        }else{

                            setRenderStage(renderStage - 1)
                        }
                    }}>
                    <Text style={styles.quizFont}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.quizRightButton}
                    onPress={() => {
                        if(renderStage === 1){
                            save()
                        }else{
                            setRenderStage(renderStage + 1)
                        }
                    }}>
                    <Text style={styles.quizFont}>Next</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const inpageStyle = StyleSheet.create ({
    quizeFooter: {
        position: "absolute",
        backgroundColor: '#e1e1ea',
        height: height * 0.1,
        width: width,
        top: height*0.82
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        color: 'rgba(0,0,0,1.0)'
    },
    itemSelected:{
        padding: 10,
        fontSize: 18,
        height: 44,
        color: 'rgba(247,0,0,1.0)'
    }
})
export default Personal;
