import React from 'react'
import TaskForm from './TaskForm'
import { StyleSheet, Text, View } from 'react-native'

const UpdateTask = ({route, navigation }) => {

    const { task } = route.params;
    const isTaskUpdate = true

    return (
        <React.Fragment>
            <TaskForm taskField={task} isTaskUpdate={isTaskUpdate} />
        </React.Fragment>
    )
}

export default UpdateTask

const styles = StyleSheet.create({})
