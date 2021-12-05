import React from 'react';
import { SafeAreaView, View, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { Chip, Button, Text, ButtonGroup } from 'react-native-elements';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp
} from "react-native-responsive-screen";
import axios from 'axios';
import { useSelector } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const Submit = () => {
    const [sizeSelected, setSizeSelected] = React.useState(1);
    const user = useSelector(state => state.user);
    const [items, setItems] = React.useState([
        {label: 'Street 1', value: 'str1'},
        {label: 'Street 2', value: 'str2'},
        {label: 'Street 3', value: 'str3'},
        {label: 'Street 4', value: 'str4'},
    ]);
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(null);
    // Date picker
    const [date, setDate] = React.useState(new Date());
    const [mode, setMode] = React.useState('date');
    const [show, setShow] = React.useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const submit = () => {
        axios.post("https://chance-app.herokuapp.com/chance", "POST", {
            "Address": {
                "CityId": 1,
                "Text": `מפנה בבוגרשוב ${Math.floor((Math.random()*300) + 1)} בעוד חמש דקות`
            },
            "Chance": {
                "DateStart": "12/5/2021, 1:40:05 AM"
            }
        }, {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        }).catch(e => {
            console.warn("e", e.response)
        }).then(result => {
            console.warn("res", result.data);
        });
    }

    const buttons = ['Small', 'Middle', 'Big'];

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>I leave the parking spot</Text>
            <View style={styles.fields}>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>In a</Text>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ width: wp("12%"), backgroundColor: "#fff", borderRadius: 0 }}>
                            <Button
                                title="..."
                                type="outline"
                                onPress={() => setShow(true)}
                                style={{ borderRadius: 0 }}
                            />
                        </View>
                        { show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                            />
                        )}
                        <Button title="Now!"/>
                    </View>
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>on the </Text>
                    <View style={{ width: wp("45%") }}>
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            placeholder={"Select Street"}
                            setValue={setValue}
                            setItems={setItems}
                            style={{ borderWidth: 0 }}
                            dropDownContainerStyle={{ borderWidth: 0 }}
                        />
                    </View>
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>close to building #</Text>
                    <TextInput
                        placeholder={"#"}
                        value={55}
                        style={styles.input}
                        keyboardType="phone-pad"
                    />
                </View>
                <View style={{ ...styles.fieldContainer, flexDirection: "column", alignItems: "flex-start" }}>
                    <Text style={{ ...styles.fieldLabel, marginBottom: hp("2%") }}>the size is </Text>
                    <ButtonGroup
                        selectedIndex={sizeSelected}
                        onPress={(index) => setSizeSelected(index)}
                        buttons={buttons}
                        selectedTextStyle={{ color: "white", fontWeight: "bold" }}
                    />
                </View>
            </View>
            <View style={{ width: wp("85%")}}>
                <Button
                    title={"Submit"}
                    onPress={submit}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: hp("5%")
    },
    title: {
        fontSize: wp("8%"),
        fontWeight: "bold"
    },
    fields: {
        marginVertical: hp("4%"),
    },
    fieldContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: wp("80%"),
        marginBottom: hp("3%")
    },
    fieldLabel: {
        fontSize: wp("5%")
    },
    input: {
        width: wp("10%"),
        height: wp("10%"),
        borderBottomColor: "#2288DC",
        borderBottomWidth: 3,
        fontSize: wp("5%"),
        paddingHorizontal: wp("1%")
    }
});

export default Submit;