import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import COLORS from '../../constant/colors';
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: width * 0.3,
    height: height * 0.15,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  form: {
    backgroundColor: COLORS.formBackground,
    padding: 20,
    borderRadius: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.white,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: COLORS.white,
  },
  error: {
    color: COLORS.errorLight,
    marginBottom: 10,
    marginLeft: 5,
  },
  button: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  switchText: {
    color: COLORS.white,
    fontSize: 16,
  },
  switchLink: {
    color: COLORS.secondary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
