import React from 'react';
import {
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useFormik} from 'formik';
import {CommonActions} from '@react-navigation/native';
import * as Yup from 'yup';
import {useSelector} from 'react-redux';
import {login, clearError, selectCurrentUser} from '../../redux/userSlice';
import {RootState} from '../../redux/store';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {RootStackParamList} from '../../navigator/AppNavigation';
import COLORS from '../../constant/colors';
import styles from './style';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '../../hooks/hooks';

interface LoginValues {
  username: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const error = useSelector((state: RootState) => state.user.error);
  const currentUser = useSelector(selectCurrentUser);
  const loading = useSelector((state: RootState) => state.user.loading);
  const {t} = useTranslation();

  const formik = useFormik<LoginValues>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required(t('username') + ' ' + t('required')),
      password: Yup.string().required(t('password') + ' ' + t('required')),
    }),
    onSubmit: values => {
      dispatch(login({username: values.username, password: values.password}));
    },
  });

  React.useEffect(() => {
    if (error) {
      Alert.alert(t('login_error'), error, [
        {text: t('ok'), onPress: () => dispatch(clearError())},
      ]);
    } else {
      if (currentUser && !loading) {
        Alert.alert(t('success_login', {username: currentUser.username}), '', [
          {
            text: t('ok'),
            onPress: () =>
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'BlogList'}],
                }),
              ),
          },
        ]);
      }
    }
  }, [error, currentUser, loading, dispatch, navigation, t]);

  return (
    <LinearGradient
      colors={[COLORS.accent1, COLORS.accent2]}
      style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.container}>
          <Animatable.View animation="fadeInDown" style={styles.header}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
            />
            <Text style={styles.title}>{t('welcome_back')}</Text>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" style={styles.form}>
            <CustomTextInput
              iconName="person-outline"
              placeholder={t('username')}
              placeholderTextColor={COLORS.lightWhite}
              onChangeText={formik.handleChange('username')}
              onBlur={formik.handleBlur('username')}
              value={formik.values.username}
              autoCapitalize="none"
              errorMessage={
                formik.touched.username && formik.errors.username
                  ? formik.errors.username
                  : null
              }
            />

            <CustomTextInput
              iconName="lock-closed-outline"
              placeholder={t('password')}
              placeholderTextColor={COLORS.lightWhite}
              secureTextEntry
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              value={formik.values.password}
              errorMessage={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : null
              }
            />

            <CustomButton
              title={t('login')}
              onPress={formik.handleSubmit as any}
              loading={loading}
              disabled={loading}
            />

            <TouchableOpacity
              onPress={() => navigation.navigate('SignUp')}
              style={styles.switchContainer}>
              <Text style={styles.switchText}>{t('dont_have_account')}</Text>
              <Text style={styles.switchLink}>{' ' + t('sign_up')}</Text>
            </TouchableOpacity>
          </Animatable.View>
        </KeyboardAvoidingView>
      </ScrollView>
    </LinearGradient>
  );
};

export default LoginScreen;
