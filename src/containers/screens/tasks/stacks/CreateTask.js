import React from 'react'
import { Text, View } from 'react-native'
import TaskForm from './TaskForm'

const CreateTask = ({ navigation }) => {
    const taskField = {
        id: "",
        dateUTC: new Date(),
        title: "",
        description: "",
        technology: { uiTech: "", backEndTech: "" },
        library: { redux: false, saga: false, numpy: false, pandas: false }
    }
    const isTaskUpdate = false

    return (
        <React.Fragment>
            <TaskForm taskField={taskField} isTaskUpdate={isTaskUpdate} />
        </React.Fragment>
    )
}

export default CreateTask
