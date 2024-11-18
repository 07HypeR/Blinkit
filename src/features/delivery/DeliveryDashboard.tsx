import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import {Colors} from '@utils/Constants';
import DeliveryHeader from '@components/delivery/DeliveryHeader';
import {useAuthStore} from '@state/authStore';

const DeliveryDashboard = () => {
  const {user} = useAuthStore();
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <DeliveryHeader name={user?.name} email={user?.email} />
      </SafeAreaView>
      <View style={styles.subContainer}></View>
    </View>
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
