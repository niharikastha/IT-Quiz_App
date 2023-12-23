import React from 'react';
import Title from '../Components/title';
import { useEffect } from 'react';
import { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Result = ({ navigation, route }) => {
    const { score, correct, incorrect, courseId, quizId } = route.params;
    // console.log(quizId+"----------------");
    // console.log(courseId+"+++++++++++++++");
    const [quizi, setQuizi] = useState([]);
    const [quizID, setQuizID] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const resultBanner = score > 10 ? "https://cdni.iconscout.com/illustration/premium/thumb/men-celebrating-victory-4587301-3856211.png" : "https://cdni.iconscout.com/illustration/free/thumb/concept-about-business-failure-1862195-1580189.png"
    async function fetchResults() {
        try {
            const authToken = await AsyncStorage.getItem('authToken');
            if (!authToken) {
                navigation.navigate('login');
                return;
            }
            const response = await fetch(`http://192.168.159.120:4000/api/result`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setQuizi(data.data);
            setQuizID(quizi[0]);
            setIsLoading(false);
        } 
        catch (error) 
        {
            console.error("Error fetching questions:", error);
        }
    }
    useEffect(() => {
        fetchResults();
    }, []);

    return (
        <View>
            {isLoading ? (<View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Text style={{ fontSize: 30, fontWeight: '800', color: 'black' }} >LOADING...</Text></View>) : (
                    quizi && quizi[0]._id &&
                <View style={styles.container}>

                    <Title titleText='Result' />
                    {/* <Text style={styles.scoreValue}>{score}</Text>            */}
                    <View style={styles.box}>
                        <View style={styles.score_box}>
                            <View style={styles.score_text_container}>
                                <Text style={styles.score_text}>
                                    Your Score
                                </Text>
                            </View>
                            <Text style={styles.score_number}>{score}</Text>
                        </View>

                        <View style={styles.quiz_brief}>
                            <View style={styles.question_container}>
                                <Text style={styles.question}>5</Text>
                                <Text style={styles.text_1}>Questions</Text>
                            </View>
                            <View style={styles.question_container}>
                                <Text style={styles.question}>{correct}</Text>
                                <Text style={styles.text_2}>Correct</Text>
                            </View>
                            <View style={styles.question_container}>
                                <Text style={styles.question}>{incorrect}</Text>
                                <Text style={styles.text_3}>Incorrect</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bannerContainer}>
                        <Image
                            source={{
                                uri: resultBanner,
                            }}
                            style={styles.banner}
                            resizeMode="contain"
                        />
                    </View >
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('review', { quizId: quizId, courseId: courseId })}>
                            <Text style={styles.buttonText}>Review Quiz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('category')} style={styles.button}>
                            <Text style={styles.buttonText}>Leaderboard</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingHorizontal: 20,
        height: '100%',
    },
    box: {
        backgroundColor: 'white',
        padding: 25,
        borderRadius: 16,
        elevation: 7,
        marginVertical: 20,
        backgroundColor: "#ffe3ed",
    },
    score_box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#F50057',
        paddingBottom: 10,
        marginBottom: 10,
    },
    score_text_container: {
        flex: 1,
    },
    score_text: {
        fontSize: 24,
        fontWeight: '700',
        color: 'black',
    },
    score_number: {
        fontSize: 38,
        fontWeight: '900',
        color: '#F50057',

    },

    bannerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    banner: {
        height: 250,
        width: 250,
    },
    quiz_brief: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    question_container: {
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 16,
        elevation: 3,
        marginVertical: 10,
        width: 100,
    },
    question: {
        fontSize: 24,
        fontWeight: '800',
        color: 'black',
    },
    text_1: {
        fontSize: 16,
        fontWeight: '600',
        color: "black"
    },
    text_2: {
        fontSize: 16,
        fontWeight: '600',
        color: "green"
    },
    text_3: {
        fontSize: 16,
        fontWeight: '600',
        color: "red"
    },

    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        padding: 20,


    },

    button: {
        width: '100%',
        backgroundColor: '#F50057',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 30,
        elevation: 3,

    },
    buttonText: {
        fontSize: 24,
        fontWeight: '600',
        color: 'white',
    },


})

export default Result;
