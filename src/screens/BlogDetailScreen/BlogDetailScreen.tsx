import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {ActivityIndicator, Image, ScrollView, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import COLORS from '../../constant/colors';
import {useAppDispatch} from '../../hooks/hooks';
import {RootStackParamList} from '../../navigator/AppNavigation';
import {clearCurrentBlog, fetchBlogDetails} from '../../redux/blogSlice';
import {RootState} from '../../redux/store';
import styles from './style';

type BlogDetailScreenRouteProp = RouteProp<RootStackParamList, 'BlogDetail'>;

type Props = {
  route: BlogDetailScreenRouteProp;
  navigation: NativeStackNavigationProp<RootStackParamList, 'BlogDetail'>;
};

const BlogDetailScreen: React.FC<Props> = ({route}) => {
  const {id} = route.params;
  const dispatch = useAppDispatch();
  const {currentBlog, loading, error} = useSelector(
    (state: RootState) => state.blog,
  );

  useEffect(() => {
    dispatch(fetchBlogDetails(id));

    return () => {
      dispatch(clearCurrentBlog());
    };
  }, [dispatch, id]);

  if (loading || !currentBlog) {
    return (
      <LinearGradient
        colors={[COLORS.background, COLORS.backgroundAccent1]}
        style={styles.gradient}>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={COLORS.secondary} />
        </View>
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient
        colors={[COLORS.background, COLORS.backgroundAccent1]}
        style={styles.gradient}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={[COLORS.background, COLORS.backgroundAccent1]}
      style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{uri: currentBlog.image}} style={styles.image} />
        <Text style={styles.title}>{currentBlog.title}</Text>
        <Text style={styles.content}>{currentBlog.content}</Text>
      </ScrollView>
    </LinearGradient>
  );
};

export default BlogDetailScreen;
