import { StyleSheet, Text, View, Image, TouchableOpacity , ScrollView} from 'react-native'
import React from 'react'
import { head1 } from '../common/formcss';
import { button1 } from '../common/button';
import pattern from '../../assets/pattern.png';
import { useState, useEffect } from 'react';


const Courses = ({ navigation, route }) => {
  const { itemId, categoryName } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [level, setLevel] = useState("");


  async function fetchCourses() {
    try {
      const response = await fetch(`http://192.168.38.120:4000/level/${itemId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // console.log(data)
      setLevel(data.level);
      setIsLoading(false);
      // console.log(course);

    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (<View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Text style={{ fontSize: 30, fontWeight: '800', color: 'black' }} >LOADING...</Text></View>) : (
        level && level[0] &&

        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={head1}>Level</Text>
          </View>
          <ScrollView>
            <View style={styles.courseContainer}>
              {level.map((item) => (
                <View style={styles.courseBlock} key={item._id}>
                  <TouchableOpacity style={styles.courseNameContainer} onPress={() => navigation.navigate('quizStart', { itemId: item._id, courseName: item.course_name })}>
                    <Text style={styles.courseName}>{item.course_name}</Text>
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
    </View >
  )
}

export default Courses

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
    marginTop : 15,
    flex: 5,
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