import {StyleSheet} from 'react-native';
import COLORS from '../../constant/colors';

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  excerpt: {
    fontSize: 14,
    color: COLORS.titleTextGray,
  },
});

export default styles;
