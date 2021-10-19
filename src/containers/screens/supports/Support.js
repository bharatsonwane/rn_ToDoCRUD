import React from 'react'
import { Pressable, View, Text, } from 'react-native'
import Vicon from "src/assets/icons/Vicon"
import { DrawerActions } from '@react-navigation/native'

export default function Support({ navigation }) {
    return (
        <React.Fragment>
            <Pressable style={{ marginLeft: 10, width: 25 }} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Vicon iconSet="Entypo" name="menu" size={25} color={"green"} />
            </Pressable>
            <View>
                <Text>Supports</Text>
            </View>
            <Pressable style={{ marginLeft: 10, width: 25 }}>
                <Vicon iconSet="Ionicons" name="arrow-back" size={25} color={"green"} />
            </Pressable>
        </React.Fragment>
    )
}
