import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts} from '@utils/Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';

interface ActionButtonProps {
  icon: string;
  lable: string;
  onPress?: () => void;
}

const ActionButton: FC<ActionButtonProps> = ({icon, lable, onPress}) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon name={icon} color={Colors.text} size={RFValue(14)} />
      </View>
      <CustomText variant="h7" fontFamily={Fonts.Medium}>
        {lable}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 10,
  },
  iconContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ActionButton;
