import { FontAwesome5 } from '@expo/vector-icons'
import * as React from 'react'
import { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context"

import { InformationMessage } from "../../components/stateless/InformationMessage"
import useAxios from "../../hooks/useAxios"
import { login } from "../../services/api/client"
import { USER_LOG_DATA, USER_TOKEN, getSecureStorage, setSecureStorage } from "../../utilities/SecureStorage"
import { AuthContext } from "../../utilities/Context";

//import i18n from "../translations/translation"

type FormData = {
  username: string
  password: string
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SubmitButtonStyle: {
    width: 300,
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#00BCD4',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black'
  },
  TextStyle:{
      color: '#fff',
      textAlign: 'center',
      fontWeight: "bold",
      fontSize: 20
  }
});

const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

export const SignInScreen = ({ navigation }) => {
  const [globalError, setGlobalError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const { signIn } = React.useContext(AuthContext);

  const { control, handleSubmit, formState: {errors}, setError: setFormError } = useForm<FormData>()

  const passwordInput = useRef<TextInput>(null)

  let loginIcon = "phone"

  const onSuccess = (response) => {
    if (globalError) {
      setGlobalError(null)
    }
    console.log("TOKEN FROM RESPONSE : ", response.data.headers.authorization)

    const auth = {
      username: response.data.users[0].username,
      token: "Bearer " + response.data.headers.authorization
    }

    setSecureStorage("Bearer " + response.data.headers.authorization, 'USER_TOKEN')
    signIn(auth)
  }

  const onFinally = () => {
    setIsLoading(false)
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

  const { rec } = useAxios({ onSuccess, onFinally, httpCodes, setFormError })

  const onSubmit = async (data) => {

    const promise = login(data)
    rec(promise)
    /*
    setIsLoading(true)

    if (networkInfo?.isInternetReachable) {
      const promise = login(data)
      rec(promise)
    } else {
      setIsLoading(false)
      setGlobalError(i18n.t("common.errorNetwork"))
    }
    */
  }
  
  return (
    <ScreenContainer>
      <SafeAreaView style={styles.container}>
        <View style={{ padding: 40 }}>
          <View style={{display: "flex", alignItems: "center"}}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="username"
                  onChangeText={(value) => onChange(value)}
                  onBlur={onBlur}
                  value={value}
                  placeholder={"Nom d'utilisateur"}
                  error={!!errors.username}
                  icon={loginIcon}
                  returnKeyType="next"
                />
              )}
              name="username"
              rules={{ required: true }}
              defaultValue=""
              />
            {errors.username && errors.username.type === "required" && (
              <InformationMessage type="error">Erreur: nom d'utilisateur recquis !</InformationMessage>
            )}
            {errors.username && errors.username.type === undefined && (
              <InformationMessage type="error">{errors.username.message}</InformationMessage>
            )}

              <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  autoCapitalize="none"
                  keyboardType="default"
                  textContentType="password"
                  secureTextEntry={!visible}
                  onChangeText={(password) => onChange(password)}
                  onBlur={onBlur}
                  value={value}
                  placeholder={"Mot de passe"}
                  error={!!errors.password}
                  icon="lock"
                  returnKeyType="done"
                  ref={passwordInput}
                  iconEnd={
                    visible ? (
                      <FontAwesome5 onPress={() => setVisible(false)} name="eye-slash" size={24} color="black" />
                    ) : (
                      <FontAwesome5 onPress={() => setVisible(true)} name="eye" size={24} color="black" />
                    )
                  }
                />
              )}
              name="password"
              rules={{ required: true }}
              defaultValue=""
            />

            {errors.password && errors.password.type === "required" && (
              <InformationMessage type="error">Erreur: mot de passe recquis !</InformationMessage>
            )}
            {errors.password && errors.password.type === undefined && (
              <InformationMessage type="error">{errors.password.message}</InformationMessage>
            )}
            <TouchableOpacity
              style={styles.SubmitButtonStyle}
              activeOpacity = { .5 }
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.TextStyle}>Se connecter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.SubmitButtonStyle}
              activeOpacity = { .5 }
              onPress={() => {
                console.log("TODO: forgotten password")
              }}
            >
              <Text style={styles.TextStyle}>Mot de passe oublié ?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScreenContainer>
  );
};