import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '@utils/Constants';
import DeliveryHeader from '@components/delivery/DeliveryHeader';
import {useAuthStore} from '@state/authStore';
import TabBar from '@components/delivery/TabBar';

const DeliveryDashboard = () => {
  const {user} = useAuthStore();
  const [selectedTab, setSelectedTab] = useState<'available' | 'delivered'>(
    'available',
  );
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <DeliveryHeader name={user?.name} email={user?.email} />
      </SafeAreaView>
      <View style={styles.subContainer}>
        <TabBar selectedTab={selectedTab} onTabChange={setSelectedTab} />
      </View>
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
