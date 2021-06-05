import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native'
import SplashScreen from './auth/splashScreen/SplashScreen';
import SignIn from './auth/signIn/SignIn';
import SignUp from './auth/signUp/SignUp';
import ForgotPassword from './auth/forgotPassword/ForgotPassword'

const StackPreAuth = createStackNavigator();


export default function PreAuthNavigation({ navigation }) {
    let preAuthStackNavData = [
        {
            name: 'SplashScreen',
            component: SplashScreen,
            options: {
                headerShown: false,
                headerLeft: null,
                headerBackground: { source: null },
                headerTitleStyle: {
                    fontFamily: null,
                    color: null,
                    fontSize: null,
                },
            },
        },
        {
            name: 'SignIn',
            component: SignIn,
            options: {
                headerShown: false,
                headerLeft: null,
                headerBackground: { source: null },
                headerTitleStyle: {
                    fontFamily: null,
                    color: null,
                    fontSize: null,
                },
            },
        },
        {
            name: 'SignUp',
            component: SignUp,
            options: {
                headerShown: false,
                headerLeft: null,
                headerBackground: { source: null },
                headerTitleStyle: {
                    fontFamily: null,
                    color: null,
                    fontSize: null,
                },
            },
        },
        {
            name: 'ForgotPassword',
            component: ForgotPassword,
            options: {
                headerShown: false,
                headerLeft: null,
                headerBackground: { source: null },
                headerTitleStyle: {
                    fontFamily: null,
                    color: null,
                    fontSize: null,
                },
            },
        },
    ]



    return (
        <React.Fragment>
            <StackPreAuth.Navigator initialRouteName="SplashScreen" headerMode='none'>
                {preAuthStackNavData.map((item, idx) => (
                    <StackPreAuth.Screen
                        key={`stack_item-${idx + 1}`}
                        name={item.name}
                        component={item.component}
                        options={{
                            headerShown: item.options.headerShown ? item.options.headerShown : null,
                            headerLeft: "",
                            headerBackground: "",
                            headerTitleStyle: "",
                        }}
                    />
                ))}
            </StackPreAuth.Navigator>
        </React.Fragment>
    )
}
