import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React,{useState,useEffect} from 'react';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';



const AddUsers = () => {
  const {user} = useSelector(state => state.auth)
  const navigation = useNavigation();
  const [fcmToken,setFcmToken] = useState()
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [phone,setPhone] = useState("")
  const ref = firestore().collection('users'); 


  const storeUser = async () => {

    console.log("called")
      await ref.add({
        name,
        email,
        phone,
        creatorId:user?.uid
      })
      .then(res => {
        console.log(res)
        setName('')
        setEmail('')
        setPhone('')
        sendPushNotification()
        navigation.navigate("DashBoard")
      })
      .catch(err => console.log(err))
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
          title: 'Document Created',
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
    <View style={styles.main__container}>
      <View style={styles.form__container}>
        <View style={styles.EmailContainer}>
          <TextInput placeholderTextColor={"grey"} placeholder="Name" style={styles.inputStyles} value={name} onChangeText={txt =>setName(txt)} />
        </View>
        <View style={styles.EmailContainer}>
          <TextInput placeholderTextColor={"grey"} placeholder="Email" style={styles.inputStyles} value={email} onChangeText={txt => setEmail(txt)} />
        </View>
        <View style={styles.EmailContainer}>
          <TextInput placeholderTextColor={"grey"} placeholder="Phone No" style={styles.inputStyles} value={phone} onChangeText={txt => setPhone(txt)} />
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={() => storeUser()}>
          <Text style={{color:"white"}}>Add</Text>
        </TouchableOpacity>
      </View>
    
    </View>
  );
};

export default AddUsers;

const styles = StyleSheet.create({
  main__container: {
    width: '100%',
    height: responsiveHeight(100),
    backgroundColor: '#171717',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form__container: {
    width: '90%',
    height: '60%',
    backgroundColor: 'white',
    display:"flex",
    alignItems:'center',
    justifyContent:"space-evenly",
    flexDirection:"column"
  },
  EmailContainer: {
    width: '100%',
    height: '20%',
    // backgroundColor: '#171717',
    // backgroundColor:"red",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyles: {
    width: '90%',
    height: '48%',
    borderWidth: 1,
    borderColor: '#171717',
    borderRadius: 10,
    paddingLeft: 20,
    fontStyle: 'italic',
    color: '#171717',
    fontSize: 17,
  },
  addBtn:{
    width:"55%",
    height:"15%",
    backgroundColor:"#171717",
    display:'flex',
    alignItems:"center",
    justifyContent:"center",
    borderRadius:20
  },
  addMoreBtn:{
    width:"20%",
    height:"10%",
    backgroundColor:"green",
    borderRadius:50,
    display:"flex",
    alignItems:'center',
    justifyContent:'center'
  }
});
