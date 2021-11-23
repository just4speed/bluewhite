import React from 'react';
import { SafeAreaView, View, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { Chip, Button, Text, ButtonGroup } from 'react-native-elements';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp
} from "react-native-responsive-screen";

const Submit = () => {
    const [sizeSelected, setSizeSelected] = React.useState(1);
    const submit = () => {}

    const buttons = ['Small', 'Middle', 'Big']

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>I leave the parking spot</Text>
            <View style={styles.fields}>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>In a</Text>
                    <View>
                        <Button title="Now!" type="outline"/>
                    </View>
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>on the </Text>
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>close to building #</Text>
                    <TextInput
                        placeholder={"#"}
                        value={55}
                        style={styles.input}
                        keyboardType="number-pad"
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