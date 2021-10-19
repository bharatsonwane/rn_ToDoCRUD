import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
// import SideBar from "src/containers/screens/drawer/SideBar"
import CustomDrawer from "src/containers/screens/drawer/CustomDrawer"
import PostAuthTabNavigation from 'src/containers/PostAuthTabNavigation';
import Profile from "src/containers/screens/profile/Profile"
import Support from "src/containers/screens/supports/Support"
import Setting from "src/containers/screens/settings/Setting"
import RateUs from 'src/containers/screens/rateUs/RateUs';
import MoreOnApp from 'src/containers/screens/moreOnApp/MoreOnApp';

const DrawerPostAuth = createDrawerNavigator();


export default function PostAuthDrawerNavigation({ navigation }) {

    let postAuthDrawerNavData = [
        {
            name: "PostAuthTabNavigation",
            component: PostAuthTabNavigation,
        },
        {
            name: "Profile",
            component: Profile,
        },
        {
            name: "Support",
            component: Support,
        },
        {
            name: "Setting",
            component: Setting,
        },
        {
            name: "RateUs",
            component: RateUs,
        },
        {
            name: "MoreOnApp",
            component: MoreOnApp,
        },
    ]


    return (
        <DrawerPostAuth.Navigator drawerContent={props => <CustomDrawer {...props} />}>
            {postAuthDrawerNavData.map((item, idx) => (
                <DrawerPostAuth.Screen
                    key={`stack_item-${idx + 1}`}
                    name={item.name}
                    component={item.component}
                />
            ))}
        </DrawerPostAuth.Navigator>
    )
}
