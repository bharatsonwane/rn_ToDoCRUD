import React from 'react'
import { useTranslation } from 'react-i18next';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native'
import Vicon from "../assets/icons/Vicon"
import Calendar from './screens/calendar/Calendar'
import Dashboard from './screens/dashboard/Dashboard'
import Notification from './screens/notification/Notification'
import Tasks from './screens/tasks/Tasks'


const TabPostAuth = createBottomTabNavigator()


const customTabBarOption = {
    keyboardHidesTabBar: true,
    style: {
        position: 'absolute',
    },
    activeTintColor: 'black',
    labelStyle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 12,
        letterSpacing: 0.09,
    },
    inactiveTintColor: 'black',
    style: {
        backgroundColor: 'white',
    },
};


export default function PostAuthTabNavigation({ navigation }) {
    const { t, i18n } = useTranslation('common');

    let postAuthTabNavData = [
        {
            name: 'Dashboard',
            component: Dashboard,
            options: {
                label: t('Dashboard'),
                tabColor: '#1f65ff',
                icon: {
                    iconSet: "Ionicons",
                    iconName: 'home',
                    iconColor: "black",
                }
            },
        },
        {
            name: 'Tasks',
            component: Tasks,
            options: {
                label: t('Tasks'),
                tabColor: '#1f65ff',
                icon: {
                    iconSet: "FontAwesome5",
                    iconName: "tasks",
                    iconColor: "black",
                }
            },
        },
        {
            name: 'Notification',
            component: Notification,
            options: {
                label: t('Notifications'),
                tabColor: '#1f65ff',
                icon: {
                    iconSet: "Ionicons",
                    iconName: "notifications-circle",
                    iconColor: "black",
                }
            },
        },
        {
            name: 'Calendar',
            component: Calendar,
            options: {
                label: t('Calendar'),
                tabColor: '#1f65ff',
                icon: {
                    iconSet: "Octicons",
                    iconName: 'calendar',
                    iconColor: "black",
                }
            },
        },
    ]



    return (
        <TabPostAuth.Navigator tabBarOptions={customTabBarOption} initialRouteName="dashboard">
            {postAuthTabNavData.map((tabItem) => (
                <TabPostAuth.Screen
                    key={`${'tab-screen-' + tabItem.name}`}
                    name={tabItem.name}
                    component={tabItem.component}
                    // listeners={{
                    //     tabPress: e => {
                    //         // Prevent default action
                    //         e.preventDefault();
                    //     },
                    // }}
                    options={{
                        tabBarLabel: tabItem.options.label,
                        tabBarColor: tabItem.options.tabColor,
                        tabBarIcon: ({ tintColor, focused }) => (
                            <Vicon
                                iconSet={tabItem.options.icon.iconSet}
                                name={tabItem.options.icon.iconName}
                                size={tabItem.options.icon.size ? tabItem.size : 25}
                                color={focused ? "#ffa500" : "black"}
                                solid={tabItem.options.icon.solid ? true : false}
                            />
                        ),
                    }}
                    otherW={true}
                />
            ))}
        </TabPostAuth.Navigator>
    )
}
