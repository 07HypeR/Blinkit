import {View, Text, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {screenHeight} from '@utils/Scailing';
import {Colors} from '@utils/Constants';

interface LiveMapProps {
  deliveryPersonLocation: any;
  pickupLocation: any;
  deliveryLocation: any;
  hasPickedUp: any;
  hasAccepted: any;
}

const LiveMap: FC<LiveMapProps> = ({
  deliveryLocation,
  deliveryPersonLocation,
  pickupLocation,
  hasAccepted,
  hasPickedUp,
}) => {
  return (
    <View style={styles.container}>
      <Text>LiveMap</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.35,
    width: '100%',
    borderRadius: 15,
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'relative',
  },
});

export default LiveMap;
