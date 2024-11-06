import {StyleSheet, FlatList} from 'react-native';
import React, {FC} from 'react';
import {Colors} from '@utils/Constants';
import ProductItem from './ProductItem';

const ProductList: FC<{data: any}> = ({data}) => {
  const renderItem = ({item, index}: any) => {
    return <ProductItem item={item} index={index} />;
  };
  return (
    <FlatList
      data={data}
      keyExtractor={item => item._id}
      renderItem={renderItem}
      style={styles.container}
      contentContainerStyle={styles.content}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: Colors.backgroundSecondary,
  },
  content: {
    paddingVertical: 10,
    paddingBottom: 100,
  },
});

export default ProductList;
