import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SavedScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🔖 Saved Tab</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#171325',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
});