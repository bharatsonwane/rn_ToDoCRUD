import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { updateNgrokurlAction } from "../../../../Redux-actions/ngrokActions"
import AsyncStorage from '@react-native-async-storage/async-storage';




const NgrOkUrl = (props) => {

    // // ----------redux store useDispatch & useSelector --------------------
    const dispatch = useDispatch()
    // // 2nd way to get data ==> by using useSelector
    const reducerState = useSelector(
        (state) => (state)
    );



    const [state, setstate] = useState({
        ngrokUrl: ""
    })

    const handleNgrokurlChange = (val) => {
        setstate({ ngrokUrl: val })
    }

    const handleSubmitUrl = () => {
        dispatch(updateNgrokurlAction(state.ngrokUrl.trim()))
        props.navigation.popToTop()
    }

    const getNgrokUrlFromStorage = async () => {
        let ngrokUrl = await AsyncStorage.getItem('ngrokUrl');
        dispatch(updateNgrokurlAction(ngrokUrl))
    }


    return (
        <React.Fragment>
            <View>
                <Text>NgrOkUrl screen</Text>
            </View>
            <View>
                <Text>Enter NGROK URL</Text>
                <View style={styles.form__inputRow}>
                    {/* <Vicon iconSet="FontAwesome" name="user" size={20} color={"black"} /> */}
                    <TextInput
                        placeholder="enter NGROK url"
                        placeholderTextColor="#666666"
                        style={[styles.form__inputRow__text, { color: "black" }]}
                        autoCapitalize="none"
                        value={state.ngrokUrl}
                        onChangeText={(val) => handleNgrokurlChange(val)}
                    />
                </View>
                <Button
                    title="Change Url"
                    onPress={handleSubmitUrl}
                />
                <Button
                    title="get url from async storage"
                    onPress={getNgrokUrlFromStorage}
                />
            </View>
        </React.Fragment>
    )
}

export default NgrOkUrl

const styles = StyleSheet.create({
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
        borderColor: "red",
        borderRightWidth: 1
    },
})
