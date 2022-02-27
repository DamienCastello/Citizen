import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Actualities"
        onPress={() => navigation.navigate('Actualities')}
      />
    </View>
  );
}


export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});