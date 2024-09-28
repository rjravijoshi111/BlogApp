import {StyleSheet} from 'react-native';
import COLORS from '../../constant/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 10,
  },
  errorContainer: {
    padding: 10,
    backgroundColor: COLORS.errorBackground,
    borderRadius: 5,
    marginTop: 10,
  },
  errorText: {
    color: COLORS.error,
    textAlign: 'center',
  },
  headerButton: {
    marginRight: 15,
  },
  activityIndicatorStyle: {
    margin: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default styles;
