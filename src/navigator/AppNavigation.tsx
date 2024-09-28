import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import COLORS from '../constant/colors';
import { RootState } from '../redux/store';
import BlogDetailScreen from '../screens/BlogDetailScreen/BlogDetailScreen';
import BlogListScreen from '../screens/BlogListScreen/BlogListScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';

export type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
  BlogList: undefined;
  BlogDetail: {id: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const {t} = useTranslation();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={currentUser ? 'BlogList' : 'Login'}
        screenOptions={{
          headerStyle: {backgroundColor: COLORS.accent3},
          headerTintColor: COLORS.white,
          headerTitleStyle: {fontWeight: 'bold'},
        }}>
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BlogList"
          component={BlogListScreen}
          options={{
            title: t('blog_posts'),
            headerStyle: {backgroundColor: COLORS.primary},
          }}
        />
        <Stack.Screen
          name="BlogDetail"
          component={BlogDetailScreen}
          options={{
            title: t('blog_details'),
            headerStyle: {backgroundColor: COLORS.primary},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
