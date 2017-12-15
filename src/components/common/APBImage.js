import React from 'react';
import { Image } from 'react-native';

const APBImage = ({ source, width, height, resizeMode }) => {
  const basePath = 'http://guide.florafauna.by';

  return (
    <Image source={{ uri: `${basePath}/${source}`}} style={{ width, height }} resizeMode={resizeMode || 'cover'} />
  )
}

export { APBImage };