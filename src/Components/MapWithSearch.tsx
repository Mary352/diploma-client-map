import { YMaps, Map, SearchControl } from '@pbe/react-yandex-maps';
import { MapWithSearchProps } from '../types/types';

export const MapWithSearch = ({ handleSearchChange, selectedTextAddress }: MapWithSearchProps) => {

   return (
      <YMaps query={{ apikey: process.env.REACT_APP_APIKEY_YMAPS, suggest_apikey: process.env.REACT_APP_SUGGEST_APIKEY_YMAPS }}>
         <div>
            Выбранный адрес: {selectedTextAddress}

            <Map
               defaultState={{ center: [53.90880299307702, 27.558588205078124], zoom: 9 }}
               style={{ width: '100%', height: '400px' }}>
               <SearchControl
                  options={{ float: 'right', provider: 'yandex#map' }}
                  onChange={handleSearchChange}
               />
            </Map>
         </div>
      </YMaps>
   );
};