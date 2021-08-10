import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, StatusBar, Button, ScrollView, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useStateCallback, usePrevious } from "../../../../helper/customHooks/customHooks"
import { useNavigation } from '@react-navigation/native';
import { createTaskActions, updateTaskActions } from "../../../../Redux-actions/taskActions"
import * as Animatable from 'react-native-animatable';
// import Vicon from "../../../../assets/icons/Vicon"
import Vicon from "src/assets/icons/Vicon"
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import { CheckBox } from 'react-native-elements'
import LoadingIndicator from 'src/components/loadingIndicator/LoadingIndicator';

const TaskForm = (props) => {
    // // ----------Localization hooks & Router Hooks-------------
    const navigation = useNavigation();

    // // ----------Props & context & ref ------------------------------
    // 1st way ==> get data from another component ==> by using props 
    const taskField = props.taskField
    const isTaskUpdate = props.isTaskUpdate



    // // ----------redux store useDispatch & useSelector --------------------
    const dispatch = useDispatch()
    // // 2nd way to get data ==> by using useSelector
    const reducerState = useSelector(
        (state) => (state)
    );
    let taskReducer = reducerState.TaskReducer


    // // ----------hooks useState--------------------------------------------------
    const [task, setTask] = useStateCallback({ ...taskField, dateLocal: new Date() }); // same API as useState + setState with class base
    const [dateTimePick, setDateTimePick] = useState({ isDatePickerShow: false, showMode: "date" })
    const [err, setErr] = useState({
        idErr: "",
        titleErr: "",
        uiTechErr: "",
        backEndTechErr: "",
    })
    const [formEdit, setFormEdit] = useState(isTaskUpdate === true ? true : false)


    // // ----------hooks useEffect--------------------------------------------------
    const { id, title, dateUTC, description, technology, library } = task;
    const { idErr, titleErr, uiTechErr, backEndTechErr, } = err


    // // ***To check responce/error after success/error action from reducer***
    const { createResponce, createError, updateResponce, updateError, isLoading } = taskReducer
    const prevPropsState = usePrevious({ createResponce, createError, updateResponce, updateError }) // custom hook to get previous props & state
    useEffect(() => {
        if (prevPropsState) {
            if (prevPropsState.createResponce !== createResponce && createResponce) { // // createResponce !== null && createResponce !== undefined
                navigation.replace(`RetrieveTask`)
                // setTimeout(() => {
                //     NotificationManager.success("Task Added successfully", "", 1000)
                // }, 500);
            }
            else if (prevPropsState.createError !== createError && createError) {
                // setTimeout(() => {
                //     NotificationManager.error("Something wrong happened..", "Not able to create task.", 1000)
                // }, 500);
            }
            if (prevPropsState.updateResponce !== updateResponce && updateResponce) {
                navigation.replace(`RetrieveTask`)
                // history.push('/task/retrieve')
                // handleResetTask()
                // setTimeout(() => {
                //     NotificationManager.success("Task Updated successfully", "", 1000)
                // }, 500);
            }
            else if (prevPropsState.updateError !== updateError && updateError) {
                // setTimeout(() => {
                //     NotificationManager.error("Something wrong happened..", "Not able to edit task.", 1000)
                // }, 500);
            }
        }
    }, [taskReducer])



    // // ----------handler functions--------------------------------------------------
    const handleTaskIdInputChange = (val) => {
        setTask({ ...task, id: val })
        handleValidateTaskId(val)
    }

    // ----------handle date & time----------
    const showDateTimePicker = (mode) => {
        let updatedDateTimePick = { ...dateTimePick }
        updatedDateTimePick.isDatePickerShow = true
        updatedDateTimePick.showMode = mode
        setDateTimePick(updatedDateTimePick)
    }

    const handleDateInputChange = (e, selectedDate) => {
        const currentDate = selectedDate || date;
        setDateTimePick({ ...dateTimePick, isDatePickerShow: false })
        setTask({ ...task, dateUTC: currentDate })

        // // for information----------------------------------------------------------------------------------
        let isoDate = currentDate.toISOString()    // "2021-05-27T18:47:07.269Z"       // based on GMT line
        let utcDate = currentDate.toUTCString()    // "Thu, 27 May 2021 18:47:07 GMT"  // based on GMT line
        let gmtDate = currentDate.toGMTString()    // "Thu, 27 May 2021 18:47:07 GMT"  // based on GMT line
        let localDate = currentDate.toDateString() // "Thu May 27 2021"
        // // // currentDate                       // "Thu May 27 2021 18:47:07 GMT+0530 (India Standard Time)"


        // // customize date------------------------------------------------------------------------
        // only date object is allowed
        let options = {
            // weekday: "short",
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        };
        let customDateForUI = currentDate.toLocaleString('en-CA', options)
        console.log(customDateForUI);
    }

    const handleFormatDate = (date) => {
        // to use toLocaleString javascript method change in androied ==> app/build.gradle folder as below
        // def jscFlavor = 'org.webkit:android-jsc-intl:+'
        let d = new Date(date)
        let options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        };
        let formatedDate = d.toLocaleString('en-CA', options)  // dd/mm/yyyy
        return formatedDate
    }

    const handleFormatTime = (date) => {
        let d = new Date(date)
        let options = {
            hour12: "true",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        }
        let formatedTime = d.toLocaleTimeString('en-CA', options)
        return formatedTime
    }
    // // --------------------------------------------------


    const handleTaskTitleInputChange = (val) => {
        setTask({ ...task, title: val })
        handleValidateTitle(val)
    }

    const handleTaskDescriptionInputChange = (val) => {
        setTask({ ...task, description: val })
    }


    const handlePickerUiTechnology = (itemValue) => {
        let updatedTask = { ...task }
        updatedTask.technology.uiTech = itemValue
        setTask({ ...updatedTask })
        handleValidateUiTech(itemValue)
    }

    const handleRadioBackEndTech = (itemValue) => {
        let updatedTask = { ...task }
        updatedTask.technology.backEndTech = itemValue
        setTask({ ...updatedTask })
        handleValidateBackEndTech(itemValue)
    }

    const handleCheckboxLibrary = (lib) => {
        let updatedTask = { ...task }
        updatedTask.library[lib] = !updatedTask.library[lib]
        setTask({ ...updatedTask })
    }

    const handleCreateTask = () => {
        if (handleValidateAll()) {
            dispatch(createTaskActions.create(task))
        }
    }

    const handleUpdateTask = () => {
        dispatch(updateTaskActions.update(task))
    }


    // // ----------validation--------------------------------------------------
    const handleValidateAll = () => {
        let isValidTaskId = handleValidateTaskId(task.id)
        let isValidTitle = handleValidateTitle(task.title)
        let isValidUiTech = handleValidateUiTech(task.technology.uiTech)
        let isValidBackEndTech = handleValidateBackEndTech(task.technology.backEndTech)
        return isValidTaskId && isValidTitle && isValidUiTech && isValidBackEndTech
    }

    const handleValidateTaskId = (id) => {
        let idValue = id.trim()
        let idErr = ""
        let returnVal = false
        if (idValue === "" || null) {
            idErr = "ID must not be empty"
        }
        else if (idValue.length < 3) {
            idErr = 'Id must be at least 3 characters!'
        }
        else {
            idErr = ""
            returnVal = true  // change if there is no error
        }
        // // ###2nd way to update state in loop (here mulitple time in function)###
        setErr((err) => ({ ...err, idErr: idErr }))
        return returnVal      // true or false
    }

    const handleValidateTitle = (title) => {
        let titleValue = title.trim()
        let titleErr = ""
        let returnVal = false
        const regExp = /^[0-9a-zA-Z ]+$/
        if (titleValue === "") {
            titleErr = "Title must not be empty"
        }
        else {
            if (titleValue.match(regExp)) {
                if (titleValue.trim().length < 5) {
                    titleErr = "Title must contain at least 5 characters"
                }
                else if (titleValue.trim().length > 15) {
                    titleErr = "Title must not exceed 15 characters"
                }
                else {
                    titleErr = ""
                    returnVal = true
                }
            }
            else {
                titleErr = 'Title must not contain any symbols'
            }
        }
        // // ###2nd way to update state in loop (here mulitple time in function)###
        setErr((err) => ({ ...err, titleErr: titleErr }))
        return returnVal
    }

    const handleValidateUiTech = (uiTechValue) => {
        let uiTechErr = ""
        let returnVal = false
        if (uiTechValue === "") {
            uiTechErr = "Select UI Technology."
        }
        else {
            uiTechErr = ""
            returnVal = true
        }
        setErr((err) => ({ ...err, uiTechErr: uiTechErr }))
        return returnVal
    }

    const handleValidateBackEndTech = (backEndTechValue) => {
        let backEndTechErr = ""
        let returnVal = false
        if (backEndTechValue === "") {
            backEndTechErr = "Select Back End Technology."
        }
        else {
            backEndTechErr = ""
            returnVal = true
        }
        setErr((err) => ({ ...err, backEndTechErr: backEndTechErr }))
        return returnVal
    }


    return (
        <React.Fragment>
            <LoadingIndicator isLoading={false} />
            <View style={styles.container}>
                <StatusBar backgroundColor='#009387' barStyle="light-content" />
                <View style={styles.header}>
                    <Text style={styles.text_header}>Creat a new task!</Text>
                </View>
                <Animatable.View animation="fadeInUpBig" style={[styles.formViewContainer, { backgroundColor: "white" }]}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                        <View style={styles.form__view}>
                            <Text style={[styles.form__label__text]}>
                                Task Id.:
                            </Text>
                            <View style={styles.form__inputRow}>
                                <TextInput
                                    placeholder="Enter task ID"
                                    placeholderTextColor="#666666"
                                    style={[styles.form__inputRow__text, { color: "black" }]}
                                    autoCapitalize="none"
                                    value={id}
                                    onChangeText={(val) => handleTaskIdInputChange(val)}
                                />
                                {task.id !== "" && err.idErr == "" ?
                                    <Animatable.View animation="bounceIn" >
                                        <Vicon iconSet="Feather" name="check-circle" size={20} color={"green"} />
                                    </Animatable.View>
                                    : null
                                }
                            </View>
                            {err.idErr ?
                                <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.form__errorMsg}>{err.idErr}</Text>
                                </Animatable.View>
                                : null
                            }
                        </View>
                        <View style={styles.form__view}>
                            <Text style={[styles.form__label__text, { color: "black" }]}>
                                Task Title:
                            </Text>
                            <View style={styles.form__inputRow}>
                                <TextInput
                                    placeholder="Enter task Title"
                                    placeholderTextColor="#666666"
                                    style={[styles.form__inputRow__text, { color: "black" }]}
                                    autoCapitalize="none"
                                    value={title}
                                    onChangeText={(val) => handleTaskTitleInputChange(val)}
                                />
                                {task.title !== "" && err.titleErr == "" ?
                                    <Animatable.View animation="bounceIn" >
                                        <Vicon iconSet="Feather" name="check-circle" size={20} color={"green"} />
                                    </Animatable.View>
                                    : null}
                            </View>
                            {err.titleErr ?
                                <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.form__errorMsg}>{err.titleErr}</Text>
                                </Animatable.View>
                                : null}
                        </View>
                        <View style={styles.form__view}>
                            <View >
                                <Text style={styles.form__label__text}>Selct Date and Time:</Text>
                            </View>
                            <View style={styles.form__dateTimeRow}>
                                <View >
                                    <TouchableOpacity
                                        style={[styles.form__dateTimeRow__button]}
                                        onPress={() => { showDateTimePicker("date") }} >
                                        <Text style={[{ color: 'black', fontSize: 18, fontWeight: 'bold', marginRight: 5 }]}>
                                            {handleFormatDate(dateUTC)}
                                        </Text>
                                        <Vicon iconSet="SimpleLineIcons" name="calendar" size={20} color={"black"} />
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity
                                        style={[styles.form__dateTimeRow__button]}
                                        onPress={() => { showDateTimePicker("time") }} >
                                        <Text style={[{ color: 'black', fontSize: 18, fontWeight: 'bold', marginRight: 5 }]}>
                                            {handleFormatTime(dateUTC)}
                                        </Text>
                                        <Vicon iconSet="SimpleLineIcons" name="clock" size={20} color={"black"} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {dateTimePick.isDatePickerShow && (
                                <DateTimePicker
                                    // testID="dateTimePicker"
                                    value={dateUTC}
                                    mode={dateTimePick.showMode}
                                    is24Hour={false}
                                    display="default"
                                    onChange={handleDateInputChange}
                                />
                            )}
                        </View>
                        <View style={styles.form__view}>
                            <Text style={[styles.form__label__text, { color: "black" }]}>
                                Task Description:
                            </Text>
                            <View style={styles.form__inputRow}>
                                <TextInput
                                    multiline
                                    numberOfLines={4}
                                    placeholder="Enter task Desciption.."
                                    placeholderTextColor="#666666"
                                    style={styles.form__inputRow__text, { color: "black" }}
                                    autoCapitalize="none"
                                    value={description}
                                    onChangeText={(val) => handleTaskDescriptionInputChange(val)}
                                />
                            </View>
                        </View>
                        <View style={styles.form__view}>
                            <Text style={[styles.form__label__text, { color: "black" }]}>
                                UI Technology:
                            </Text>
                            <Picker
                                selectedValue={task.technology.uiTech}
                                onValueChange={(itemValue, itemIndex) => handlePickerUiTechnology(itemValue)}>
                                <Picker.Item label="Select" value="" />
                                <Picker.Item label="React" value="react" />
                                <Picker.Item label="Angular" value="angular" />
                                <Picker.Item label="Flutter" value="flutter" />
                                <Picker.Item label="Vue.js" value="vue.js" />
                            </Picker>
                            {err.uiTechErr ?
                                <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.form__errorMsg}>{err.uiTechErr}</Text>
                                </Animatable.View>
                                : null
                            }
                        </View>
                        <View style={styles.form__view}>
                            <Text style={[styles.form__label__text, { color: "black" }]}>
                                Back-End Technology :
                            </Text>
                            <RadioButton.Group onValueChange={newValue => handleRadioBackEndTech(newValue)} value={task.technology.backEndTech} >
                                <View style={styles.form__radioButtonView}>
                                    <View style={{ display: "flex", flexDirection: "row", flex: 1, margin: 10 }}>
                                        <Text>Python</Text>
                                        <RadioButton value="python" />
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", flex: 1, margin: 10 }}>
                                        <Text>.Net</Text>
                                        <RadioButton value=".net" />
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", flex: 1, margin: 10 }}>
                                        <Text>PHP</Text>
                                        <RadioButton value="php" />
                                    </View>
                                </View>
                            </RadioButton.Group>
                            {err.backEndTechErr ?
                                <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.form__errorMsg}>{err.backEndTechErr}</Text>
                                </Animatable.View>
                                : null
                            }
                        </View>
                        <View style={styles.form__view}>
                            <Text style={[styles.form__label__text, { color: "black" }]}>
                                Library Used:
                            </Text>
                            <View>
                                <View style={styles.form__checkBoxView}>
                                    <CheckBox
                                        center
                                        title='Redux'
                                        checked={task.library.redux}
                                        onPress={() => handleCheckboxLibrary("redux")}
                                        style={styles.checkBox}
                                        containerStyle={{ backgroundColor: null, borderWidth: 0 }}
                                    />
                                    <CheckBox
                                        center
                                        title='Saga'
                                        checked={task.library.saga}
                                        onPress={() => handleCheckboxLibrary("saga")}
                                        containerStyle={{ backgroundColor: null, borderWidth: 0 }}
                                    />
                                </View>
                                <View style={styles.form__checkBoxView}>
                                    <CheckBox
                                        center
                                        title='Numpy'
                                        checked={task.library.numpy}
                                        onPress={() => handleCheckboxLibrary("numpy")}
                                        containerStyle={{ backgroundColor: null, borderWidth: 0 }}
                                    />
                                    <CheckBox
                                        center
                                        title='Pandas'
                                        checked={task.library.pandas}
                                        onPress={() => handleCheckboxLibrary("pandas")}
                                        containerStyle={{ backgroundColor: null, borderWidth: 0 }}
                                    />
                                </View>
                            </View>
                        </View>
                        {!formEdit ?
                            <View >
                                <TouchableOpacity
                                    style={styles.form__touchableOpacity__button}
                                    onPress={() => { handleCreateTask() }} >
                                    <Text style={styles.form__touchableOpacity__button__text}>
                                        Create Task
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View >
                                <TouchableOpacity
                                    style={styles.form__touchableOpacity__button}
                                    onPress={() => { handleUpdateTask() }} >
                                    <Text style={styles.form__touchableOpacity__button__text}>
                                        Update Task
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </ScrollView>
                </Animatable.View>
            </View>
        </React.Fragment>
    )
}

export default TaskForm

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },

    // form
    formViewContainer: {
        flex: 6,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    form__view: {
        marginVertical: 10
    },
    form__label__text: {
        color: '#05375a',
        fontSize: 20
    },
    form__inputRow: {
        display: "flex",
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
    },
    form__errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },

    form__dateTimeRow: {
        flexDirection: "row",
        flex: 1,
    },
    form__dateTimeRow__button: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        width: "auto",
        margin: 15,
    },
    form__radioButtonView: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
    },
    form__checkBoxView: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        marginHorizontal: 25
    },
    form__touchableOpacity__button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        margin: 10,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#0000b3",
        borderWidth: 1,
        borderColor: '#009387',
    },
    form__touchableOpacity__button__text: {
        color: "white",
        fontSize: 18,
        fontWeight: 'bold'
    }
})
