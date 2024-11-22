import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {useAuthStore} from '@state/authStore';
import {
  confirmOrder,
  getOrderById,
  sendLiveOrderUpdates,
} from '@service/orderService';
import {Colors, Fonts} from '@utils/Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';
import {useRoute} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import LiveHeader from '@features/map/LiveHeader';
import LiveMap from '@features/map/LiveMap';
import DeliveryDetails from '@features/map/DeliveryDetails';
import OrderSummary from '@features/map/OrderSummary';
import {hocStyles} from '@styles/GlobalStyles';
import CustomButton from '@components/ui/CustomButton';
import {SafeAreaView} from 'react-native-safe-area-context';

const DeliveryMap: FC = () => {
  const user = useAuthStore(state => state.user);
  const [orderData, setOrderData] = useState<any>(null);
  const [myLocation, setMyLocation] = useState<any>(null);
  const route = useRoute();

  const orderDetails = route?.params as Record<string, any>;
  const {setCurrentOrder} = useAuthStore();

  const fetchOrderDetails = async () => {
    const data = await getOrderById(orderDetails?._id as any);
    setOrderData(data);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      async position => {
        const {latitude, longitude} = position.coords;
        setMyLocation({latitude, longitude});
      },
      err => console.log('Error Fetching Geolocation', err),
      {enableHighAccuracy: true, distanceFilter: 10},
    );

    return () => Geolocation.clearWatch(watchId);
  }, []);

  const acceptOrder = async () => {
    const data = await confirmOrder(orderData?._id, myLocation);
    if (data) {
      setCurrentOrder(data);
      Alert.alert('Order Accepted, Grab your package');
    } else {
      Alert.alert('There was an error');
    }
    fetchOrderDetails();
  };
  const orderPickedUp = async () => {
    const data = await sendLiveOrderUpdates(
      orderData?._id,
      myLocation,
      'arriving',
    );
    if (data) {
      setCurrentOrder(data);
      Alert.alert("Let's deliver it as soon as possible");
    } else {
      Alert.alert('There was an error');
    }
    fetchOrderDetails();
  };
  const orderDelivered = async () => {
    const data = await sendLiveOrderUpdates(
      orderData?._id,
      myLocation,
      'delivered',
    );
    if (data) {
      setCurrentOrder(null);
      Alert.alert('Woohoo! You made it🥳');
    } else {
      Alert.alert('There was an error');
    }
    fetchOrderDetails();
  };

  let message = 'Start this order';
  if (
    orderData?.deliveryPartner?._id == user?._id &&
    orderData?.status === 'confirmed'
  ) {
    message = 'Grab your order';
  } else if (
    orderData?.deliveryPartner?._id == user?._id &&
    orderData?.status === 'arriving'
  ) {
    message = 'Complete your order';
  } else if (
    orderData?.deliveryPartner?._id == user?._id &&
    orderData?.status === 'delivered'
  ) {
    message = 'Your milestone';
  } else if (
    orderData?.deliveryPartner?._id != user?._id &&
    orderData?.status == 'cancelled'
  ) {
    message = 'You missed it!';
  }

  useEffect(() => {
    async function sendLiveUpdates() {
      if (
        orderData?.deliveryPartner?._id == user?._id &&
        orderData?.status != 'delivered' &&
        orderData?.status != 'cancelled'
      ) {
        await sendLiveOrderUpdates(
          orderData?._id,
          myLocation,
          orderData?._status,
        );
        fetchOrderDetails();
      }
    }
    sendLiveUpdates();
  }, [myLocation]);
  return (
    <SafeAreaView style={styles.container}>
      <LiveHeader
        type="Delivery"
        title={message}
        secondTitle="Delivery in 10 minutes"
      />
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <LiveMap
            deliveryPersonLocation={
              orderData?.deliveryPersonLocation || myLocation
            }
            deliveryLocation={orderData?.deliveryLocation || null}
            hasAccepted={
              orderData?.deliveryPartner?._id == user?._id &&
              orderData?.status == 'confirmed'
            }
            hasPickedUp={orderData?.status == 'arriving'}
            pickupLocation={orderData?.pickupLocation || null}
          />

          <DeliveryDetails details={orderData?.customer} />
          <OrderSummary order={orderData} />

          <View style={styles.flexRow}>
            <View style={styles.iconContainer}>
              <Icon
                name="cards-heart-outline"
                color={Colors.disabled}
                size={RFValue(20)}
              />
            </View>

            <View style={{width: '82%'}}>
              <CustomText variant="h7" fontFamily={Fonts.SemiBold}>
                Do you like our app clone?
              </CustomText>
              <CustomText variant="h9" fontFamily={Fonts.Medium}>
                Hit star button on github repo! If you are enjoying comment your
                excietment
              </CustomText>
            </View>
          </View>

          <CustomText
            fontFamily={Fonts.SemiBold}
            variant="h6"
            style={{opacity: 0.6, marginTop: 20}}>
            Abhik Baidya x Blinkit
          </CustomText>
        </ScrollView>
      </View>

      {orderData?.status != 'delivered' && orderData?.status != 'cancelled' && (
        <View style={[hocStyles.cartContainer, styles.btnContainer]}>
          {orderData?.status == 'available' && (
            <CustomButton
              disabled={false}
              title="Accept Order"
              loading={false}
              onPress={acceptOrder}
            />
          )}
          {orderData?.status == 'confirmed' &&
            orderData?.deliveryPartner?._id === user?._id && (
              <CustomButton
                disabled={false}
                title="Order Picked Up"
                loading={false}
                onPress={orderPickedUp}
              />
            )}
          {orderData?.status == 'arriving' &&
            orderData?.deliveryPartner?._id === user?._id && (
              <CustomButton
                disabled={false}
                title="Delivered"
                loading={false}
                onPress={orderDelivered}
              />
            )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  btnContainer: {
    padding: 10,
  },
  scrollContent: {
    paddingBottom: 150,
    backgroundColor: Colors.backgroundSecondary,
    padding: 15,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    borderRadius: 15,
    marginTop: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
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
});

export default DeliveryMap;
