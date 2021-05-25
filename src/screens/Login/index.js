import React, {useRef, useState} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as logInAction from '../../actions/auth';

const Login = ({navigation}) => {
  const refInput2 = useRef(null);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(logInAction.logIn({username}));
    navigation.navigate('MenuGame');
  };
  return (
    <ScrollView style={styles.background}>
      <ImageBackground
        style={styles.backgroundImage}
        source={{
          uri: 'https://wallup.net/wp-content/uploads/2018/03/19/580133-portrait_display-vertical-pattern-digital_art-748x1330.jpg',
        }}>
        <View style={styles.container}>
          <Text style={styles.textHeader}>Let's ssssign you in.</Text>
          <Text style={styles.text}>Welcome back.</Text>
          <Text style={styles.text}>You've been missed!</Text>
          <View style={styles.formInput}>
            <TextInput
              value={username}
              onChangeText={text => {
                setUserName(text);
              }}
              style={styles.input}
              placeholder="Phone, email or username"
              placeholderTextColor="#ccc"
              onEndEditing={() => {
                refInput2.current.focus();
              }}
            />
            <TextInput
              value={password}
              onChangeText={text => {
                setPassword(text);
              }}
              style={styles.input}
              ref={refInput2}
              secureTextEntry={true}
              placeholderTextColor="#ccc"
              placeholder="Password"
            />
          </View>
          <View style={styles.controller}>
            <Text style={styles.textRegister}>
              Don't have an account?{' '}
              <Text style={{color: '#fff'}}>Register</Text>
            </Text>
            <TouchableOpacity activeOpacity={0.8} onPress={handleLogin}>
              <Text style={styles.buttonSignup}> Sign in </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#191720',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'center',
  },
  container: {
    height: windowHeight - 30 - 55,
    paddingHorizontal: 20,
  },
  textHeader: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '700',
    lineHeight: 80,
  },
  text: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '500',
    lineHeight: 40,
  },
  formInput: {
    flex: 1,
    marginTop: 70,
  },
  input: {
    color: '#ccc',
    borderColor: '#ccc',
    borderWidth: 0.5,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  textRegister: {
    color: '#ccc',
  },
  buttonSignup: {
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
    height: 50,
    borderRadius: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
export default Login;
