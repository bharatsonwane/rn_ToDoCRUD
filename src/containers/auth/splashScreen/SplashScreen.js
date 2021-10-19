import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { changi18nextLanguage } from "src/utils/locales/languageConstants"

import { ScrollView, ImageBackground, Image, View, StatusBar, TouchableOpacity, Button } from "react-native";
import { Text } from 'react-native-elements';
import styles from "./splashStyles"
import LanguageModal from 'src/components/languageModal/LanguageModal';

const launchScreenBg = require("src/assets/images/launchscreen-bg.png")
const launchscreenLogo = require("src/assets/logo/splashLogoCover.jpg")

export default function SplashScreen({ navigation }) {

    const { t, i18n } = useTranslation('common');

    const [languageModalShow, setLanguageModalShow] = useState(false)

    const handleShowLanguageModal = () => {
        setLanguageModalShow(!languageModalShow)
    }

    const handleRecivedPropsFromLanguageChild = (valFromChild) => {
        setLanguageModalShow(valFromChild) // here valFromChild == false
    }


    return (
        <React.Fragment>
            {/* <StatusBar barStyle="light-content" /> */}
            <ImageBackground source={launchScreenBg} style={styles.imageContainer}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <TouchableOpacity transparent onPress={() => handleShowLanguageModal()} style={{ alignSelf: "center", backgroundColor: "green", }} >
                        {/* selected language name and its flag will shown from LanguageModal.js */}
                        <LanguageModal showModal={languageModalShow} provideProps={(valFromChild) => handleRecivedPropsFromLanguageChild(valFromChild)} parentName="splashScreen" />
                    </TouchableOpacity>
                    <View style={styles.logoContainer}>
                        <Image source={launchscreenLogo} style={styles.logo} />
                    </View>
                    <View
                        style={{
                            alignItems: "center",
                            marginBottom: 50,
                            backgroundColor: "transparent"
                        }}
                    >
                        <Text h4 style={styles.text}>{t("areYouFindDifficultyInDoingSomething")}</Text>
                        <View style={{ marginTop: 8 }} />
                        <Text h4 style={styles.text}>{t("manageYourTaskByYourOwn")}</Text>
                        <View style={{ marginTop: 8 }} />
                    </View>
                    <Text h4 style={styles.text}>{t("sign in to continue access")}</Text>
                    <View style={{ marginBottom: 80 }}>
                        <TouchableOpacity
                            style={[{ backgroundColor: "#6FAF98", alignSelf: "center", padding: 15 }]}
                            onPress={() => navigation.navigate('SignIn')} >
                            <Text style={{ color: "#D8D8D8" }}>{t("letsGo")}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        </React.Fragment>
    )
}

