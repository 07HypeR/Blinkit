import {View, Text, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';

interface ArrowButtonProps {
  title: string;
  onPress?: () => void;
  price?: number;
  loading?: boolean;
}

const ArrowButton: FC<ArrowButtonProps> = ({
  title,
  onPress,
  price,
  loading,
}) => {
  return (
    <TouchableOpacity>
      <Text>ArrowButton</Text>
    </TouchableOpacity>
  );
};

export default ArrowButton;
