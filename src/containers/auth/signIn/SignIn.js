import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useStateCallback, usePrevious } from "../../../constants/customHooks/customHooks"
import { useSelector, useDispatch } from 'react-redux'
import { userSignInActions, userAuthStatusActions } from "../../../Redux-actions/index"

import {
    ScrollView,
    View,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    Text

} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Vicon from "src/assets/icons/Vicon"
import styles from "./signInStyle"


export default function SignIn({ navigation }) {
    // // ----------Localization hooks & Router Hooks-------------
    const { t, i18n } = useTranslation('common');

    // // ----------Props -------------------------------------------------
    // null


    // ----------redux store useDispatch & useSelector --------------------
    const dispatch = useDispatch()
    const reducerState = useSelector(
        (state) => (state)
    );
    let userReducer = reducerState.UserReducer


    // // ----------hooks useState--------------------------------------------------
    const [userData, setUserData] = useStateCallback({
        username: '',
        password: '',
    })

    const [userErr, setUserErr] = useState({
        usernameErr: null,
        passwordErr: null,
        invalidCredentialsErr: null,
    })

    const [control, setControl] = useState({
        isValidInputText: false,
        secureTextEntry: true,
    })




    // // ----------hooks useEffect--------------------------------------------------
    // // ***To check responce/error after success/error action from reducer***

    const { isLoading, signInResponce, signInError, authToken } = userReducer
    const prevPropsState = usePrevious({ isLoading, signInResponce, signInError, authToken })  // custom hook to get previous props & state

    useEffect(() => {
        if (prevPropsState) {
            if (prevPropsState.signInResponce !== signInResponce && signInResponce) {
                dispatch(userAuthStatusActions.authStatus())
                navigation.popToTop()
            }
            if (prevPropsState.signInError !== signInError && signInError) {
                setUserErr({ ...userErr, invalidCredentialsErr: t("Invalid Credential") })
            }
        }


    }, [userReducer])


    // // ----------Other--------------------------------------------------




    // // ----------handler functions--------------------------------------------------
    const handleUsernameInputChange = (val) => {
        setUserData({ ...userData, username: val },
            userData => {
                handleValidateUsername(userData.username)
            })
    }

    const handlePasswordChange = (val) => {
        setUserData({ ...userData, password: val },
            userData => {
                handleValidatePassword(userData.password)
            })
    }


    // // ----------validation--------------------------------------------------
    const handleValidateAll = () => {
        let isValidUsername = handleValidateUsername(userData.username)
        let isValidPassword = handleValidatePassword(userData.password)
        return isValidUsername && isValidPassword
    }

    const handleValidateUsername = (username) => {
        let usernameVal = username.trim();
        let usernameErrVal = "";
        let isValidInputText = false;
        let returnVal = false;
        if (usernameVal === null || usernameVal === "") {
            usernameErrVal = t("Username must not be blank.")
            isValidInputText = false
        }
        else if (username.trim().length < 4) {
            usernameErrVal = t("Username must be at least 4 characters long.")
            isValidInputText = false
        } else {
            usernameErrVal = ""
            isValidInputText = true
            returnVal = true        // change if there is no error
        }
        // // ###2nd way to update state in loop (here mulitple time in function)###
        setUserErr(userErr => ({ ...userErr, usernameErr: usernameErrVal }))
        setControl(control => ({ ...control, isValidInputText: isValidInputText }))
        return returnVal   // true or false
    }

    const handleValidatePassword = (password) => {
        let passwordErr = "";
        let returnVal = false;
        if (password.length < 3) {
            passwordErr = t("Password must be at least 3 characters long.")
        } else {
            passwordErr = ""
            returnVal = true  // change if there is no error
        }
        // // ###2nd way to update state in loop (here mulitple time in function)###
        setUserErr(userErr => ({ ...userErr, passwordErr: passwordErr }))
        return returnVal  // true or false
    }

    const handleSecureTextEntry = () => {
        setControl({
            ...control,
            secureTextEntry: !control.secureTextEntry
        });
    }


    const handleLogin = () => {
        if (handleValidateAll()) {
            dispatch(userSignInActions.SignIn(userData))

        } else {
            // console.log("User Id and Password are mandatory.")
        }
    }




    return (
        <React.Fragment>
            <View style={styles.container}>
                <StatusBar backgroundColor='#009387' barStyle="light-content" />
                <View style={styles.header}>
                    <Text style={styles.text__header}>{t("Welcome")}</Text>
                </View>
                <Animatable.View animation="fadeInUpBig" style={[styles.formView, { backgroundColor: "white" }]}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View>
                            <Text style={[styles.form__label__text, { color: "black" }]}>
                                {t("username")}
                            </Text>
                            <View style={styles.form__inputRow}>
                                <Vicon iconSet="FontAwesome" name="user" size={20} color={"black"} />
                                <TextInput
                                    placeholder={t("enter your username")}
                                    placeholderTextColor="#666666"
                                    style={[styles.form__inputRow__text, { color: "black" }]}
                                    autoCapitalize="none"
                                    value={userData.username}
                                    onChangeText={(val) => handleUsernameInputChange(val)}
                                // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                                />
                                {control.isValidInputText ?
                                    <Animatable.View animation="bounceIn" >
                                        <Vicon iconSet="Feather" name="check-circle" size={20} color={"green"} />
                                    </Animatable.View>
                                    : null}
                            </View>
                            {userErr.usernameErr ?
                                <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.form__errorMsg}> {userErr.usernameErr} </Text>
                                </Animatable.View>
                                : null
                            }
                        </View>

                        <View>
                            <Text style={[styles.form__label__text, { color: "black", marginTop: 35 }]}>
                                {t("password")}
                        </Text>
                            <View style={styles.form__inputRow}>
                                <Vicon iconSet="Feather" name="lock" size={20} color={"black"} />
                                <TextInput
                                    placeholder={t("enter your password")}
                                    placeholderTextColor="#666666"
                                    secureTextEntry={control.secureTextEntry ? true : false}
                                    style={[styles.form__inputRow__text, { color: "black" }]}
                                    autoCapitalize="none"
                                    value={userData.password}
                                    onChangeText={(val) => handlePasswordChange(val)}
                                />
                                <TouchableOpacity onPress={handleSecureTextEntry} >
                                    {control.secureTextEntry ?
                                        <Vicon iconSet="Feather" name="eye-off" size={20} color="grey" />
                                        :
                                        <Vicon iconSet="Feather" name="eye" size={20} color="#900" />
                                    }
                                </TouchableOpacity>
                            </View>
                            {userErr.passwordErr ?
                                <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.form__errorMsg}> {userErr.passwordErr} </Text>
                                </Animatable.View>
                                : null
                            }
                        </View>

                        <TouchableOpacity>
                            <Text onPress={() => navigation.navigate("ForgotPassword")} style={{ color: '#009387', marginTop: 15 }}>{t("forgot password")}</Text>
                        </TouchableOpacity>
                        {userErr.invalidCredentialsErr ?
                                <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.form__errorMsg}> {userErr.invalidCredentialsErr} </Text>
                                </Animatable.View>
                                : null
                            }
                        <View style={styles.form__button__view}>
                            <TouchableOpacity
                                style={styles.form__touchableOpacity__button}
                                onPress={() => { handleLogin(userData.username, userData.password) }} >
                                <Text style={styles.form__touchableOpacity__button__text }>
                                    {t("sign in")}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.form__touchableOpacity__button]}
                                onPress={() => navigation.navigate('SignUp')} >
                                <Text style={[styles.form__touchableOpacity__button__text]}>
                                    {t("sign up")}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </Animatable.View>
            </View>
        </React.Fragment>
    );
}
