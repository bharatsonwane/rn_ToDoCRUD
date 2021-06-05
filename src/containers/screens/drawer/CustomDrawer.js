import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Switch, TouchableOpacity, Image } from 'react-native'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { Text } from 'react-native-elements';
import { DrawerActions } from '@react-navigation/native'
import Vicon from "../../../assets/icons/Vicon"
const customDrawerLogo = require("../../../assets/logo/splashLogoCircular.png")
const usFlag = require("src/assets/flag/united_states.svg")
const indiaFlag = require("src/assets/flag/india.svg")
const chinaFlag = require("src/assets/flag/china.svg")
import { changi18nextLanguage } from "src/utils/locales/languageConstants"
import SignOutModal from "./content/signOutModal/SignOutModal"
import LanguageModal from "src/components/languageModal/LanguageModal"


export default function CustomDrawer(props) {
    const { t, i18n } = useTranslation('common');

    let customDrawerData = [
        {
            name: "Dashboard",         // 
            label: t("Dashboard"),
            icon: {
                iconSet: "Ionicons",
                iconName: 'home',
                iconColor: "black",
            }
        },
        {
            name: "Profile",
            label: t("Profile"),
            icon: {
                iconSet: "FontAwesome",
                iconName: 'user',
                iconColor: "black",
            }
        },
        {
            name: "Support",
            label: t("Support"),
            icon: {
                iconSet: "MaterialIcons",
                iconName: 'contact-support',
                iconColor: "black",
            }
        },
        {
            name: "Setting",
            label: t("Setting"),
            icon: {
                iconSet: "AntDesign",
                iconName: 'setting',
                iconColor: "black",
            }
        },
        {
            name: "RateUs",
            label: t("Rate Us"),
            icon: {
                iconSet: "Octicons",
                iconName: 'star',
                iconColor: "black",
            }
        },
        {
            name: "MoreOnApp",
            label: t("More on App"),
            icon: {
                iconSet: "Foundation",
                iconName: 'indent-more',
                iconColor: "black",
            }
        },

    ]


    const [signOutModalShow, setSignOutModalShow] = useState(false)
    const [languageModalShow, setLanguageModalShow] = useState(false)

    const handleShowSignOutModal = () => {
        setSignOutModalShow(!signOutModalShow)
    }

    const handleShowLanguageModal = () => {
        setLanguageModalShow(!languageModalShow)
    }

    const handleRecivedPropsFromSignOutChild = (valFromChild) => {
        setSignOutModalShow(valFromChild) // here valFromChild == false
    }

    const handleRecivedPropsFromLanguageChild = (valFromChild) => {
        setLanguageModalShow(valFromChild) // here valFromChild == false
    }


    return (
        <React.Fragment>
            <View style={styles.drawer__container}>
                <View style={styles.drawer__header}>
                    <View style={{ backgroundColor: "green" }}>
                        <TouchableOpacity
                            style={{ alignSelf: "flex-end", width: 25, margin: 10 }}
                            onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())} >
                            <Vicon iconSet="Feather" name="menu" color="#900" size={25} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.drawer__header__imgTxt}>
                        <Image source={require("../../../assets/logo/splashLogoCircular.png")} style={styles.drawer__header__imgTxt__img} />
                        <View style={styles.drawer__header__imgTxt__txt}>
                            <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 10 }}>{t("Advanced")}</Text>
                            <Text style={{ color: "gray", marginBottom: 10 }}>{t("Task Manager")}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.drawer__sidebarDivider}></View>
                <View style={styles.drawer__body}>
                    <DrawerContentScrollView {...props}>
                        {customDrawerData.map((drawerItem) => (
                            <DrawerItem
                                key={`${'drawerScreen-' + drawerItem.name}`}
                                label={drawerItem.label}
                                icon={() => {
                                    if (drawerItem.icon) {
                                        const { iconSet, iconName, iconColor } = drawerItem.icon
                                        return (<Vicon iconSet={iconSet} name={iconName} style={{ fontSize: 25, color: iconColor }} />)
                                    } else { return null }
                                }}
                                onPress={() => props.navigation.navigate(drawerItem.name)}
                            />
                        ))}

                        {/* <DrawerItem
                            label="Rate Us"
                            icon={() => (<Vicon iconSet="" name="star" style={{ fontSize: 25, color: "red" }} />)}
                            onPress={() => props.navigation.navigate("Support")}
                        /> */}
                    </DrawerContentScrollView>
                </View>
                <View style={styles.drawer__sidebarDivider}></View>
                <View style={styles.drawer__footer}>
                    <View style={styles.drawer__footer__language}>
                        <TouchableOpacity transparent onPress={() => handleShowLanguageModal()} style={styles.drawer__footer__language} >
                            {/* selected language name and its flag will shown from LanguageModal.js */}
                            <LanguageModal showModal={languageModalShow} provideProps={(valFromChild) => handleRecivedPropsFromLanguageChild(valFromChild)} parentName="customDrawer" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.drawer__footer__darkMode}>
                        <Text style={styles.drawer__footer__darkMode__text}> {t("Dark Mode")} </Text>
                        <Switch value={false} />
                    </View>
                    <TouchableOpacity transparent onPress={() => handleShowSignOutModal()} style={styles.drawer__footer__signOut} >
                        <Vicon iconSet="AntDesign" name="logout" />
                        <Text style={styles.drawer__footer__signOut__text}>{t("SignOut")}</Text>
                        <SignOutModal showModal={signOutModalShow} provideProps={(valFromChild) => handleRecivedPropsFromSignOutChild(valFromChild)} />
                    </TouchableOpacity>
                    <View>

                    </View>
                </View>
            </View>
        </React.Fragment>
    )
}


const styles = StyleSheet.create({
    drawer__container: {
        flex: 1
    },
    drawer__header: {

    },
    drawer__header__imgTxt: {
        display: "flex",
        flexDirection: "row"
    },
    drawer__header__imgTxt__img: {
        flex: 1,
        width: 80,
        height: 150,
        borderRadius: 40,
        marginTop: 20
    },
    drawer__header__imgTxt__txt: {
        flex: 1,
        justifyContent: "center",  // vertically center
        alignItems: "center",   // horizentally center
    },

    drawer__sidebarDivider: {
        height: 1,
        width: "100%",
        backgroundColor: "lightgray",
        marginVertical: 10
    },
    drawer__body: {
        display: "flex",
        flexDirection: "column",  // by default is column // no need
        flex: 1,
    },
    drawer__footer: {

    },
    drawer__footer__language: {

    },
    drawer__footer__darkMode: {
        display: "flex",
        flexDirection: "row"
    },
    drawer__footer__darkMode__text: {
        flex: 1
    },
    drawer__footer__signOut: {
        display: "flex",
        flexDirection: "row",
        margin: 10
    },
    drawer__footer__signOut__text: {
        marginHorizontal: 10
    }
})