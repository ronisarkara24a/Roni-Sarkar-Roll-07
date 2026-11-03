
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
} from 'react-native';

export default function App() {

  const [task, setTask] = useState('');

  const [tasks, setTasks] = useState([
    { id: '1', title: 'Learn React Native', completed: false },
    { id: '2', title: 'Complete Lab Task', completed: true },
    { id: '3', title: 'Practice JavaScript', completed: false },
  ]);

  // Add New Task
  const addTask = () => {
    if (task.trim() === '') {
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: task.trim(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask('');
  };

  // Complete or Incomplete Task
  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  // Remaining Tasks
  const remainingTasks = tasks.filter(
    (item) => !item.completed
  ).length;

  // Render Task
  const renderTask = ({ item }) => (
    <View style={styles.taskCard}>

      <TouchableOpacity
        style={[
          styles.checkbox,
          item.completed && styles.checkedBox
        ]}
        onPress={() => toggleTask(item.id)}
      >
        <Text style={styles.checkText}>
          {item.completed ? '✓' : ''}
        </Text>
      </TouchableOpacity>

      <Text
        style={[
          styles.taskText,
          item.completed && styles.completedText
        ]}
      >
        {item.title}
      </Text>

      <TouchableOpacity
        onPress={() => deleteTask(item.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>

    </View>
  );

  return (
    <View style={styles.container}>

      <StatusBar
        backgroundColor="#F5F7FB"
        barStyle="dark-content"
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Hello, Welcome! 👋
        </Text>

        <Text style={styles.heading}>
          My Todo List
        </Text>

        <Text style={styles.subtitle}>
          Organize your daily tasks
        </Text>
      </View>

      {/* Task Counter */}
      <View style={styles.counterCard}>
        <View>
          <Text style={styles.counterTitle}>
            Remaining Tasks
          </Text>

          <Text style={styles.counterNumber}>
            {remainingTasks}
          </Text>
        </View>

        <Text style={styles.counterIcon}>📋</Text>
      </View>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new task..."
          placeholderTextColor="#999"
          value={task}
          onChangeText={setTask}
          onSubmitEditing={addTask}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={addTask}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <Text style={styles.sectionTitle}>
        Today's Tasks
      </Text>

      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No tasks yet. Add a new task!
          </Text>
        }
      />

      <Text style={styles.footer}>
        Stay Productive! Keep Going 🚀
      </Text>

    </View>
  );
}

// Styling
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    padding: 20,
    paddingTop: 55,
  },

  header: {
    marginBottom: 25,
  },

  greeting: {
    fontSize: 16,
    color: '#777',
  },

  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 5,
  },

  subtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },

  counterCard: {
    backgroundColor: '#6257E8',
    borderRadius: 18,
    padding: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },

  counterTitle: {
    color: '#FFFFFF',
    fontSize: 15,
  },

  counterNumber: {
    color: '#FFFFFF',
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 5,
  },

  counterIcon: {
    fontSize: 45,
  },

  inputContainer: {
    flexDirection: 'row',
    marginBottom: 25,
    gap: 10,
  },

  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 15,
    height: 55,
    borderWidth: 1,
    borderColor: '#E5E5EF',
  },

  addButton: {
    width: 55,
    height: 55,
    backgroundColor: '#6257E8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 30,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 15,
  },

  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 2,
  },

  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderColor: '#6257E8',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkedBox: {
    backgroundColor: '#6257E8',
  },

  checkText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  taskText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    marginLeft: 12,
  },

  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },

  deleteButton: {
    padding: 5,
  },

  deleteText: {
    color: '#FF5252',
    fontSize: 20,
    fontWeight: 'bold',
  },

  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 30,
  },

  footer: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 15,
    fontSize: 13,
  },

});
