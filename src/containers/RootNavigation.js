import React, { useState, useEffect, useCallback } from 'react'
import { usePrevious } from "../helper/customHooks/customHooks"
import { useSelector, useDispatch } from 'react-redux'
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PreAuthNavigation from "./PreAuthNavigation"
import PostAuthDrawerNavigation from "./PostAuthDrawerNavigation"
import { userAuthStatusActions } from "../Redux-actions/index"
import AsyncStorage from '@react-native-async-storage/async-storage';

const StackRoot = createStackNavigator();

export default function RootNavigation() {
    // // ----------Localization hooks & Router Hooks-------------

    // // ----------Props -------------------------------------------------
    // null


    // ----------redux store useDispatch & useSelector --------------------
    const dispatch = useDispatch()
    const reducerState = useSelector(
        (state) => (state)
    );
    let userReducer = reducerState.UserReducer



    // // ----------hooks useState--------------------------------------------------
    const [state, setstate] = useState({
        authToken: false
    })

    // // ----------hooks useEffect--------------------------------------------------
    // // ***To check responce/error after success/error action from reducer***
    useEffect(() => {
        dispatch(userAuthStatusActions.authStatus())
    }, [])


    const { isLoading, signInResponce, signInError, authToken } = userReducer
    const prevPropsState = usePrevious({ isLoading, signInResponce, signInError, authToken })  // custom hook to get previous props & state

    useEffect(() => {
        if (prevPropsState) {
            if (prevPropsState.authToken !== authToken && authToken) {
                setstate({ ...state, authToken: true })
            }
            if (prevPropsState.authStatus !== authToken && authToken === null)
                setstate({ ...state, authToken: false })
        }
    }, [userReducer])


    return (
        <NavigationContainer>
            <StackRoot.Navigator headerMode='none'>
                <StackRoot.Screen name="rootNavigation" component={state.authToken ? PostAuthDrawerNavigation : PreAuthNavigation}></StackRoot.Screen>
            </StackRoot.Navigator>
        </NavigationContainer>
    )
}
