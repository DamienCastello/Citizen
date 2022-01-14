import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from "../../utilities/Context";

function SettingsScreen({navigation}) {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title="sign out"
        onPress={() => signOut()}
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