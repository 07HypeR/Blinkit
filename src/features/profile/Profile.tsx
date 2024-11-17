import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {useAuthStore} from '@state/authStore';
import {useCartStore} from '@state/cartStore';
import {fetchCustomerOrders} from '@service/orderService';
import CustomHeader from '@components/ui/CustomHeader';
import CustomText from '@components/ui/CustomText';
import {Fonts} from '@utils/Constants';

const Profile: FC = () => {
  const [orders, setOrders] = useState([]);
  const {logout, user} = useAuthStore();
  const {clearCart} = useCartStore();

  const fetchOrders = async () => {
    const data = await fetchCustomerOrders(user?._id);
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const renderHeader = () => {
    return (
      <View>
        <CustomText variant="h3" fontFamily={Fonts.SemiBold}>
          Your account
        </CustomText>
        <CustomText variant="h7" fontFamily={Fonts.Medium}>
          {user?.phone}
        </CustomText>

        <CustomText variant="h8" style={styles.informativeText}>
          YOUR INFORMATION
        </CustomText>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Profile" />

      <FlatList
        data={orders}
        ListHeaderComponent={renderHeader}
        renderItem={renderOrders}
        keyExtractor={(item: any) => item?.order.Id}
        contentContainerStyle={styles.scrollViewContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    padding: 10,
    paddingTop: 20,
    paddingBottom: 100,
  },
  informativeText: {
    opacity: 0.7,
    marginBottom: 20,
  },
  pastText: {
    marginVertical: 20,
    opacity: 0.7,
  },
});

export default Profile;
