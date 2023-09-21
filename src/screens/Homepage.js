import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { head1 } from '../common/formcss';
import { button1 } from '../common/button';
import pattern from '../../assets/pattern.png';


const Homepage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* <Image style= {styles.patternbg} source={pattern}/> */}

      <View style={styles.header}>
        <View style={styles.headerContent}>
        <Text style={head1}>Courses</Text>
        </View>

        <View style={styles.courseContainer}>

          <View style={styles.courseBlock}>
            <TouchableOpacity style={styles.courseNameContainer} onPress={()=>navigation.navigate('quizStart' ,{ data: 'Java Script Quiz' })}>
              <Text style={styles.courseName}>Javascript</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.courseNameContainer} onPress={()=>navigation.navigate('quizStart', { data: 'NodeJS Quiz' })}>
              <Text style={styles.courseName}>NodeJS</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.courseBlock}>
            <TouchableOpacity style={styles.courseNameContainer} onPress={()=>navigation.navigate('quizStart', { data: 'Angular Quiz' })}>
              <Text style={styles.courseName}>Angular</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.courseNameContainer} onPress={()=>navigation.navigate('quizStart', { data: 'React Native Quiz' })}>
              <Text style={styles.courseName}>React Native</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.courseBlock}>
            <TouchableOpacity style={styles.courseNameContainer} onPress={()=>navigation.navigate('quizStart', { data: 'HTML Quiz' })}>
              <Text style={styles.courseName}>HTML</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.courseNameContainer} onPress={()=>navigation.navigate('quizStart', { data: 'CSS Quiz' })}>
              <Text style={styles.courseName}>CSS</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>



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

export default Homepage

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    // height: '100%',
    // display: 'flex',
    // justifyContent:'center',
    // alignItems: 'center',
    marginTop: 20,
    flex : 1,
  },
    patternbg:{
        position : 'absolute',
        top : 40,
        // width : '100%',
        // height : '100%',
        zIndex: -1,
    },
  header: {
    // height: '85%',
    flex: 1,
    margin: 5,
  },
  courseContainer:{
    // height:'10%',
    flex: 1,
    // justifyContent: 'center',
    // alignItems:'center',
  },
  courseBlock:{
    // height:'50%',
    flex: 5,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    // backgroundColor:'blue',

  },
  courseNameContainer:{
    // height:'auto'
    alignItems: 'center',
    width: '45%',
    // padding: 30,
    margin: 10,
    borderRadius: 25,
    backgroundColor:'#FFB0CC',
    padding:40,
  },
  courseName:{
    color:'black',
    fontWeight:'bold',
    fontSize: 18,
  },
  footer: {
    justifyContent: 'space-around',
    alignItems:'center',
    display:'flex',
    flexDirection:'row',
    margin: 20,
    gap : 100,
    padding: 30,
  },
})