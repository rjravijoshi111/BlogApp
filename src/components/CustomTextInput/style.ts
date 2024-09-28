import {StyleSheet} from 'react-native';
import COLORS from '../../constant/colors';
const styles = StyleSheet.create({
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
  errorText: {
    color: COLORS.errorLight,
    marginBottom: 10,
    marginLeft: 5,
  },
});
export default styles;
