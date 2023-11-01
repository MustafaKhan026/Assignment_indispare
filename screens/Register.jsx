import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useState} from 'react';
  import {useNavigation} from '@react-navigation/native';
  import auth from '@react-native-firebase/auth';
  import {responsiveHeight} from 'react-native-responsive-dimensions';
  
  import colors from '../assets/colors';
  
  const Register = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    const signUp = async () => {
      if(email != '' && password != ''){
        await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          console.log(res);
          console.log('User account created & signed in!');
        //   storeUser(res.user.uid)
          navigation.navigate('Login');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }
  
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
  
          console.error(error);
        });
      }
      else{
        Alert.alert("Please fill all the fields correctly")
      }
    };
    return (
      <View style={styles.signUpContainer}>
        <View style={styles.signUpHeader}>
          <View style={styles.signUpHeaderTextGap}></View>
          <View style={styles.signUpHeaderTextContainer}>
            <View style={styles.signUpHeaderTextContainerInner}>
              <Text style={styles.HeaderText}>Sign Up</Text>
            </View>
          </View>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.EmailContainer}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.inputStyles}
            />
          </View>
          
          <View style={styles.EmailContainer}>
            <TextInput
              placeholder="password"
              placeholderTextColor={'grey'}
              value={password}
              onChangeText={text => setPassword(text)}
              style={styles.inputStyles}
            />
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.signUpBtn} onPress={() => signUp()}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.signUpBtn} onPress={() => navigation.navigate("Login")}>
              <Text style={styles.signUpText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  
  export default Register;
  
  const styles = StyleSheet.create({
    signUpContainer: {
      width: '100%',
      height: responsiveHeight(100),
      backgroundColor: '#171717',
    },
    signUpHeader: {
      width: '100%',
      height: '25%',
      backgroundColor: '#171717',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    signUpHeaderTextContainer: {
      width: '100%',
      height: '35%',
      backgroundColor: '#171717',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    signUpHeaderTextGap: {
      width: '100%',
      height: '35%',
      backgroundColor: '#171717',
    },
    signUpHeaderTextContainerInner: {
      width: '60%',
      height: '90%',
      // backgroundColor: '#913CF0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
    },
    HeaderText: {
      fontSize: 18,
      fontWeight: '700',
      textTransform: 'uppercase',
      fontFamily: 'Helvetica',
    },
    signUpText: {
      fontSize: 18,
      fontWeight: '600',
      textTransform: 'uppercase',
      color: colors.text,
  
      // fontFamily: 'Helvetica',
    },
    formContainer: {
      width: '100%',
      height: '55%',
      backgroundColor: '#171717',
    },
    btnContainer: {
      width: '100%',
      height: '30%',
      // backgroundColor:"blue",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    signUpBtn: {
      width: '55%',
      height: '45%',
      backgroundColor: '#913CF0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
    },
    EmailContainer: {
      width: '100%',
      height: '22%',
      backgroundColor: '#171717',
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
      height: '50%',
      borderWidth: 1,
      borderColor: '#fff',
      borderRadius: 20,
      paddingLeft: 20,
      fontStyle: 'italic',
      color: colors.text,
      fontSize: 17,
    },
    extraLogin: {
      width: '100%',
      height: '25%',
      backgroundColor: '#171717',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bottom:20
    },
  });
  