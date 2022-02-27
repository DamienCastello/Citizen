import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { getActualities } from "../../services/api/client"
import useAxios from "../../hooks/useAxios"
import Actualities from "../../components/Actualities"

function AtulitiesScreen({navigation}) {
  const [globalError, setGlobalError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [actualities, setActualities] = useState(true)

  const onSuccess = (response) => {
    if (globalError) {
      setGlobalError(null)
    }
    console.log("RESPONSE : ", response)
  }

  const onFinally = () => {
    //setIsLoading(false)
  }

  const httpCodes = {
    400: (data) => {
      setGlobalError(data?.message)
    },
    401: (data) => {
      setGlobalError(data?.message)
    },
    500: (data) => {
      setGlobalError(data?.message)
    },
  }

  const { rec } = useAxios({ onSuccess, onFinally, httpCodes })


  useEffect(() => {
    const promise = getActualities()
    rec(promise)
  },[])

  if(isLoading){
    return <Text>LOADING ...</Text>
  } else {
    return (
      <View style={styles.container}>
        <Text>Actualities Screen</Text>
        <Actualities navigation={navigation} actualities={actualities} />
      </View>
    );
  }
}


export default AtulitiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});