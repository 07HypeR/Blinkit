import {View, Text, StyleSheet, Image} from 'react-native';
import React, {FC} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import {screenHeight, screenWidth} from '@utils/Scailing';
import Carousel from 'react-native-reanimated-carousel';

const AdCarousal: FC<{adData: any}> = ({adData}) => {
  const progressValue = useSharedValue(0);
  const baseOptions = {
    vertical: false,
    width: screenWidth,
    height: screenHeight * 0.5,
  };
  return (
    <View style={{left: -10, marginVertical: 20}}>
      <Carousel
        {...baseOptions}
        loop
        pagingEnabled
        snapEnabled
        autoPlay
        autoPlayInterval={3000}
        mode="parallax"
        data={adData}
        modeConfig={{
          parallaxScrollingOffset: 0.94,
          parallaxScrollingScale: 0,
        }}
        renderItem={({item}: any) => {
          return <Image source={item} style={styles.img} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
});

export default AdCarousal;
