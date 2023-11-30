import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { logout } from '../store/Slice/authSlice'
import { useSelector, useDispatch } from 'react-redux'

const UserScreen = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const user = useSelector((state) => state.auth.user)
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user.imageUrl }}
        style={styles.image}
      />
      <Text >{user.name}</Text>
      <Text >{user.email}</Text>
      <TouchableOpacity onPress={() => handleLogout()}>
        <Text>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  )
}

export default UserScreen

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
    image: {
      width: 200,
      height: 200,
      resizeMode: 'cover', 
    },

})