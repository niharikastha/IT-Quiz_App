import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Review = ({ navigation, route }) => {
    const { quizId } = route.params;
    const [responseObject, setResponseObject] = useState([]);
    const [responseEachQuestion, setResponseEachQuestion] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const mounted = useRef(true);

    async function fetchQuestions() {
        try {
            const authToken = await AsyncStorage.getItem('authToken');
            if (!authToken) {
                navigation.navigate('login');
                return;
            }
            const response = await fetch(`http://192.168.29.122:4000/api/reviewQuiz/${quizId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (mounted.current) {
                setResponseObject(data.data);
                setResponseEachQuestion(data.data.quizRes);
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    }

    useEffect(() => {
        mounted.current = true;

        fetchQuestions();

        return () => {
            mounted.current = false;
        };
    }, []);

    useEffect(() => {
        console.log(responseObject);
        console.log(responseEachQuestion);
    }, [responseObject, responseEachQuestion]);

    return (
        <View>
            {isLoading ? (
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Text style={{ fontSize: 30, fontWeight: '800', color: 'black' }}>LOADING...</Text>
                </View>
            ) : (
                responseObject && responseEachQuestion && (
                    <View>
                        <Text>Hello</Text>
                    </View>
                )
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    // Your styles here
});

export default Review;
