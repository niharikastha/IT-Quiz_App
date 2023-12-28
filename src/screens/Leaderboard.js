import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import profilePic from '../../assets/profileDefault.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Leaderboard = ({ navigation, route }) => {
    const { courseId, quizId } = route.params;
    const [userData, setUserData] = useState([]);
    const [topTen, setTopTen] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchLeaderboardData = async () => {
        try {
            const authToken = await AsyncStorage.getItem('authToken');
            if (!authToken) {
                navigation.navigate('login');
                return;
            }
            const response = await fetch(`http://192.168.38.120:4000/api/leader-board/${courseId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);

            if (data.data && data.data.topTen) {
                setTopTen(data.data.topTen);
                console.log(topTen+"+++++++++++++++=")
            }

            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching leaderboard data:', error);
            setIsLoading(false);
            // Handle errors, show an error message, etc.
        }
    };

    useEffect(() => {
        fetchLeaderboardData();
    }, [courseId]); 
   
    return (
        <View style={styles.container}>
            {isLoading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30, fontWeight: '800', color: 'black' }}>LOADING...</Text>
                </View>
            ) : (
                userData.length > 0 && topTen[0] && (
                    <View>
                        <Text style={styles.header}>LEADERBOARD</Text>
                        <Text style={styles.subheader}>-------- Top 10 Winners --------</Text>

                        <View style={styles.background}>
                            <View style={styles.topThreeContainer}>
                                {topTen.slice(0, 3).map((user, index) => (
                                    <View key={index} style={styles.topThreeItem}>
                                        <Text style={styles.position}>{index + 1}</Text>
                                        <Image source={profilePic} style={styles.profilePic} />
                                        <Text style={styles.userName}>{`${user.name} ${user.score} (${user.rating})`}</Text>
                                    </View>
                                ))}
                            </View>

                            <View style={styles.restContainer}>
                                {topTen.slice(3).map((user, index) => (
                                    <View key={index} style={styles.leaderboardItem}>
                                        <Text style={styles.userName}>{`${index + 4}. ${user.name}  ${user.score}  (${user.rating})`}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                )
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F50057',
        margin: 18,
        borderRadius: 25,
    },
    background: {
        padding: 10,
        borderRadius: 15,
    },
    header: {
        color: '#ffe3ed',
        padding: 0,
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subheader: {
        alignContent: 'center',
        textAlign: 'center',
        fontSize: 18,
        color: 'black',
        padding: 5,

    },

    topThreeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#ffe3ed',
        borderRadius: 15,
        padding: 10,
    },
    topThreeItem: {
        alignItems: 'center',
        flexDirection: 'column',
        flex: 1,
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },

    restContainer: {
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'center',
        textAlign: 'center',
        justifyContent: 'space-between'
    },
    leaderboardItem: {
        flexBasis: '100%', // Two users per row, adjust as needed
        padding: 18,
        borderBottomWidth: 2,
        // borderBottomColor: '#e0e0e0',
        backgroundColor: '#ffe3ed',
        borderRadius: 15,
        margin: 6,

    },
    userName: {
        fontWeight: 'bold',
        color: 'black',

    },
    userScore: {
        color: '#3498db',
    },

    position: {
        marginRight: 10,
        fontWeight: 'bold',
        fontSize: 18,
    },
});
export default Leaderboard;