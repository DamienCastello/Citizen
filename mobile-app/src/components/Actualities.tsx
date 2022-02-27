import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

function Actualities({ navigation, actualities }) {
  
  return (
    <View style={styles.container}>
      <Text>Atulities Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
      { actualities.map((actuality) => {
        <Text>{ actuality.title }</Text>
      }) }
    </View>
  );
}
export default Actualities;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});