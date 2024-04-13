import React, { useEffect, useRef, useState } from 'react';
import { YMaps, Map, SearchControl, Placemark } from '@pbe/react-yandex-maps';

const MapWithSearch: React.FC = () => {
   const [address, setAddress] = useState<string>('');
   const [selectedAddressCoords, setSelectedAddressCoords] = useState<number[]>([]);
   const [selectedTextAddress, setSelectedTextAddress] = useState<number[]>([]);

   // const searchControlRef = useRef<any>(null);

   // const onResultShow = () => {
   //    if (searchControlRef.current) {
   //       // Тут вызвать метод который наиболее подходит
   //       // https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/control.SearchControl-docpage/
   //       console.log('-------SHOW--------');
   //       console.log(searchControlRef.current.getResultsArray());
   //       console.log('-------SHOW end--------');
   //    }
   // };

   const handleSearchChange = (event: any) => {
      // setAddress(event.target?.value);
      console.log('--------1----------')
      // console.log('handleSearchChange', event.target?.value)
      // console.log('handleSearchChange target', event.target)
      console.log('handleSearchChange event', event)
      console.log('handleSearchChange typeof event', typeof event)
      const selectedItem = event.get('target').getResultsArray()[0];
      console.log("🚀 ~ file: newch.html:42 ~ selectedItem:", selectedItem)
      const selectedAddress2 = selectedItem?.properties.get('text');
      setSelectedTextAddress(selectedAddress2)
      console.log("🚀 ~ file: newch.html:44 ~ selectedAddress:", selectedAddress2)
      // const coords = event.geometry?._coordinates;
      // console.log("🚀 ~ file: MapWithSearch.tsx:32 ~ handleSearchChange ~ coords:", coords)
      if (selectedItem) {
         const coords = selectedItem.geometry?._coordinates;
         setSelectedAddressCoords(coords)
         console.log("🚀 ~ file: MapWithSearch.tsx:32 ~ handleSearchChange ~ coords:", coords)
         console.log("🚀 ~ file: MapWithSearch.tsx:32 ~ handleSearchChange ~ typeof coords:", typeof coords)
         console.log("🚀 ~ file: MapWithSearch.tsx:32 ~ handleSearchChange ~ typeof selectedAddressCoords:", typeof selectedAddressCoords)
         console.log("🚀 ~ file: MapWithSearch.tsx:32 ~ handleSearchChange ~ selectedAddressCoords:", selectedAddressCoords)
      }
      console.log('--------1----------')
   };

   const handleSearchSubmit = (ymaps: any, map: any) => {
      ymaps.geocode(address).then((res: any) => {
         const firstGeoObject = res.geoObjects.get(0);
         const coordinates = firstGeoObject.geometry.getCoordinates();
         map.panTo(coordinates, { flying: true });
      });
   };

   return (
      <YMaps query={{ apikey: '0a62e602-e671-4320-a847-0c31041bdb2e', suggest_apikey: 'c5bcdde0-db39-444b-831d-07b17c3af76e' }}>
         <div>
            Выбранный адрес: {selectedTextAddress}
            <Map
               defaultState={{ center: [53.90880299307702, 27.558588205078124], zoom: 9 }}
               style={{ width: '100%', height: '400px' }}
            // instanceRef={(map: any) => map && map.controls.remove('searchControl')}
            >
               <SearchControl
                  options={{ float: 'right', provider: 'yandex#map' }}
                  state={{ value: address }}
                  // onResultShow={onResultShow}
                  onChange={handleSearchChange}
                  onSearchSubmit={(ymaps: any, map: ymaps.Map) => {
                     console.log('----------------------')
                     console.log('onSearchSubmit')
                     console.log('----------------------')
                     console.log('setSelectedAddress - ', address)
                     // setSelectedAddress(address);
                     handleSearchSubmit(ymaps, map)
                  }
                  }
               />
            </Map>
         </div>
         {/* {selectedAddress.length !== 0 && <div>
            Выбранный адрес: {selectedAddress}
            
            <Map
               defaultState={{ center: selectedAddress, zoom: 13 }}
               style={{ width: '100%', height: '400px' }}
            >
               <Placemark geometry={selectedAddress} />               
            </Map>
         </div>} */}
      </YMaps>
   );
   // useEffect(() => {
   //    const loadMap = async () => {
   //       const ymaps = await window.ymaps;
   //       if (!ymaps) {
   //          console.log('!ymaps')
   //          return
   //       };

   //       ymaps.ready(() => {
   //          const myMap = new ymaps.Map('map', {
   //             center: [55.751574, 37.573856],
   //             zoom: 9,
   //             controls: ['zoomControl', 'searchControl'],
   //          });

   //          const searchControl = myMap.controls.get('searchControl');

   //          searchControl && searchControl.events.add('select', function (e: any) {
   //             const selectedItem = e.get('target').getResultsArray()[0];
   //             const selectedAddress = selectedItem.properties.get('text');
   //             console.log('Выбранный адрес:', selectedAddress);
   //          });
   //       });
   //    };

   //    loadMap();
   // }, []);

   // return <div id="map" style={{ width: '100%', height: '400px', marginBottom: '20px' }}></div>;

   // return (
   //    <YMaps query={{ apikey: '0a62e602-e671-4320-a847-0c31041bdb2e' }}>
   //       <div>
   //          My awesome application with maps!
   //          <Map
   //             width="100%"
   //             height="400px"
   //             style={{ marginBottom: '20px' }}
   //             defaultState={{ center: [55.75, 37.57], zoom: 9 }} />
   //       </div>
   //    </YMaps>


   //    // <YMaps query={{ apikey: '0a62e602-e671-4320-a847-0c31041bdb2e' }}>
   //    //    <div>
   //    //       <Map
   //    //          defaultState={{ center: [55.751574, 37.573856], zoom: 9 }}
   //    //          width="100%"
   //    //          height="400px"
   //    //          style={{ marginBottom: '20px' }}
   //    //       />
   //    //    </div>
   //    // </YMaps>
   // );
};

export default MapWithSearch;

