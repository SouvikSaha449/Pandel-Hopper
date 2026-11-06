
import { View, Text, StyleSheet } from 'react-native';

export default function RoutesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🚶 Routes Tab</Text>
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