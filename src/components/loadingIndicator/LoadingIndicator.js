import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'

const LoadingIndicator = (props) => {
    return (
        <React.Fragment>
            {props.isLoading &&
                <View style={[styles.loadingIndicator]}>
                    <ActivityIndicator size="large" color="blue" />
                </View>
            }
        </React.Fragment>
    )
}

export default LoadingIndicator

const styles = StyleSheet.create({
    loadingIndicator: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        backgroundColor: 'black',
        zIndex: 9999,
        height: 12000
    },
})
