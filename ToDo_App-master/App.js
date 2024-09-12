import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Switch, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Task from './components/Task';
import { Appearance } from 'react-native';

// Create the Stack Navigator
const Stack = createStackNavigator();

// History Screen
const HistoryScreen = ({ navigation, route }) => {
  const { taskHistory, isDarkMode } = route.params;
  const styles = isDarkMode ? darkStyles : lightStyles; // Use the appropriate styles

  return (
    <View style={styles.historyContainer}>
      <Text style={styles.historyTitle}>Task History</Text>
      {taskHistory.map((item, index) => (
        <Text key={index} style={styles.historyItem}>{item}</Text>
      ))}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.closeButton}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

// Main App Screen
const MainScreen = ({ navigation }) => {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const [taskHistory, setTaskHistory] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // State to manage dark mode

  const colorScheme = useColorScheme(); // Get the system color scheme

  useEffect(() => {
    // Automatically set dark mode based on system preference
    setIsDarkMode(colorScheme === 'dark');
  }, [colorScheme]);

  // Handle adding a task
  const handleAddTask = () => {
    if (task) {
      if (isEditing) {
        const updatedTasks = [...taskItems];
        updatedTasks[editingIndex] = task;
        setTaskItems(updatedTasks);
        setIsEditing(false);
        setEditingIndex(null);
      } else {
        setTaskItems([...taskItems, task]);
      }
      setTask('');
    }
  };

  // Handle task completion and save to history
  const completeTask = (index) => {
    const itemsCopy = [...taskItems];
    const completedTask = itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    setTaskHistory([...taskHistory, completedTask[0]]);
  };

  // Handle edit task
  const handleEditTask = (index) => {
    setTask(taskItems[index]);
    setIsEditing(true);
    setEditingIndex(index);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const styles = isDarkMode ? darkStyles : lightStyles; // Choose styles based on mode

  return (
    <View style={styles.container}>
      {/* Header with History Button */}
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Daily Doer!</Text>
        <TouchableOpacity onPress={() => navigation.navigate('History', { taskHistory, isDarkMode })}>
          <Text style={styles.historyButton}>History</Text>
        </TouchableOpacity>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
        />
      </View>

      {/* Tasks List */}
      <View style={styles.tasksWrapper}>
        <View style={styles.items}>
          {taskItems.map((item, index) => (
            <Task 
              key={index} 
              text={item} 
              onDelete={() => completeTask(index)} 
              onEdit={() => handleEditTask(index)}
              isDarkMode={isDarkMode} // Pass dark mode to Task component
            />
          ))}
        </View>
      </View>

      {/* Input Section */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder="Write a task"
          placeholderTextColor={isDarkMode ? '#AAAAAA' : '#888888'}
          value={task}
          onChangeText={text => setTask(text)}
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>{isEditing ? '✔️' : '+'}</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

// Main App Component with Navigation
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Light and Dark Styles
const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFADA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#12372A',
  },
  historyButton: {
    color: '#12372A',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tasksWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#436850',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#436850',
    borderWidth: 1,
  },
  addText: {
    color: '#436850',
  },
  historyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBFADA',
    padding: 20,
  },
  historyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#12372A',
  },
  historyItem: {
    fontSize: 18,
    marginBottom: 10,
    color: '#12372A',
  },
  closeButton: {
    color: 'red',
    fontSize: 16,
    marginTop: 20,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 80,
    color: '#12372A',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  historyButton: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tasksWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#333333',
    borderRadius: 60,
    borderColor: '#888888',
    borderWidth: 1,
    width: 250,
    color: '#FFFFFF',
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#333333',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#888888',
    borderWidth: 1,
  },
  addText: {
    color: '#FFFFFF',
  },
  historyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 20,
  },
  historyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  historyItem: {
    fontSize: 18,
    marginBottom: 10,
    color: '#FFFFFF',
  },
  closeButton: {
    color: 'lightcoral',
    fontSize: 16,
    marginTop: 20,
  },
});
