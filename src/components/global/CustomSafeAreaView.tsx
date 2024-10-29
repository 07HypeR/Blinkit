import {View, Text, ViewStyle, SafeAreaView, StyleSheet} from 'react-native';
import React, {FC, ReactNode} from 'react';

interface CustomeSafeAreaViewProps {
  children: ReactNode;
  style?: ViewStyle;
}

const CustomSafeAreaView: FC<CustomeSafeAreaViewProps> = ({
  children,
  style,
}) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default CustomSafeAreaView;
