import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  SplashScreen, 
  WelcomeScreen, 
  SigninScreen, 
  SignupScreen, 
  ForgotPasswordScreen, 
  RegisterPhoneScreen, 
  VerificationScreen,
  HomeScreen,
RestaurantScreen,

} from '../screens';

import {useSelector, useDispatch } from 'react-redux';
import { GeneralAction } from '../actions';
import { StorageService } from '../services';

const Stack = createStackNavigator();

const Navigators = () => {
  const {isAppLoading, token, isFirstTimeUse} = useSelector(
    state => state?.generalState,
  );
  const dispatch = useDispatch();
  console.log('token: ', token);
  useEffect(() => {
    dispatch(GeneralAction.appStart())
  }, []);
  console.log('isAppp: ', isAppLoading);
  console.log('isFirst: ', isFirstTimeUse);
  // StorageService.setToken('');
  // StorageService.setFirstTimeUse().then(() => {
  //   dispatch(GeneralAction.setIsFirstTimeUse());
  // })
  // dispatch(GeneralAction.setToken(''));
  // dispatch(GeneralAction.setUserData(null));
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAppLoading ? (<Stack.Screen name='Splash' component={SplashScreen}/>
        ) : !token || token === '' || token === null ? (
          <>
          {isFirstTimeUse && (<Stack.Screen name='Welcome' component={WelcomeScreen}/>)} 

          <Stack.Screen name='Signin' component={SigninScreen}/>
          <Stack.Screen name='Signup' component={SignupScreen}/>
          <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen}/>
          <Stack.Screen name='RegisterPhone' component={RegisterPhoneScreen}/>
          <Stack.Screen name='Verification' component={VerificationScreen}/>
          </>
        ) : (
          <>
          <Stack.Screen name='Home' component={HomeScreen}/>
          <Stack.Screen name='Restaurant' component={RestaurantScreen}/>
          </>
        )}
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigators ;
