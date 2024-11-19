import {View, Text, StyleSheet, Image} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts} from '@utils/Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';
import BillDetails from '@features/order/BillDetails';

const OrderSummary: FC<{order: any}> = ({order}) => {
  const totalPrice =
    order?.items?.reduce(
      (total: number, cartItem: any) =>
        total + cartItem.item.price * cartItem.count,
      0,
    ) || 0;

  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.iconContainer}>
          <Icon
            name="shopping-outline"
            color={Colors.disabled}
            size={RFValue(20)}
          />
        </View>
        <View>
          <CustomText variant="h7" fontFamily={Fonts.SemiBold}>
            Order summary
          </CustomText>
          <CustomText variant="h9" fontFamily={Fonts.Medium}>
            Order ID - #{order?.orderId}
          </CustomText>
        </View>
      </View>

      {order?.items?.map((item: any, index: number) => {
        return (
          <View style={styles.flexRow} key={index}>
            <View style={styles.imgContainer}>
              <Image source={{uri: item?.item?.image}} style={styles.img} />
            </View>
            <View style={{width: '55%'}}>
              <CustomText
                numberOfLines={2}
                variant="h8"
                fontFamily={Fonts.Medium}>
                {item.item.name}
              </CustomText>
              <CustomText variant="h9">{item.item.quantity}</CustomText>
            </View>

            <View style={{width: '20%', alignItems: 'flex-end'}}>
              <CustomText
                variant="h8"
                fontFamily={Fonts.Medium}
                style={{alignSelf: 'flex-end', marginTop: 4}}>
                ₹{item.count * item.item.price}
              </CustomText>
              <CustomText
                variant="h8"
                fontFamily={Fonts.Medium}
                style={{alignSelf: 'flex-end', marginTop: 4}}>
                {item.count}x
              </CustomText>
            </View>
          </View>
        );
      })}

      <BillDetails totalItemPrice={totalPrice} />
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
  iconContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    borderRadius: 15,
    width: '17%',
  },
  img: {
    width: 40,
    height: 40,
  },
});

export default OrderSummary;
