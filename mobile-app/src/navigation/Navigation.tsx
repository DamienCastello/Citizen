import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { AuthContext } from "../utilities/Context";
import { FontAwesome5 } from '@expo/vector-icons';

import ActualitiesScreen from '../screens/connected/ActualitiesScreen';
import SettingsScreen from '../screens/connected/Settings';
import { SignInScreen } from '../screens/public/SignIn';
import { Splash } from '../screens/public/Splash';
import SignUpScreen from '../screens/public/SignUp';
import Tabs from './BottomNavigation';
import { View, Text } from 'react-native';

const RootStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

function LogoTitle(props:any) {
  return (
    <View style={{
      display:"flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems:"center",
      paddingRight: 15
    }}>
      <FontAwesome5 size={25}
        name="home"
        style={{
          display:"flex",
          alignItems: "center",
            }}
    />
    <Text style={{display:"flex",alignItems:"center",fontSize:20,fontWeight:"bold"
          }}>{props.title}</Text>
    </View>

  );
}

const HomeStackScreen = () => (

  <HomeStack.Navigator>
    <HomeStack.Screen
      name="BottomNavigation"
      component={Tabs}
      options={{ headerTitle: () => <LogoTitle title="Home" /> }}
    />
    <HomeStack.Screen name="Actualities" component={ActualitiesScreen} />
    <HomeStack.Screen name="Settings" component={SettingsScreen} />
  </HomeStack.Navigator>

);

const AuthStackScreen = () => (
  <AuthStack.Navigator>
     <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
  </AuthStack.Navigator>
);

const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator >
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={HomeStackScreen}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false
        }}
      />
    )}
  </RootStack.Navigator>
);

export default () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const authContext = React.useMemo(() => {
    return {
      signIn: (auth) => {
        console.log("AUTH FROM SIGN : ", auth)
        setIsLoading(false);
        setUserToken(auth.token);
      },
      signUp: (auth) => {
        setIsLoading(false);
        setUserToken(auth.token);
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      }
    };
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};