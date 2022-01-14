import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

function SettingsScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});