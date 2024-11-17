import {View, Text, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import AdCarousal from './AdCarousal';
import {adData, categories} from '@utils/dummyData';
import CustomText from '@components/ui/CustomText';
import {Fonts} from '@utils/Constants';
import CategoryContainer from './CategoryContainer';

const Content: FC = () => {
  return (
    <View style={styles.container}>
      <AdCarousal adData={adData} />
      <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
        Grocery & Kitchen
      </CustomText>
      <CategoryContainer data={categories} />
      <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
        Bestseller
      </CustomText>
      <CategoryContainer data={categories} />
      <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
        Snacks & Drinks
      </CustomText>
      <CategoryContainer data={categories} />
      <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
        Home & Lifestyle
      </CustomText>
      <CategoryContainer data={categories} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});

export default Content;
