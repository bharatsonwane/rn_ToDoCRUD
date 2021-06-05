import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native'
import TaskHome from './stacks/TaskHome';
import CreateTask from './stacks/CreateTask';
import RetrieveTask from './stacks/RetrieveTask'
import RetrieveTaskDetail from './stacks/RetrieveTaskDetail'
import UpdateTask from './stacks/UpdateTask';
import TasksHeader from './TasksHeader';


const StackTask = createStackNavigator();


export default function Tasks(props) {

    let taskStackNavData = [
        {
            name: 'TaskHome',
            component: TaskHome,
            options: {
                headerTitle: (props) => <TasksHeader {...props} />,
                headerStyle: { backgroundColor: 'rgba(241,80,36,1)' },
                headerTintColor: 'orange',
            },
        },
        {
            name: 'CreateTask',
            component: CreateTask,
            options: {
                headerTitle: (props) => <TasksHeader {...props} />,
                headerStyle: { backgroundColor: 'rgba(241,80,36,1)' },
                headerTintColor: 'white',
            },
        },
        {
            name: 'RetrieveTask',
            component: RetrieveTask,
            options: {
                headerTitle: (props) => <TasksHeader {...props} />,
                headerStyle: { backgroundColor: 'rgba(241,80,36,1)' },
                headerTintColor: 'white',
            },
        },
        {
            name: 'RetrieveTaskDetail',
            component: RetrieveTaskDetail,
            options: {
                headerTitle: (props) => <TasksHeader {...props} />,
                headerStyle: { backgroundColor: 'rgba(241,80,36,1)' },
                headerTintColor: 'white',
            },
        },
        {
            name: 'UpdateTask',
            component: UpdateTask,
            options: {
                headerTitle: (props) => <TasksHeader {...props} />,
                headerStyle: { backgroundColor: 'rgba(241,80,36,1)' },
                headerTintColor: 'white',
            },
        },
    ]

    return (
        <React.Fragment>
            <StackTask.Navigator initialRouteName="TaskHome">
                {taskStackNavData.map((item, idx) => (
                    <StackTask.Screen
                        key={`stack_item-${idx + 1}`}
                        name={item.name}
                        component={item.component}
                        options={
                            item.options ? item.options : { headerShown: false }
                        }
                    />
                ))}
            </StackTask.Navigator>
        </React.Fragment>
    )
}
