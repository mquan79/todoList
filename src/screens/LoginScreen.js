import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { loginRequest, loginSuccess, loginFailure } from '../store/Slice/authSlice'
import { useDispatch } from 'react-redux'
import * as api from '../components/apiCustomer'
const LoginScreen = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const fetchData = async() => {
    try {
      const data = await api.get('users');
      setUsers(data)
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
    fetchData();
  }, [])

  const handleLogin = () => {
    if (username === '' || password === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const user = users.find((item) => item.username === username)
    if(user) {
      if(user.password === password) {
        try {
          dispatch(loginRequest());
          dispatch(loginSuccess(user));
          Alert.alert('Thông báo', 'Đăng nhập thành công');
        } catch (error) {
          dispatch(loginFailure(error.message));
          console.log(error);
        }
      } else {
        Alert.alert('Thông báo', 'Sai mật khẩu')
      }
    } else {
      Alert.alert('Thông báo', 'Tài khoản không tồn tại')
    }

  };
  return (
    <View style={styles.container}>
      <Text>LoginScreen</Text>
      <TextInput
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity
        onPress={() => handleLogin()}
      >
        <Text style={styles.textButtonLogin}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})