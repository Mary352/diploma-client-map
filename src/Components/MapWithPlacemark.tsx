import React, { useEffect, useRef, useState } from 'react';
import { YMaps, Map, SearchControl, Placemark } from '@pbe/react-yandex-maps';
import { APIKEY_YMAPS, SUGGEST_APIKEY_YMAPS } from '../types/commonVars';

type MapWithPlacemarkProps = {
   address: string,
   coord0: string,
   coord1: string,
}

export const MapWithPlacemark = ({ address, coord0, coord1 }: MapWithPlacemarkProps) => {

   return (
      <YMaps query={{ apikey: APIKEY_YMAPS, suggest_apikey: SUGGEST_APIKEY_YMAPS }}>

         <div>
            {address}
            {/* Координаты: {+poster.coord0} */}

            <Map
               defaultState={{ center: [+coord0, +coord1], zoom: 13 }}
               style={{ width: '100%', height: '400px' }}
            >
               <Placemark geometry={[coord0, coord1]} />
            </Map>


         </div>
      </YMaps>
   );
};