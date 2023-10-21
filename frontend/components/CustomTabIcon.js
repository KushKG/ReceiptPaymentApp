import React from 'react';
import { Image } from 'react-native';

const CustomTabIcon = ({ iconSource, focused }) => {
  return (
    <Image
      source={iconSource}
      style={{
        width: 24,
        height: 24,
        marginTop: 5,
        tintColor: focused ? 'purple' : 'black', // You can customize the icon's color
      }}
    />
  );
};

export default CustomTabIcon;
