import React, { useState, useEffect } from "react";
import { usePrevious } from "src/constants/customHooks/customHooks"
import { useSelector, useDispatch } from 'react-redux'
import { userSignOutActions } from "src/Redux-actions/userActions"
import { useTranslation } from 'react-i18next';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from "react-native";




const SignOutModal = (props) => {
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



    // // ----------hooks useEffect--------------------------------------------------
    // // ***To check responce/error after success/error action from reducer***
    const { isLoading, signOutResponce, signOutError } = userReducer
    const prevPropsState = usePrevious({ isLoading, signOutResponce, signOutError })  // custom hook to get previous props & state

    useEffect(() => {
        if (prevPropsState) {
            if (prevPropsState.signOutResponce !== signOutResponce && signOutResponce) {
                // navigation.popToTop()
                // navigation.navigate("rootNavigation")
            }
            if (prevPropsState.signOutError !== signOutError && signOutError) {
                // Error occured during sign out
            }
        }

    }, [userReducer])


    // // ----------handler functions--------------------------------------------------

    const handleSignOut = () => {
        dispatch(userSignOutActions.signOut())
    }


    const sendPropsToParent = (isShowModal) => {
        let show = isShowModal
        props.provideProps(show)
    }

    return (
        <React.Fragment>
            {props.showModal &&
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={props.showModal}
                    onRequestClose={() => {
                        // Alert.alert("Sign Out Modal has been closed.");
                        sendPropsToParent(false);
                    }}
                >
                    <View style={styles.modal__screen}>
                        <View style={styles.modal__container}>
                            <Text style={{ fontSize: 18 }}>Would you like to Sign Out?</Text>
                            <View style={styles.modal__buttonView}>
                                <TouchableOpacity transparent onPress={() => sendPropsToParent(false)} style={[styles.modal__buttonView__button, { backgroundColor: "green" }]} >
                                    <Text style={styles.modal__buttonView__button__text} >{t("Cancel")}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity transparent onPress={() => handleSignOut()} style={[styles.modal__buttonView__button, { backgroundColor: "red" }]} >
                                    <Text style={styles.modal__buttonView__button__text}>{t("Sign Out")}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            }
        </React.Fragment>
    );
};


export default SignOutModal;


const styles = StyleSheet.create({

    modal__screen: {
        // using complete screen as popup modal
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modal__container: {
        alignItems: "center",
        backgroundColor: "white",
        shadowColor: "#000",
        // width: 300,
        // height: 300,
        margin: 5,
        padding: 25,
        borderRadius: 20,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 5 // important property => add border if container match with background
    },
    modal__buttonView: {
        display: "flex",
        alignSelf: "flex-end",
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: 25,
    },
    modal__buttonView__button: {
        marginHorizontal: 20,
        borderRadius: 20,
        elevation: 2
    },
    modal__buttonView__button__text:{
        color: "white",
        fontSize: 18,
        padding: 5,
    },
});
