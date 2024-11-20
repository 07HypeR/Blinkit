import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {screenHeight} from '@utils/Scailing';
import {Colors} from '@utils/Constants';
import {useMapRefStore} from '@state/mapStore';
import MapViewComponent from '@components/map/MapView';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';

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
  const {mapRef, setMapRef} = useMapRefStore();
  return (
    <View style={styles.container}>
      <MapViewComponent />
      <TouchableOpacity style={styles.fitButton}>
        <Icon name="target" size={RFValue(14)} color={Colors.text} />
      </TouchableOpacity>
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
  fitButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    padding: 5,
    backgroundColor: '#fff',
    borderWidth: 0.8,
    borderColor: Colors.border,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowColor: 'black',
    elevation: 5,
    borderRadius: 35,
  },
});

export default LiveMap;
