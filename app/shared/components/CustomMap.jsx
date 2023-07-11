import Mapbox from '@rnmapbox/maps';
import { Const } from 'app/constants/Const';
import React from 'react';
import { styleURL } from '../../../env.json';

export const CustomMap = ({ onFinishLoad, content }) => {
  return (
    <Mapbox.MapView
      style={{
        height: Const.deviceHeight,
        width: Const.deviceWidth,
      }}
      styleURL={styleURL}
      logoEnabled={false}
      scaleBarEnabled={false}
      attributionEnabled={false}
      onDidFinishLoadingMap={() => onFinishLoad()}
    >
      {content}
    </Mapbox.MapView>
  );
};
