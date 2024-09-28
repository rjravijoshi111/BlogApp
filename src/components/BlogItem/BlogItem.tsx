import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Blog} from '../../redux/blogSlice';
import styles from './style';

interface BlogItemProps {
  item: Blog;
  onPress: (id: string) => void;
}

const BlogItem: React.FC<BlogItemProps> = ({item, onPress}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item.id)}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.excerpt}>{item.excerpt}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BlogItem;
