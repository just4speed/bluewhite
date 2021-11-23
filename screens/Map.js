import React from 'react';
import { SafeAreaView, View, TouchableOpacity, StyleSheet } from "react-native";
import { Marker } from 'react-native-maps';
import MapView from 'react-native-maps';
import { ButtonGroup, Text } from 'react-native-elements';
import axios from 'axios';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp
} from "react-native-responsive-screen";

const APP_ID = "rNAU3xdu7YhJWEJ6DnJp";
const API_KEY = "7H7sYbMcmS1CyjtblgmXM50CXMQGHqQ5KDovjHON0Kg";

const Map = ({ navigation }) => {
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [startingLocation, setStartingLocation] = React.useState({
        latitude: "37.025",
        longitude: "-122.023",
    });
    const [finishLocation, setFinishLocation] = React.useState({
        latitude: "37.78825",
        longitude: "-122.4324",
    });
    const [loading, setLoading] = React.useState(false);
    // const [summary, setSummary] = React.useState(null);
    const [region, setRegion] = React.useState({
        latitude: parseFloat("32.0754"),
        longitude: parseFloat("34.7750"),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const getRoute = () => {
        // we are using parseFloat() because HERE API expects a float
        let from_lat = parseFloat(startingLocation.latitude)
        let from_long = parseFloat(startingLocation.longitude)
        let to_lat = parseFloat(finishLocation.latitude)
        let to_long = parseFloat(finishLocation.longitude)
        // we will save all Polyline coordinates in this array
        // axios.get(`https://route.ls.hereapi.com/routing/7.2/calculateroute.json?apiKey=${API_KEY}&waypoint0=geo!${from_lat},${from_long}&waypoint1=geo!${to_lat},${to_long}&mode=fastest;car;traffic:disabled&legAttributes=shape`).then(res => {
        //     // here we are getting all route coordinates from API response
        //     res.data.response.route[0].leg[0].shape.map(m => {
        //         // here we are getting latitude and longitude in seperate variables because HERE sends it together, but we
        //         // need it seperate for <Polyline/>
        //         let latlong = m.split(',');
        //         let latitude = parseFloat(latlong[0]);
        //         console.log(latitude);
                
        //         let longitude = parseFloat(latlong[1]);
        //         console.log(longitude);
        //     })
        //     setLoading(false);
        //     setSummary(res.data.response.route[0].summary);
        // }).catch(err => {
        //     console.log(err.response)
        // })
    }

    React.useEffect(() => {
        getRoute()
    }, []);

    const buttons = [5, 15, 45]

    return(
        <SafeAreaView>
            { !loading && (
                <View>
                    <MapView region={region} style={styles.mapview}>
                        <Marker
                            coordinate={{
                                latitude: parseFloat(startingLocation.latitude),
                                longitude: parseFloat(startingLocation.longitude)
                            }}
                            title="Starting location"
                        />
                        <Marker
                            coordinate={{
                                latitude: parseFloat(finishLocation.latitude),
                                longitude: parseFloat(finishLocation.longitude)
                            }}
                            title="Finishlocation"
                        />
                    </MapView>
                </View>
            ) }
            <ButtonGroup
                selectedIndex={selectedIndex}
                onPress={(index) => setSelectedIndex(index)}
                buttons={buttons}
                containerStyle={styles.buttonItem}
                selectedTextStyle={{ color: "white", fontWeight: "bold" }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mapview: {
        width: wp("100%"),
        height: hp("70%")
    },
    buttonItem: {
        height: hp("7%")
    }
});

export default Map;