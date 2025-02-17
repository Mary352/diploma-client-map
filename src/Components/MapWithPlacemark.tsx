import { YMaps, Map, SearchControl, Placemark } from '@pbe/react-yandex-maps';
import { MapWithPlacemarkProps } from '../types/types';

export const MapWithPlacemark = ({ address, coord0, coord1 }: MapWithPlacemarkProps) => {

   return (
      <YMaps query={{ apikey: process.env.REACT_APP_APIKEY_YMAPS, suggest_apikey: process.env.REACT_APP_SUGGEST_APIKEY_YMAPS }}>
         <div>
            {address}
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