import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../../store';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useAppSelector(state => state.auth);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Card style={styles.welcomeCard}>
          <Card.Content>
            <Text variant="headlineSmall">Welcome back, {user?.name || 'User'}!</Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              Credit Balance: {user?.creditBalance || 0} credits
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge">Recent Activity</Text>
            <Text variant="bodyMedium" style={styles.placeholder}>
              No recent activity
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge">Quick Actions</Text>
            <Button
              mode="outlined"
              onPress={() => navigation.navigate('Browse')}
              style={styles.actionButton}
            >
              Browse Tasks
            </Button>
            <Button
              mode="outlined"
              onPress={() => navigation.navigate('Messages')}
              style={styles.actionButton}
            >
              View Messages
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('CreateTask')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  welcomeCard: {
    marginBottom: 16,
    backgroundColor: '#2563EB',
  },
  subtitle: {
    marginTop: 8,
    color: '#E5E7EB',
  },
  card: {
    marginBottom: 16,
  },
  placeholder: {
    marginTop: 8,
    color: '#6B7280',
  },
  actionButton: {
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default HomeScreen;