import {View, Text, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import AdCarousal from './AdCarousal';
import {adData} from '@utils/dummyData';

const Content: FC = () => {
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
