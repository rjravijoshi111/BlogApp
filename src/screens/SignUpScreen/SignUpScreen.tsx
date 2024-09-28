import React from 'react';
import {
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useSelector} from 'react-redux';
import {signup, clearError, selectCurrentUser} from '../../redux/userSlice';
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

interface SignUpValues {
  username: string;
  password: string;
  confirmPassword: string;
}

const SignUpScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const error = useSelector((state: RootState) => state.user.error);
  const currentUser = useSelector(selectCurrentUser);
  const loading = useSelector((state: RootState) => state.user.loading);
  const {t} = useTranslation();

  const formik = useFormik<SignUpValues>({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(4, t('error_min_characters', {field: t('username'), count: 4}))
        .required(t('error_required', {field: t('username')})),
      password: Yup.string()
        .min(6, t('error_min_characters', {field: t('password'), count: 6}))
        .required(t('error_required', {field: t('password')})),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], t('error_password_mismatch'))
        .required(t('error_required', {field: t('confirm_password')})),
    }),
    onSubmit: values => {
      dispatch(signup({username: values.username, password: values.password}));
    },
  });

  React.useEffect(() => {
    if (error) {
      Alert.alert(t('signup_error'), error, [
        {text: 'OK', onPress: () => dispatch(clearError())},
      ]);
    } else {
      if (currentUser && !loading) {
        Alert.alert(t('success_signup'), '', [
          {
            text: 'OK',
            onPress: () => {},
          },
        ]);
      }
    }
  }, [error, currentUser, loading, dispatch, navigation, t]);

  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.accent3, COLORS.accent4]}
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
            <Text style={styles.title}>{t('create_account')}</Text>
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

            <CustomTextInput
              iconName="lock-closed-outline"
              placeholder={t('confirm_password')}
              placeholderTextColor={COLORS.lightWhite}
              secureTextEntry
              onChangeText={formik.handleChange('confirmPassword')}
              onBlur={formik.handleBlur('confirmPassword')}
              value={formik.values.confirmPassword}
              errorMessage={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? formik.errors.confirmPassword
                  : null
              }
            />

            <CustomButton
              title={t('sign_up')}
              onPress={formik.handleSubmit as any}
              loading={loading}
              disabled={loading}
            />

            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={styles.switchContainer}>
              <Text style={styles.switchText}>{t('already_have_account')}</Text>
              <Text style={styles.switchLink}>{` ${t('login')}`}</Text>
            </TouchableOpacity>
          </Animatable.View>
        </KeyboardAvoidingView>
      </ScrollView>
    </LinearGradient>
  );
};

export default SignUpScreen;
