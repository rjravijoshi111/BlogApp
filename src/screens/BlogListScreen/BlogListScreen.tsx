/* eslint-disable react/no-unstable-nested-components */
import {CommonActions, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useLayoutEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import BlogItem from '../../components/BlogItem/BlogItem';
import COLORS from '../../constant/colors';
import {useAppDispatch} from '../../hooks/hooks';
import {RootStackParamList} from '../../navigator/AppNavigation';
import {Blog, fetchBlogs, resetBlogs} from '../../redux/blogSlice';
import {RootState} from '../../redux/store';
import styles from './style';

const BlogListScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {blogs, loading, error, page, totalPages} = useSelector(
    (state: RootState) => state.blog,
  );
  const {t} = useTranslation();

  // Define the handleLogout function
  const handleLogout = useCallback(() => {
    dispatch({type: 'user/logout'});
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Login'}],
      }),
    );
  }, [dispatch, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout} style={styles.headerButton}>
          <Ionicons
            name="log-out-outline"
            size={25}
            color={COLORS.logoutIcon}
          />
        </TouchableOpacity>
      ),
      title: t('blog_posts'),
    });
  }, [navigation, handleLogout, t]);

  useEffect(() => {
    dispatch(fetchBlogs({page: 1, limit: 10}));

    return () => {
      dispatch(resetBlogs());
    };
  }, [dispatch]);

  const loadMore = () => {
    if (!loading && page <= totalPages) {
      dispatch(fetchBlogs({page, limit: 10}));
    }
  };

  const renderFooter = () => {
    if (!loading) {
      return null;
    }
    return (
      <ActivityIndicator
        style={styles.activityIndicatorStyle}
        size="large"
        color={COLORS.secondary}
      />
    );
  };

  const renderItem = ({item}: {item: Blog}) => (
    <BlogItem
      item={item}
      onPress={id => navigation.navigate('BlogDetail', {id})}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={blogs}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContainer}
      />
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{t(error)}</Text>
        </View>
      )}
    </View>
  );
};

export default BlogListScreen;
