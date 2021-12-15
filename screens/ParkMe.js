import React from 'react';
import { SafeAreaView, View, TouchableOpacity, StyleSheet } from "react-native";
import { Marker, Polyline } from 'react-native-maps';
import MapView from 'react-native-maps';
import { Chip, Button, Text } from 'react-native-elements';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp
} from "react-native-responsive-screen";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import deviceStorage from '../utils/storage';

const APP_ID = "rNAU3xdu7YhJWEJ6DnJp";
const API_KEY = "7H7sYbMcmS1CyjtblgmXM50CXMQGHqQ5KDovjHON0Kg";

const ParkMe = ({ navigation }) => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    
    const [mapMarkers, setMapMarkers] = React.useState([
        {
            latitude: "32.109333",
            longitude: "34.855499"
        }
    ]);
    const [startingLocation, setStartingLocation] = React.useState({
        latitude: "37.025",
        longitude: "-122.023",
    });
    const [finishLocation, setFinishLocation] = React.useState({
        latitude: "37.78825",
        longitude: "-122.4324",
    });
    const [loading, setLoading] = React.useState(true);
    const [summary, setSummary] = React.useState(null);
    const [region, setRegion] = React.useState({
        latitude: parseFloat("32.0754"),
        longitude: parseFloat("34.7750"),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const focused = useIsFocused();
    //
    const [lately, setLately] = React.useState(0);

    const getRoute = () => {
        // we are using parseFloat() because HERE API expects a float
        let from_lat = parseFloat(startingLocation.latitude)
        let from_long = parseFloat(startingLocation.longitude)
        let to_lat = parseFloat(finishLocation.latitude)
        let to_long = parseFloat(finishLocation.longitude)
        // we will save all Polyline coordinates in this array
        axios.get(`https://route.ls.hereapi.com/routing/7.2/calculateroute.json?apiKey=${API_KEY}&waypoint0=geo!${from_lat},${from_long}&waypoint1=geo!${to_lat},${to_long}&mode=fastest;car;traffic:disabled&legAttributes=shape`).then(res => {
            // here we are getting all route coordinates from API response
            res.data.response.route[0].leg[0].shape.map(m => {
                // here we are getting latitude and longitude in seperate variables because HERE sends it together, but we
                // need it seperate for <Polyline/>
                let latlong = m.split(',');
                let latitude = parseFloat(latlong[0]);
                console.log(latitude);
                
                let longitude = parseFloat(latlong[1]);
                console.log(longitude);
            })
            setLoading(false);
            setSummary(res.data.response.route[0].summary);
        }).catch(err => {
            console.log(err.response)
        })
    }

    const parkMe = () => {
        if(user.isAuthorized){
            navigation.navigate("Map");
        } else {
            navigation.navigate("Login");
        }
    }

    React.useEffect(() => {
        getRoute();
    }, []);

    React.useEffect(() => {
        axios.post("http://chance-app.herokuapp.com/chance-today-count", {
            Address: {
                CityId: 1
            }
        }, {
            headers: {
                "Authorization": `Bearer ${user.token}`,
                'Referer': 'http://www.bluewhite.space/',
                'Origin': 'http://www.bluewhite.space'
            }
        }).catch(e => {
            // if(e.response.status === 503){
            //     deviceStorage.signout();
            //     dispatch({ type: "LOG_OUT" });
            //     navigation.navigate("Login");
            // }
            console.warn(e.response)
        }).then(result => {
            console.warn("res", result.data);
            setLately(result.data.data[0].count);
        })
    }, [focused]);

    return(
        <SafeAreaView>
            { !loading && (
                <View style={styles.mapContainer}>
                    <MapView region={region} style={styles.mapview}>
                        { mapMarkers.map((item, index) => (
                            <Marker
                                key={index}
                                coordinate={{
                                    latitude: parseFloat(item.latitude),
                                    longitude: parseFloat(item.longitude)
                                }}
                                title="Starting location"
                            />  
                        )) }
                        <Marker
                            coordinate={{
                                latitude: parseFloat(startingLocation.latitude),
                                longitude: parseFloat(startingLocation.longitude)
                            }}
                            title="Starting location"
                        />
                    </MapView>
                </View>
            ) }
            <View style={styles.chips}>
                <View style={styles.chip}>
                    <Chip
                        title={`Lately parkings reported in your area - ${lately}`}
                    />
                </View>
                <View style={styles.chip}>
                    <Chip
                        title="The last spot has reported (mings ago) - 3"
                    />
                </View>
                <View style={styles.chip}>
                    <Chip
                        title="The closest to you at a distance of - 200m"
                    />
                </View>
                <TouchableOpacity onPress={parkMe}>
                    <View style={styles.btn}>
                        <Text style={[styles.biggerText, { color: "#fff" }]}>Park me!</Text>
                        <Text style={{ color: "#fff" }}>You have 3 more attempts left</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mapContainer: {
        opacity: 0.5
    },
    mapview: {
        width: wp("100%"),
        height: hp("100%")
    },
    chips: {
        opacity: 0.8,
        position: "absolute",
        top: hp("15%"),
        width: wp("100%"),
        justifyContent: "center",
        alignItems: "center"
    },
    chip: {
        marginBottom: hp("5%"),
        width: "100%",
        alignItems: "center",
    },
    btn: {
        backgroundColor: "#2288DC",
        width: wp("95%"),
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: hp("1.5%"),
        borderRadius: wp("1%")
    },
    biggerText: {
        fontSize: wp("8%")
    }
});

export default ParkMe;