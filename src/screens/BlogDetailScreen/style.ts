import {StyleSheet} from 'react-native';
import COLORS from '../../constant/colors';
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: COLORS.error,
    fontSize: 18,
  },
  container: {
    padding: 15,
    backgroundColor: COLORS.listBackground,
    borderRadius: 10,
    margin: 10,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  content: {
    fontSize: 16,
    color: COLORS.titleText,
    lineHeight: 24,
  },
});

export default styles;
