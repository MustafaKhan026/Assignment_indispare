import { StyleSheet, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React,{useState,useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import UserCard from '../src/components/UserCard';
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';
import {fetchData} from "../redux/action"

import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const DashBoard = () => {
  const { user } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.data);
  const navigation = useNavigation();
  // const [data,setData] = useState([])
  const dispatch = useDispatch();

  useEffect(()=>{
    const ref = firestore().collection('users').where('creatorId', '==', user?.uid)
    return ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        let id = doc.id

        console.log("id",id)
        const { name, email, phone,} = doc.data();
        list.push({
          name: name,
          email:email,
          phone:phone,
          id:id,
        });
      });

      // setData(list)
      dispatch(fetchData(list))
      console.log("list",list)
    });
  },[])
  return (
    <>
    <View style={styles.add__new__container}>
      <TouchableOpacity style={styles.addNew__btn} onPress={() => navigation.navigate("AddUsers")}>
        <Text style={{color:"white",fontSize:18}}>+Add More</Text>
      </TouchableOpacity>
    </View>
    <ScrollView contentContainerStyle={styles.main__container}>
      {data.map(i =>(
      <UserCard name={i.name} email={i.email} phone={i.phone} key={i.id} id={i.id}/>
      ))}
      
    </ScrollView>
    </>
  );
}

export default DashBoard;

const styles = StyleSheet.create({
  main__container: {
    height:responsiveHeight(100),
    backgroundColor: "#171717",
    alignItems: "center",
    justifyContent: "center",
  },
  add__new__container:{
    width:"100%",
    height:"10%",
    backgroundColor:"white",
    justifyContent:'center'
  },
  addNew__btn:{
    width:"30%",
    height:"70%",
    backgroundColor:"#171717",
    position:"absolute",
    right:10,
    display:'flex',
    alignItems:"center",
    justifyContent:"center",
    borderRadius:10
  }
});
