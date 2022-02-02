import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

function SignUpScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>SignUp Screen</Text>
      <Button
        title="Go to SignUp"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}


export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});