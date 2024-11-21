import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {Colors} from '@utils/Constants';
import DeliveryHeader from '@components/delivery/DeliveryHeader';
import {useAuthStore} from '@state/authStore';
import TabBar from '@components/delivery/TabBar';
import {fetchOrders} from '@service/orderService';
import CustomText from '@components/ui/CustomText';
import OrderItem from '@components/delivery/OrderItem';
import Geolocation from '@react-native-community/geolocation';
import {reverseGeocode} from '@service/mapService';
import {SafeAreaView} from 'react-native-safe-area-context';

const DeliveryDashboard: FC = () => {
  const {user, setUser} = useAuthStore();
  const [selectedTab, setSelectedTab] = useState<'available' | 'delivered'>(
    'available',
  );
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const updateUser = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        reverseGeocode(latitude, longitude, setUser);
      },
      err => console.log(err),
      {
        enableHighAccuracy: false,
        timeout: 15000,
      },
    );
  };

  useEffect(() => {
    updateUser();
  }, []);

  const renderOrderItem = ({item, index}: any) => {
    return <OrderItem index={index} item={item} />;
  };

  const fetchData = async () => {
    setData([]);
    setRefreshing(true);
    setLoading(true);
    const data = await fetchOrders(selectedTab, user?._id, user?.branch);
    setData(data);
    setRefreshing(false);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [selectedTab]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <DeliveryHeader name={user?.name} email={user?.email} />
      </View>
      <View style={styles.subContainer}>
        <TabBar selectedTab={selectedTab} onTabChange={setSelectedTab} />
        <FlatList
          data={data}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={async () => await fetchData()}
            />
          }
          ListEmptyComponent={() => {
            if (loading) {
              return (
                <View style={styles.center}>
                  <ActivityIndicator color={Colors.secondary} size="small" />
                </View>
              );
            }
            return (
              <View style={styles.center}>
                <CustomText>No Orders found yet!</CustomText>
              </View>
            );
          }}
          renderItem={renderOrderItem}
          keyExtractor={item => item.orderId}
          contentContainerStyle={styles.flatlistContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  subContainer: {
    backgroundColor: Colors.backgroundSecondary,
    flex: 1,
    padding: 6,
  },
  flatlistContainer: {
    padding: 2,
  },
  center: {
    flex: 1,
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DeliveryDashboard;
