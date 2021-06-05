import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import {useStateCallback, usePrevious} from "src/constants/customHooks/customHooks"
import Vicon from "src/assets/icons/Vicon"
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';




const SignInScreen = ({ navigation }) => {
    // // ----------Localization hooks & Router Hooks-------------
    const { t, i18n } = useTranslation('common');

    // // ----------Props -------------------------------------------------
    // null


    // ----------redux store useDispatch & useSelector --------------------

    

    // // ----------hooks useState--------------------------------------------------
    const [userData, setUserData] = useStateCallback({
        username: '',
        password: '',
        confirmPassword: ""
    })

    const [userErr, setUserErr] = useState({
        usernameErr: null,
        passwordErr: null,
        confirmPasswordErr: null,
        invalidCredentialsErr: null,
    })

    const [control, setControl] = useState({
        isValidInputText: false,
        secureTextEntry: true,
    })







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

    const handleConfirmPasswordChange = (val) => {
        setUserData({ ...userData, confirmPassword: val },
            userData => {
                handleValidateconfirmPassword(userData)
            })
    }


    // // ----------validation--------------------------------------------------
    const handleValidateAll = () => {
        let isValidUsername = handleValidateUsername(userData.username)
        let isValidPassword = handleValidatePassword(userData.password)
        let isValidConfirmPassword = handleValidateconfirmPassword(userData.confirmPassword)
        return isValidUsername && isValidPassword && isValidConfirmPassword
    }

    const handleValidateUsername = (username) => {
        let usernameVal = username.trim();
        let usernameErrVal = "";
        let isValidInputText = false;
        let returnVal = false;
        if (usernameVal === null || usernameVal === "") {
            usernameErrVal = t("Username must not be blank.")
            isValidInputText = false
            returnVal = false
        }
        else if (username.trim().length < 4) {
            usernameErrVal = t("Username must be at least 4 characters long.")
            isValidInputText = false
            returnVal = false
        } else {
            usernameErrVal = ""
            isValidInputText = true
            returnVal = true
        }
        // // ###2nd way to update state in loop (here mulitple time in function)###
        setUserErr(userErr => ({ ...userErr, usernameErr: usernameErrVal }))
        setControl(control => ({ ...control, isValidInputText: isValidInputText }))
        return returnVal   // true or false
    }

    const handleValidatePassword = (password) => {
        let passwordErr = "";
        let returnVal = false;
        if (password === null || password === "") {
            passwordErr = t("Password can not be empty.")
            returnVal = false
        }
        else if (password.length < 3) {
            passwordErr = t("Password must be at least 3 characters long.")
            returnVal = false
        } else {
            passwordErr = ""
            returnVal = true
        }
        // // ###2nd way to update state in loop (here mulitple time in function)###
        setUserErr(userErr => ({ ...userErr, passwordErr: passwordErr }))
        return returnVal  // true or false
    }

    const handleValidateconfirmPassword = (confirmPassword) => {
        let confirmPasswordErr = ""
        let returnVal = false
        if (confirmPassword === null || confirmPassword === "") {
            confirmPasswordErr = t("Password can not be empty.")
            returnVal = false
        }
        else if (userData.password !== confirmPassword) {
            confirmPasswordErr = t("Both password should be match")
            returnVal = false
        }
        else {
            confirmPasswordErr = ""
            returnVal = true
        }
        // // ###2nd way to update state in loop (here mulitple time in function)###
        setUserErr(userErr => ({ ...userErr, confirmPasswordErr: confirmPasswordErr }))
        return returnVal
    }

    const handleSecureTextEntry = () => {
        setControl({
            ...control,
            secureTextEntry: !control.secureTextEntry
        });
    }


    const handleSignUP = () => {
        if (handleValidateAll()) {
            // dispatch(userSignInActions.SignIn(userData))

        } else {
            // console.log("User Id and Password are mandatory.")
        }
    }


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text__header}>{("Register Now!")}</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView>
                    <View>
                        <Text style={styles.form__label__text}>{t("username")}</Text>
                        <View style={styles.form__inputRow}>
                            <Vicon iconSet="FontAwesome" name="user-o" size={20} color={"#05375a"} />
                            <TextInput
                                placeholder={t("Enter Username")}
                                style={styles.form__inputRow__text}
                                autoCapitalize="none"
                                value={userData.username}
                                onChangeText={(val) => handleUsernameInputChange(val)}
                            />
                            {control.isValidInputText ?
                                <Animatable.View animation="bounceIn" >
                                    <Vicon iconSet="Feather" name="check-circle" size={20} color={"green"} />
                                </Animatable.View>
                                : null
                            }
                        </View>
                        {userErr.usernameErr ?
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.form__errorMsg}> {userErr.usernameErr} </Text>
                            </Animatable.View>
                            : null
                        }
                    </View>

                    <View>
                        <Text style={[styles.form__label__text, {
                            marginTop: 35
                        }]}>{t("password")}</Text>
                        <View style={styles.form__inputRow}>
                            <Vicon iconSet="Feather" name="lock" size={20} color={"black"} />

                            <TextInput
                                placeholder={t("Enter Password")}
                                secureTextEntry={control.secureTextEntry ? true : false}
                                style={styles.form__inputRow__text}
                                autoCapitalize="none"
                                value={userData.password}
                                onChangeText={(val) => handlePasswordChange(val)}
                            />
                            <TouchableOpacity onPress={handleSecureTextEntry} >
                                {control.secureTextEntry ?
                                    <Vicon iconSet="Feather" name="eye-off" size={20} color="grey" />
                                    :
                                    <Vicon iconSet="Feather" name="eye" size={20} color="grey" />
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
                    <View>
                        <Text style={[styles.form__label__text, { marginTop: 35 }]}>{t("Confirm Password")}</Text>
                        <View style={styles.form__inputRow}>
                            <Vicon iconSet="Feather" name="lock" size={20} color={"#05375a"} />
                            <TextInput
                                placeholder={t("Confirm Entered Your Password")}
                                secureTextEntry={control.secureTextEntry ? true : false}
                                style={styles.form__inputRow__text}
                                autoCapitalize="none"
                                value={userData.confirmPassword}
                                onChangeText={(val) => handleConfirmPasswordChange(val)}
                            />
                            <TouchableOpacity onPress={handleSecureTextEntry} >
                                {control.secureTextEntry ?
                                    <Vicon iconSet="Feather" name="eye-off" size={20} color="grey" />
                                    :
                                    <Vicon iconSet="Feather" name="eye" size={20} color="grey" />
                                }
                            </TouchableOpacity>
                        </View>
                        {userErr.confirmPasswordErr ?
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.form__errorMsg}> {userErr.confirmPasswordErr} </Text>
                            </Animatable.View>
                            : null
                        }
                    </View>
                    <View style={styles.form__private__view}>
                        <Text style={styles.form__private__view__text}>
                            {t("By signing up you agree to our")}
                        </Text>
                        <Text style={[styles.form__private__view__text, { fontWeight: 'bold' }]}>{" "}{t("Terms of service")}</Text>
                        <Text style={styles.form__private__view__text}>{" "}and</Text>
                        <Text style={[styles.form__private__view__text, { fontWeight: 'bold' }]}>{" "}{t("Privacy policy")}</Text>
                    </View>
                    <View style={styles.form__button__view}>
                        <TouchableOpacity onPress={() => { handleSignUP() }} style={styles.form__touchableOpacity__button} >
                            <Text style={styles.form__touchableOpacity__button__text}>{t("sign up")}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.form__touchableOpacity__button} >
                            <Text style={styles.form__touchableOpacity__button__text}>{t("sign in")}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text__header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    form__label__text: {
        color: '#05375a',
        fontSize: 18
    },
    form__inputRow: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    form__inputRow__text: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    form__errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    form__button__view: {
        alignItems: 'center',
        marginTop: 50
    },
    form__touchableOpacity__button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 50,
        borderRadius: 10,
        borderColor: '#009387',
        borderWidth: 1,
        marginTop: 15
    },
    form__touchableOpacity__button__text: {
        color: '#009387',
        fontSize: 18,
        fontWeight: 'bold',
    },
    form__private__view: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    form__private__view__text: {
        color: 'grey'
    }
});
