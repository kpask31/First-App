import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const CreateTaskScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Create Task</Text>
      <Text variant="bodyLarge">Coming soon...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default CreateTaskScreen;
