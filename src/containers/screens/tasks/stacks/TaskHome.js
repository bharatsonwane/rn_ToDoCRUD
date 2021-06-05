import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import CreateTask from './CreateTask'

const TaskHome = (props) => {
    return (
        <React.Fragment>
            <Button
                title="Create Task"
                onPress={() => props.navigation.navigate('CreateTask')}
            />
            <Button
                title="Retrieve Task"
                onPress={() => props.navigation.navigate('RetrieveTask')}
            />
        </React.Fragment>
    )
}

export default TaskHome

const styles = StyleSheet.create({})
