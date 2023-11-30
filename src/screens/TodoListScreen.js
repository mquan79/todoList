import React, { useState, useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment'; 
import * as api from '../components/apiCustomer';
import { useSelector } from 'react-redux';

const TodoListScreen = () => {
  const [todoList, setTodoList] = useState([]);
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState(new Date());
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const fetchData = async () => {
    try {
      const data = await api.get('todoLists');
      setTodoList(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const todoListOfUser = todoList.filter((item) => item.idUser === user._id);

  const handleTodoList = async () => {
    if (text.trim() === '') {
      return;
    }

    const data = {
      title: text,
      description: description,
      time: time,
      idUser: user._id,
    };

    try {
      await api.add(data, 'todoLists');
      fetchData();
    } catch (e) {
      console.error(e);
    }

    setText('');
    setDescription('');
    setTime(new Date());
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleTimeConfirm = (selectedTime) => {
    setTime(selectedTime);
    hideTimePicker();
  };

  const getTimeDifference = (itemTime) => {
    const currentTime = moment();
    const itemMoment = moment(itemTime);

    const diffInMinutes = itemMoment.diff(currentTime, 'minutes');
    const formattedDiff = moment.duration(diffInMinutes, 'minutes').humanize(true);

    return formattedDiff;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.heading}>TODO LIST</Text>
      <ScrollView>
        {todoListOfUser.map((item) => (
          <View key={item.id} style={styles.todoItem}>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>
              {item.time ? `Còn lại: ${getTimeDifference(item.time)}` : 'No time set'}
            </Text>
          </View>
        ))}
      </ScrollView>

      <TextInput
        style={styles.input}
        placeholder='Công việc...'
        onChangeText={(inputText) => setText(inputText)}
        value={text}
      />
      <TextInput
        style={styles.input}
        placeholder='Miêu tả...'
        onChangeText={(inputText) => setDescription(inputText)}
        value={description}
      />

      <TouchableOpacity style={styles.addButton} onPress={showTimePicker}>
        <Text>{time ? new Date(time).toISOString() : 'No time set'}</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode='time'
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleTodoList}>
        <Text>Thêm</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  todoItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
});



export default TodoListScreen;
