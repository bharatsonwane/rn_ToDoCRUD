import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { changi18nextLanguage } from "src/utils/locales/languageConstants"
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, Image } from "react-native";
import Vicon from 'src/assets/icons/Vicon';




const LanguageModal = (props) => {
    const languageList = [
        {
            name: 'English',
            code: "en",
            flagSrc: require("src/assets/flag/united_states.png"),


        },
        {
            name: 'Hindi',
            code: "hi",
            flagSrc: require("src/assets/flag/india.png"),

        },
        {
            name: 'Chinese',
            code: "chi",
            flagSrc: require("src/assets/flag/china.png"),

        },
    ]


    // // ----------Localization hooks & Router Hooks-------------
    const { t, i18n } = useTranslation('common');

    // // ----------Props -------------------------------------------------
    // null


    // ----------redux store useDispatch & useSelector --------------------


    // // ----------hooks useState--------------------------------------------------
    const [selectedLanguage, setSelectedLanguage] = useState(null)


    // // ----------hooks useEffect--------------------------------------------------
    // // ***To check responce/error after success/error action from reducer***
    useEffect(() => {
        if (i18n && i18n.language) {
            setSelectedLanguage(i18n.language)  
        }
    }, [i18n.language])



    // // ----------handler functions--------------------------------------------------
    const sendPropsToParent = (isShowModal) => {
        let show = isShowModal
        props.provideProps(show)
    }

    const handleChangeLanguage = (langCode) => {
        changi18nextLanguage(langCode)
        sendPropsToParent(false)
    }

    const showModelClickContentInParent = (parentName) => {
        switch (parentName) {
            case "customDrawer":
                return (
                    <View style={styles.modal__selectedLanguage}>
                        <Text>Change Language</Text>
                    </View>
                )

            case "splashScreen":
                return (
                    <View style={styles.modal__selectedLanguage}>
                        <Text>Change Language</Text>
                    </View>
                )

            default: return null
        }

    }


    return (
        <React.Fragment>

            {showModelClickContentInParent(props.parentName)}
            {props.showModal &&
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={props.showModal}
                    onRequestClose={() => {
                        // Alert.alert("Sign Out Modal has been closed.");
                        sendPropsToParent(false);
                    }}
                >
                    <View style={styles.modal__screen}>
                        <TouchableOpacity onPress={() => { sendPropsToParent(false) }}>
                            <View style={styles.modal__container}>
                                <View style={styles.modal__container__header}>
                                    <Text style={{ fontSize: 20, marginRight: 15 }}>Select Language</Text>
                                    <Vicon iconSet="AntDesign" name="closecircleo" size={25} color="#900" />
                                </View>
                                {
                                    languageList.map((item) => {
                                        return (
                                            <TouchableOpacity key={item.name} onPress={() => { handleChangeLanguage(item.code) }}>
                                                <View style={styles.modal__languageSelect}>
                                                    <Image source={item.flagSrc} style={styles.modal__languageSelect__flag} />
                                                    <Text style={styles.modal__languageSelect__text}>{item.name}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>
            }
        </React.Fragment>
    )
}

export default LanguageModal


const styles = StyleSheet.create({
    modal__selectedLanguage: {
        // selectedLanguage will shown in parent UI component
        margin: 5
    },
    modal__screen: {
        // using complete screen as popup modal
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modal__container: {
        alignItems: "center",
        backgroundColor: "white",
        shadowColor: "#000",
        // width: 300,
        // height: 300,
        margin: 5,
        padding: 25,
        borderRadius: 20,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 5 // important property => add border if container match with background
    },
    modal__container__header: {
        display: "flex",
        flexDirection: "row",
    },
    modal__languageSelect: {
        display: "flex",
        flexDirection: "row",
        margin: 10,
    },
    modal__languageSelect__flag: {
        width: 30,
        height: 20,
    },
    modal__languageSelect__text: {
        marginHorizontal: 20
    },
});