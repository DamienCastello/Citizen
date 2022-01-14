import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../../utilities/Context';

function DetailsScreen({navigation}) {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title="Sign out"
        onPress={() => {
          signOut()
        }}
      />
    </View>
  );
}


export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});