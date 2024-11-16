import {View, Text, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {Colors} from '@utils/Constants';

const OrderSummary: FC<{order: any}> = ({order}) => {
  return (
    <View style={styles.container}>
      <Text>OrderSummary</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 15,
    marginVertical: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border,
  },
});

export default OrderSummary;
