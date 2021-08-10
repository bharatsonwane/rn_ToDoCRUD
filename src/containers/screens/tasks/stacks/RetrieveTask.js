import React, { useState, useEffect } from 'react'
import * as _ from 'lodash';
import { useStateCallback, usePrevious } from "../../../../helper/customHooks/customHooks"
import { useSelector, useDispatch } from 'react-redux'
import { retrieveTaskActions, deleteTaskActions } from "../../../../Redux-actions/index"
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native'
import { DataTable } from 'react-native-paper';
import LoadingIndicator from 'src/components/loadingIndicator/LoadingIndicator';


const RetrieveTask = ({ navigation }) => {
    // // ----------Localization hooks & Router Hooks-------------
    // null


    // // ----------Props & context & ref ------------------------------



    // // ----------redux store useDispatch & useSelector --------------------
    const dispatch = useDispatch()
    // // 2nd way to get data ==> by using useSelector
    const reducerState = useSelector(
        (state) => (state)
    );
    let taskReducer = reducerState.TaskReducer


    // // ----------hooks useState--------------------------------------------------
    const [taskList, setTaskList] = useState({
        totalTaskListArray: [],
        taskListArray: [],
        filterText: ""
    })



    // // ----------hooks useEffect--------------------------------------------------
    // called only first time i.e. like componentDidMount()
    useEffect(() => {
        handleRetrieveTask()
    }, [])

    // let taskList = JSON.parse(taskReducer.retrieveResponce)
    // // ***To check responce/error after success/error action from reducer***
    const { isLoading, retrieveResponce, retrieveError, deleteDataFlag, deleteError } = taskReducer
    const prevPropsState = usePrevious({ retrieveResponce, retrieveError, deleteDataFlag, deleteError }) // custom hook to get previous props & state

    // called when its dependency changes i.e. like componentDidUpdate()
    useEffect(() => {
        if (prevPropsState) {
            if (prevPropsState.retrieveResponce !== retrieveResponce && retrieveResponce) {
                let parseTaskList = JSON.parse(retrieveResponce)
                setTaskList({
                    totalTaskListArray: parseTaskList,
                    taskListArray: parseTaskList,
                })
            }
            if (prevPropsState.retrieveError !== retrieveError && retrieveError) {
                // console.log(retrieveError);
                // setTimeout(() => {
                //     NotificationManager.error("Something went wrong.", "", 1000)
                // }, 500);
            }
            else if (prevPropsState.deleteDataFlag !== deleteDataFlag && deleteDataFlag) {
                // setTimeout(() => {
                //     NotificationManager.success("Task deleted successfully", "", 1000)
                // }, 500);
            }
            else if (prevPropsState.deleteError !== deleteError && deleteError) {
                // setTimeout(() => {
                //     NotificationManager.error("Something went wrong. can not be delete task", "", 1000)
                // }, 500);
            }
        }
    }, [taskReducer])


    // // ----------handler functions--------------------------------------------------
    const handleRetrieveTask = () => {
        dispatch(retrieveTaskActions.retrieve())
    }

    const handleTaskDelete = (id) => {
        dispatch(deleteTaskActions.delete(id))
    }

    const handleTaskUpdate = (task) => {
        navigation.navigate('UpdateTask', {
            task: task   // single task
        })
    }

    const handleTaskDetail = (task) => {
        navigation.navigate('RetrieveTaskDetail', {
            task: task   // single task
        })
    }

    const handleTaskFilter = (text) => {
        let totalTaskListArray = taskList.totalTaskListArray
        let filterText = text;
        let filteredTaskListArray = _.filter(totalTaskListArray, function (o) {
            if (o.id) {
                if (filterText != '' || filterText != null) {
                    if (_.includes((o.id).toLowerCase(), (filterText).toLowerCase()) || _.includes((o.title).toLowerCase(), (filterText).toLowerCase())) {
                        return o
                    }
                }
            }
        })
        setTaskList({ ...taskList, taskListArray: filteredTaskListArray, filterText: filterText })
    }



    return (
        <React.Fragment>
            <View style={styles.container}>
                <LoadingIndicator isLoading={isLoading} />
                <View>
                    <Text>Retrieve Task</Text>
                </View>
                <View>
                    <TextInput
                        placeholder="Enter text to filter"
                        placeholderTextColor="#666666"
                        style={styles.textInput, { color: "black" }}
                        autoCapitalize="none"
                        value={taskList.filterText}
                        onChangeText={(val) => handleTaskFilter(val)}
                    />
                </View>
                <View>
                    {taskList.taskListArray && taskList.taskListArray[0] &&
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Task Id.</DataTable.Title>
                                <DataTable.Title>Title</DataTable.Title>
                                <DataTable.Title>Detail</DataTable.Title>
                                <DataTable.Title>Update</DataTable.Title>
                                <DataTable.Title>Delate</DataTable.Title>
                            </DataTable.Header>

                            {taskList.taskListArray && taskList.taskListArray.map((task, index) => (
                                <DataTable.Row key={index} >
                                    <DataTable.Cell>{task.id}</DataTable.Cell>
                                    <DataTable.Cell>{task.title}</DataTable.Cell>
                                    <DataTable.Cell>
                                        <TouchableOpacity
                                            style={[{ borderColor: '#009387', backgroundColor: "green", borderWidth: 1 }]}
                                            onPress={() => { handleTaskDetail(task) }}
                                        >
                                            <Text style={[styles.textSign, { color: 'white' }]}>
                                                Detail
                                            </Text>
                                        </TouchableOpacity>
                                    </DataTable.Cell>
                                    <DataTable.Cell>
                                        <TouchableOpacity
                                            style={[{ borderColor: '#009387', backgroundColor: "yellow", borderWidth: 1 }]}
                                            onPress={() => { handleTaskUpdate(task) }}
                                        >
                                            <Text style={[styles.textSign, { color: 'orange' }]}>
                                                Update
                                            </Text>
                                        </TouchableOpacity>
                                    </DataTable.Cell>
                                    <DataTable.Cell>
                                        <TouchableOpacity
                                            style={[{ borderColor: '#009387', backgroundColor: "red", borderWidth: 1 }]}
                                            onPress={() => { handleTaskDelete(task.id) }}
                                        >
                                            <Text style={[styles.textSign, { color: 'white' }]}>
                                                Delete
                                            </Text>
                                        </TouchableOpacity>
                                    </DataTable.Cell>
                                </DataTable.Row>
                            ))}

                            {/* <DataTable.Pagination
                            page={1}
                            numberOfPages={3}
                            onPageChange={page => {
                                console.log(page);
                            }}
                            label="1-2 of 6"
                        /> */}
                        </DataTable>
                    }
                </View>
            </View>
        </React.Fragment>
    )
}

export default RetrieveTask

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
})
