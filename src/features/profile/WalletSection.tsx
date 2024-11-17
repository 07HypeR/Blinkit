import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '@utils/Constants';
import WalletItem from './WalletItem';

const WalletSection = () => {
  return (
    <View style={styles.walletContainer}>
      <WalletItem icon="wallet-outline" lable="Wallet" />
      <WalletItem icon="chatbubble-ellipses-outline" lable="Support" />
      <WalletItem icon="card-outline" lable="Payments" />
    </View>
  );
};

const styles = StyleSheet.create({
  walletContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    paddingVertical: 15,
    borderRadius: 15,
    marginVertical: 20,
  },
});

export default WalletSection;
