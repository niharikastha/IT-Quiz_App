import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { head1 } from '../common/formcss';
import { button1 } from '../common/button';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; 


const Category = ({ navigation }) => {
    let data = "";
    const [category, setCategory] = useState("");
    const [isLoading, setIsLoading] = useState(true)
    let authToken = '';


    async function fetchCategory() {
        try {
            const authToken = await AsyncStorage.getItem('authToken');
            // console.log(authToken);

            if (authToken === null || authToken === undefined) {
                alert('Please login to access categories');
                navigation.navigate('login');
                return;
            }
            const response = await fetch("http://192.168.159.120:4000/category",{
                headers:{
                    Authorization: `Bearer ${authToken}`,
                }
            });
            if (!response.ok) {
                if (response.status === 401) {
                    alert('Please login with correct details')
                    navigation.navigate('login');
                } else {
                    alert('Network response was not ok')
                    console.error("Network response was not ok:", response.status);
                }
            }
            const data = await response.json();
            // console.log(data)
            setCategory(data.data);
            // console.log(category)
            // console.log(category[0])
            // console.log(category[0].category_name);
            setIsLoading(false);

        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }
    useEffect(() => {
        fetchCategory();
    }, []);
    return (
        <View style={styles.container}>
            {isLoading ? (<View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Text style={{ fontSize: 30, fontWeight: '800', color: 'black' }} >LOADING...</Text></View>) : (
                category && category[0] &&

                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <Text style={head1}>Category</Text>
                    </View>
                    <ScrollView>
                    <View style={styles.courseContainer}>
                        {category.map((item) => (
                            <View style={styles.courseBlock} key={item._id}>
                                <TouchableOpacity style={styles.courseNameContainer} onPress={() => navigation.navigate('courses', {CategoryId: item._id,categoryName: item.category_name})}>
                                    <Text style={styles.courseName}>{item.category_name}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                    </ScrollView>
                </View>

            )}

            <View style={styles.footer}>
                <Text style={button1} onPress={
                    () => { navigation.navigate('login') }
                }>Logout</Text>
                <Text style={button1} onPress={
                    () => { navigation.navigate('underconstruction') }
                }>Dashboard</Text>
            </View>
        </View>
    )
}

export default Category

const styles = StyleSheet.create({
    container: {
        // width: '100%',
        // height: '100%',
        // display: 'flex',
        // justifyContent:'center',
        // alignItems: 'center',
        marginTop: 20,
        flex: 1,
    },
    patternbg: {
        position: 'absolute',
        top: 40,
        // width : '100%',
        // height : '100%',
        zIndex: -1,
    },
    header: {
        // height: '85%',
        flex: 1,
        margin: 5,
    },
    courseContainer: {
        // height:'10%',
        flex: 1,
        // justifyContent: 'center',
        // alignItems:'center',
    },
    courseBlock: {
        // height:'50%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        // backgroundColor:'blue',

    },
    courseNameContainer: {
        // height:'auto'
        alignItems: 'center',
        width: '90%',
        // padding: 30,
        margin: 10,
        borderRadius: 25,
        backgroundColor: '#FFB0CC',
        padding: 40,
    },
    courseName: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
    },
    footer: {
        justifyContent: 'space-around',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        margin: 20,
        gap: 100,
        padding: 30,
    },
})