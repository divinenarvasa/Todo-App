import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Task = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        {/* Edit button */}
        <TouchableOpacity onPress={props.onEdit}>
          <Text style={styles.editText}>✎</Text>
        </TouchableOpacity>
        {/* Delete button */}
        <TouchableOpacity onPress={props.onDelete}>
          <Text style={styles.deleteText}>x</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#12372A',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#ADBC9F',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    color: 'white',
    maxWidth: '70%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editText: {
    color: '#FBFADA',
    fontSize: 18,
    marginRight: 10,
  },
  deleteText: {
    color: '#FBFADA',
    fontSize: 18,
  },
});

export default Task;
