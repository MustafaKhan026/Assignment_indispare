import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React,{useState,useEffect} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';


const UserCard = ({name,phone,email,id}) => {
    const [fcmToken,setFcmToken] = useState()
    const deleteUser = async () =>{
        try{
          const docRef = firestore().collection('users').doc(id);
       await docRef.delete().then(() => {
          console.log(`Document with ID ${id} successfully deleted.`);
        sendPushNotification()
      }).catch((error) => {
          console.error(`Error deleting document with ID ${id}: `, error);
      });
        }catch(er){
          console.log("delete err",er);
        }
      }
      const getDeviceToken = async () => {
        try {
          const token = await messaging().getToken();
          if (token) {
            console.log('Device FCM Token:', token);
            setFcmToken(token)
            return token;
          } else {
            console.log('No device token found.');
          }
        } catch (error) {
          console.error('Error getting device token:', error);
        }
      };

      const sendPushNotification = async () => {
        try {
          const message = {
            data: {
              title: 'Document Deleted',
              body:""
            },
            token: fcmToken,
          };
    
          // Send the notification
          await messaging().sendMessage(message);
          console.log('Push notification sent.');
        } catch (error) {
          console.error('Error sending push notification: ', error);
        }
      };



      useEffect(()=>{
        getDeviceToken()
      },[])


  return (
    <View style={styles.card__container}>
      <View style={styles.info__container}>
        <Text style={{ color: "black" }}>Name:{name}</Text>
      </View>
      <View style={styles.info__container}>
        <Text style={{ color: "black" }}>Email:{email}</Text>
      </View>
      <View style={styles.info__container}>
        <Text style={{ color: "black" }}>Phone:{phone}</Text>
      </View>
      <View style={styles.btn__container}>
        <TouchableOpacity style={styles.btn} onPress={() =>deleteUser()}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default UserCard;

const styles = StyleSheet.create({
  card__container: {
    width: "90%",
    height: responsiveHeight(30), // You may adjust the height as needed
    backgroundColor: "white",
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  info__container: {
    width: "100%",
    height: "25%",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn__container: {
    width: "100%",
    height: "25%",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: "50%",
    height: "75%",
    backgroundColor: "#171717",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});
