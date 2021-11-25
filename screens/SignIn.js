import React from 'react';
import { SafeAreaView, View, TouchableOpacity, StyleSheet } from "react-native";
import { Input, Text, Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp
} from "react-native-responsive-screen";
// Utils
import { request } from "../utils/request.js";
import deviceStorage from '../utils/storage.js';

const SignIn = ({ navigation }) => {
    const [values, setValues] = React.useState({
        mobile: "",
        password: ""
    });
    const [errors, setErrors] = React.useState([]);
    const dispatch = useDispatch();

    const onChangeValue = ( key, value ) => {
        setValues({
            ...values,
            [key]: value
        });
    }

    const onSignIn = () => {
        let formErrors = [];
        // Email validation
        if(values.mobile.length === 0){
            formErrors.push({ field: "mobile", message: "Enter your mobile number!" });
        }
        // Password validation
        if(values.password.length === 0){
            formErrors.push({ field: "password", message: "Enter your password!" });
        }
        if(formErrors.length === 0){
            setErrors([]);
            request("/login", "POST", {
                User:{
                    MobileNum: values.mobile,
                    Password: values.password
                }
            }).catch(e => {
                if(e?.response?.status === 400){
                    setErrors([
                        {
                            field: "mobile",
                            message: e.response.data.message
                        },
                        {
                            field: "password",
                            message: e.response.data.message
                        }
                    ]);
                }
            }).then(result => {
                if(result?.status === 200){
                    dispatch({
                        type: "LOGIN",
                        payload: result.data
                    })
                    deviceStorage.login(result.data.user, result.data.token);
                    navigation.navigate("Map");
                }
            })
        } else {
            setErrors(formErrors);
        }
    }

    const openSignUp = () => {
        navigation.navigate("Register");
    }

    return(
        <SafeAreaView style={{ paddingHorizontal: wp("10%"), paddingTop: hp("5%") }}>
            <Text h4 style={styles.title}>Fill in your credentials</Text>
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
            <Button
                onPress={onSignIn}
                title="Sign In"
            />
            <View style={styles.newAccount}>
                <Text>or </Text>
                <TouchableOpacity onPress={openSignUp}>
                    <Text style={{ color: "#2288DC" }}>create a new account</Text>
                </TouchableOpacity>
            </View>
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

export default SignIn;