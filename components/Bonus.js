import React from 'react';
import { Image } from 'react-native';
import Images from '@/assets/Images';

const Bonus = ({ body }) => {
  const width = body.bounds.max.x - body.bounds.min.x;
  const height = body.bounds.max.y - body.bounds.min.y;
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;

  return (
    <Image
      style={{ position: 'absolute', left: x, top: y, width, height }}
      resizeMode="stretch"
      source={Images.bonuses[body.type]} // Use the correct bonus image based on the type
    />
  );
};

export default Bonus;
