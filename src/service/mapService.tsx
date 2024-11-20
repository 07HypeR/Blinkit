import axios from 'axios';
import {GOOGLE_MAP_API} from './config';
import {updateUserLocation} from './authService';

export const reverseGeocode = async (
  latitude: number,
  longitude: number,
  setUser: any,
) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&=${GOOGLE_MAP_API}`,
    );

    if (response.data.status == 'OK') {
      const address = response.data.results[0].formatted_address;
      console.log(response.data);

      updateUserLocation(
        {liveLocation: {latitude, longitude}, address},
        setUser,
      );
    } else {
      console.error('Geo Code Failed', response.data);
    }
  } catch (error) {
    console.error('Geo Code Failed');
  }
};
