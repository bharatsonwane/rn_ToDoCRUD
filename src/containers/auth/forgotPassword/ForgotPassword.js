import React from 'react'
import { View, Text, Button } from 'react-native'

export default function ForgotPassword({navigation}) {
    return (
        <React.Fragment>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Forgot password Screen</Text>
                <Button
                    title="Go to the ForgotPassword Screen... again"
                    onPress={() => navigation.push("ForgotPassword")}
                />
                <Button
                    title="Go to the SignUp screen"
                    onPress={() => navigation.navigate("SignUp")}
                />
                <Button
                    title="Go Back"
                    onPress={() => navigation.goBack()}
                />
                <Button
                    title="Go to the first screen"
                    onPress={() => navigation.popToTop()}
                />

            </View>
        </React.Fragment>
    )
}
