import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import AdCarousal from './AdCarousal';
import {adData} from '@utils/dummyData';

const Content = () => {
  return (
    <View style={styles.container}>
      <AdCarousal adData={adData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});

export default Content;
