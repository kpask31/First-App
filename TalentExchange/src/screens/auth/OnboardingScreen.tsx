import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const OnboardingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Onboarding</Text>
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

export default OnboardingScreen;