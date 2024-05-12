import { YMaps, Map, SearchControl } from '@pbe/react-yandex-maps';
// import { APIKEY_YMAPS, SUGGEST_APIKEY_YMAPS } from '../types/commonVars';

type MapWithSearchProps = {
   handleSearchChange: (event: any) => void,
   selectedTextAddress: string
}

export const MapWithSearch = ({ handleSearchChange, selectedTextAddress }: MapWithSearchProps) => {
   // const [address, setAddress] = useState<string>('');
   // const [selectedAddressCoords, setSelectedAddressCoords] = useState<number[]>([]);
   // const [selectedTextAddress, setSelectedTextAddress] = useState<number[]>([]);

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