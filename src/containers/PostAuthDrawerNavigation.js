import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
// import SideBar from "./screens/drawer/SideBar"
import CustomDrawer from "./screens/drawer/CustomDrawer"
import PostAuthTabNavigation from './PostAuthTabNavigation';
import Profile from "./screens/profile/Profile"
import Support from "./screens/supports/Support"
import Setting from "./screens/settings/Setting"
import RateUs from './screens/rateUs/RateUs';
import MoreOnApp from './screens/moreOnApp/MoreOnApp';

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
