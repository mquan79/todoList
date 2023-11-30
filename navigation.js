import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './src/screens/LoginScreen'
import { useSelector } from 'react-redux'
import TodoListScreen from './src/screens/TodoListScreen'
import UserScreen from './src/screens/UserScreen'
import React from 'react'
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Navigation = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <NavigationContainer>
            {user ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'TodoList') {
                iconName = focused ? 'calendar' : 'calendar-o';
              } else if (route.name === 'User') {
                iconName = focused ? 'user' : 'user-o';
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="TodoList" component={TodoListScreen} options={{ headerShown: false }} />
          <Tab.Screen name="User" component={UserScreen} options={{ headerShown: false }} />
        </Tab.Navigator> ) : (
            <LoginScreen />
        ) }
    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})
