import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Leaderboard = ({ navigation, route }) => {
    const { courseId, quizId } = route.params;
    const { userData, setUserData } = ([]);
    const { userName, setUserName } = ([]);
    const { userScore, setUserScore } = ([]);
    const { isLoading, setIsLoading } = (true);


    const [leaderboardData, setLeaderboardData] = useState([]);
    const fetchLeaderboardData = async () => {
        try {
            const authToken = await AsyncStorage.getItem('authToken');
            if (!authToken) {
                navigation.navigate('login');
                return;
            }
            const response = await fetch(`http://192.168.80.120:4000/api/leader-board/${courseId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                }
            });

            if (!response.ok) {
                throw new Error('Error fetching leaderboard data');
            }

            const data = await response.json();
            console.log(data.data);
            // setUserData(data.data);
            console.log(userData)
           
        } catch (error) {
            console.error('Error fetching leaderboard data:', error);
        }
    };
    useEffect(() => {
        fetchLeaderboardData();
    }, []);

    useEffect(()=>{
        if(userData.length > 0){
            setUserName(userData.name);
            console.log(userName)
            setUserScore(userData.score);
            console.log(userScore)
            setIsLoading(false);
        }
    },[userData]);

    return (
        <View style={styles.container}>
            {isLoading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30, fontWeight: '800', color: 'black' }}>LOADING...</Text>
                </View>
            ) : (
                userName && userScore &&
                <View>
                    <View>
                        {userName.map((user, index) => (
                            <View key={index} style={styles.leaderboardItem}>
                                <Text style={styles.userName}>{`${index + 1}. ${user.name}`}</Text>
                            </View>
                        ))}
                    </View>
                    <View>
                        {userScore.map((user, index) => (
                            <View key={index} style={styles.leaderboardItem}>
                                <Text style={styles.userName}>{`${index + 1}. ${user.score}`}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
    },
    header: {
        backgroundColor: '#3498db',
        color: '#fff',
        padding: 10,
        textAlign: 'center',
        fontSize: 20,
    },
    leaderboardItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        width: '100%',
    },
    userName: {
        fontWeight: 'bold',
    },
    userScore: {
        color: '#3498db',
    },
});

export default Leaderboard;
