import React from 'react'
import { View, Text, Pressable } from 'react-native'
import Vicon from '../../../assets/icons/Vicon';
import { DrawerActions } from '@react-navigation/native'
import DropDown from './DropDown';


export default function Dashboard(props) {
    console.log(props)


    return (
        <React.Fragment>
            <Pressable style={{ marginLeft: 5, width: 25 }} onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}>
                <Vicon iconSet="Feather" name="menu" size={25} color="#900" />
            </Pressable>
            <View>
                <Text>Dashboard</Text>
            </View>
            <DropDown />
        </React.Fragment>

    )
}
