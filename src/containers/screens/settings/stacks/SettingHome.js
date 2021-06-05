import React from 'react'
import { StyleSheet, Text, View, Pressable, Button } from 'react-native'
import Vicon from "../../../../assets/icons/Vicon"
import { DrawerActions } from '@react-navigation/native'



const SettingHome = (props) => {
    return (
        <React.Fragment>
            <Pressable style={{ marginLeft: 10, width: 25 }} onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}>
                <Vicon iconSet="Entypo" name="menu" size={25} color={"green"} />
            </Pressable>
            <View>
                <Text>Setting</Text>
            </View>
            <Pressable style={{ marginLeft: 10, width: 25 }}>
                <Vicon iconSet="Ionicons" name="arrow-back" size={25} color={"green"} />
            </Pressable>
            <View>
            <Button
                    title="Change NgrOk url"
                    onPress={() => props.navigation.navigate('NgrOkUrl')}
                />
            </View>
            <View>
                <Button
                    title="Retrieve Task"
                    onPress={() => props.navigation.navigate('RetrieveTask')}
                />
            </View>
        </React.Fragment>
    )
}

export default SettingHome

const styles = StyleSheet.create({

})
