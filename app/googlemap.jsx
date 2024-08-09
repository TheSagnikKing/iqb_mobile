// import { StyleSheet, Text, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// import * as Location from 'expo-location';

// const GoogleMap = () => {

//   const [region, setRegion] = useState({
//     latitude: 0, // Default to New York City (replace with your default)
//     longitude: 0,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   });


//   const [searchText, setSearchText] = useState("")

//   // const searchPlaces = () => {
//   //   // if(!searchText.trim().length) return

//   //   const googleApisUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json"

//   //   const input = searchText.trim()

//   //   const location = `${location.coords.latitude},${location.coords.longitude}`
//   //   const url = `${googleApisUrl}?query=England&key=AIzaSyCc0rrgXw7WkdvKOqS5YeD6IWHKvl1OJa0`
//   // }


//   useEffect(() => {
//     const searchPlaces = async () => {
//       // if(!searchText.trim().length) return

//       const googleApisUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json"

//       // const input = searchText.trim()

//       // const location = `${location.coords.latitude},${location.coords.longitude}`
//       const url = `${googleApisUrl}?query=London&key=AIzaSyCc0rrgXw7WkdvKOqS5YeD6IWHKvl1OJa0`

//       try {
//         const resp = await fetch(url)
//         const json = await resp.json()

//         // if(json && json.results){
//         //   json.results.map((item) => (
//         //     console.log(item.geometry)
//         //   ))
//         // }

//         console.log("Search Places ", json?.results?.[0]?.geometry)
//       } catch (error) {

//       }
//     }

//     searchPlaces()
//   }, [])



//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);

//   useEffect(() => {
//     (async () => {

//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location);
//       setRegion({
//         ...region,
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude
//       })


//       // console.log("LOCATION ", location)
//     })();
//   }, []);

//   let text = 'Waiting..';
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (location) {
//     text = JSON.stringify(location);
//   }

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         provider={PROVIDER_GOOGLE}
//         showsUserLocation={true}
//       >
//         <Marker
//           coordinate={region} // Replace with a more descriptive title if needed
//         />

//       </MapView>
//     </View>
//   )
// }

// export default GoogleMap

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     width: '100%',
//     height: '100%',
//   },
// })



import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useLocalSearchParams } from 'expo-router';

const GoogleMap = () => {

  const params = useLocalSearchParams()

  const [region, setRegion] = useState({
    latitude: 0, 
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });


  useEffect(() => {
    if(params){
      const searchPlaces = async () => {
          
        const googleApisUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json"
  
        const url = `${googleApisUrl}?query=${params?.county}&key=AIzaSyCc0rrgXw7WkdvKOqS5YeD6IWHKvl1OJa0`
  
        try {
          const resp = await fetch(url)
          const json = await resp.json()
  
          if(json){
            console.log("Search Places ", json?.results?.[0]?.geometry)
  
            setRegion({
              latitude: json?.results?.[0]?.geometry?.location?.lat, 
              longitude: json?.results?.[0]?.geometry?.location?.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            })
          }
          
        } catch (error) {
          console.log("Google Map Error ",error)
        }
      }
  
      searchPlaces()
    }
    
  }, [])


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
      >
        <Marker
          coordinate={region} 
        />

      </MapView>
    </View>
  )
}

export default GoogleMap

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
})


