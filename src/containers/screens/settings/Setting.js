import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Pressable } from 'react-native'
import Vicon from "../../../assets/icons/Vicon"
import { DrawerActions } from '@react-navigation/native'
import NgrOkUrl from "./stacks/NgrOkUrl"
import SettingHome from "./stacks/SettingHome"
import RetrieveTask from "../tasks/stacks/RetrieveTask"

const StackSetting = createStackNavigator();



export default function Setting({ navigation }) {
    
    let settingStackNavData = [
        {
            name: 'SettingHome',
            component: SettingHome,
            headerShown: false,
            headerLeft: null,
            headerBackground: { source: null },
            headerTitleStyle: {
                fontFamily: null,
                color: null,
                fontSize: null,
            },
        },
        {
            name: 'NgrOkUrl',
            component: NgrOkUrl,
            headerShown: false,
            headerLeft: null,
            headerBackground: { source: null },
            headerTitleStyle: {
                fontFamily: null,
                color: null,
                fontSize: null,
            },
        },
        // from other stacks
        {
            name: 'RetrieveTask',
            component: RetrieveTask,
            headerShown: false,
            headerLeft: null,
            headerBackground: { source: null },
            headerTitleStyle: {
                fontFamily: null,
                color: null,
                fontSize: null,
            },
        },
    ]

    
    return (
        <React.Fragment>

            <StackSetting.Navigator initialRouteName="SettingHome" headerMode='none'>
                {settingStackNavData.map((item, idx) => (
                    <StackSetting.Screen
                        key={`stack_item-${idx + 1}`}
                        name={item.name}
                        component={item.component}
                        options={{
                            headerShown: item.headerShown ? item.headerShown : null,
                            headerLeft: "",
                            headerBackground: "",
                            headerTitleStyle: "",
                        }}
                    />
                ))}
            </StackSetting.Navigator>
    </React.Fragment>
    )
}
