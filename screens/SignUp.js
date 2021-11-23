import React from 'react';
import { SafeAreaView, View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Input, Text, Button } from 'react-native-elements';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp
} from "react-native-responsive-screen";

const SignUp = () => {
    const [values, setValues] = React.useState({
        firstName: "",
        lastName: "",
        mobile: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = React.useState([]);

    const onChangeValue = ( key, value ) => {
        setValues({
            ...values,
            [key]: value
        });
    }

    const onSignUp = () => {
        let formErrors = [];
        // Name validation
        if(values.firstName.length === 0){
            formErrors.push({ field: "firstName", message: "Enter your first name!" });
        }
        if(values.firstName.length === 0){
            formErrors.push({ field: "lastName", message: "Enter your last name!" });
        }
        // Email validation
        if(values.mobile.length === 0){
            formErrors.push({ field: "mobile", message: "Enter your mobile number!" });
        }
        // Password validation
        if(values.password.length === 0){
            formErrors.push({ field: "password", message: "Enter your password!" });
        }
        if(values.confirmPassword.length === 0){
            formErrors.push({ field: "confirmPassword", message: "Confirm your password" });
        }
        if(values.confirmPassword !== values.password){
            formErrors.push({ field: "confirmPassword", message: "Your passwords do not match" });
        }
        if(formErrors.length === 0){
            setErrors([]);
            dispatch({
                type: "LOGIN",
                payload: {
                    mobile: "+78312384921"
                }
            });
            navigation.navigate("ParkMe");
        } else {
            setErrors(formErrors);
        }
    }

    return(
        <SafeAreaView>
            <ScrollView vertical contentContainerStyle={{ paddingHorizontal: wp("10%"), paddingVertical: hp("5%") }}>
                <Text h4 style={styles.title}>Create a new account</Text>
                <Input
                    placeholder={"John"}
                    leftIcon={{ type: 'font-awesome', name: 'user-circle', color: "#2288DC" }}
                    leftIconContainerStyle={{ marginRight: wp("2%") }}
                    label={"First Name"}
                    containerStyle={styles.inputContainer}
                    onChangeText={value => onChangeValue("firstName", value)}
                    errorStyle={styles.errorMessage}
                    errorMessage={errors.filter(e => e.field === "firstName").length > 0 && errors.filter(e => e.field === "firstName")[0].message}
                />
                <Input
                    placeholder={"Doe"}
                    leftIcon={{ type: 'font-awesome', name: 'user-circle', color: "#2288DC" }}
                    leftIconContainerStyle={{ marginRight: wp("2%") }}
                    label={"Last Name"}
                    containerStyle={styles.inputContainer}
                    onChangeText={value => onChangeValue("lastName", value)}
                    errorStyle={styles.errorMessage}
                    errorMessage={errors.filter(e => e.field === "lastName").length > 0 && errors.filter(e => e.field === "lastName")[0].message}
                />
                <Input
                    keyboardType={"phone-pad"}
                    placeholder={"+1 (234) 56-78"}
                    leftIcon={{ type: 'font-awesome', name: 'mobile', color: "#2288DC" }}
                    leftIconContainerStyle={{ marginRight: wp("2%") }}
                    label={"Mobile Number"}
                    containerStyle={styles.inputContainer}
                    onChangeText={value => onChangeValue("mobile", value)}
                    errorStyle={styles.errorMessage}
                    errorMessage={errors.filter(e => e.field === "mobile").length > 0 && errors.filter(e => e.field === "mobile")[0].message}
                />
                <Input
                    placeholder="******"
                    leftIcon={{ type: 'font-awesome', name: 'lock', color: "#2288DC" }}
                    leftIconContainerStyle={{ marginRight: wp("2%") }}
                    secureTextEntry={true}
                    label={"Password"}
                    containerStyle={styles.inputContainer}
                    onChangeText={value => onChangeValue("password", value)}
                    errorStyle={styles.errorMessage}
                    errorMessage={errors.filter(e => e.field === "password").length > 0 && errors.filter(e => e.field === "password")[0].message}
                />
                <Input
                    placeholder="******"
                    leftIcon={{ type: 'font-awesome', name: 'lock', color: "#2288DC" }}
                    leftIconContainerStyle={{ marginRight: wp("2%") }}
                    secureTextEntry={true}
                    label={"Confirm Password"}
                    containerStyle={styles.inputContainer}
                    onChangeText={value => onChangeValue("confirmPassword", value)}
                    errorStyle={styles.errorMessage}
                    errorMessage={errors.filter(e => e.field === "confirmPassword").length > 0 && errors.filter(e => e.field === "confirmPassword")[0].message}
                />
                <Button onPress={onSignUp} title="Sign Up"/>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        marginBottom: hp("2%"),
        textAlign: "left"
    },
    inputContainer: {
        marginBottom: hp("2%")
    },
    errorMessage: {
        color: "red",
        fontWeight: "bold"
    },
    newAccount: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: hp("2%")
    }
});

export default SignUp;