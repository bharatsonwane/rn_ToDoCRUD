import { StyleSheet } from 'react-native'

export default StyleSheet.create({
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
    text__header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    // form
    formView: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    form__label__text: {
        color: '#05375a',
        fontSize: 18
    },
    form__inputRow: {
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

    form__button__view: {
        alignItems: 'center',
        marginTop: 50
    },
    form__touchableOpacity__button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        margin: 10,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#0000b3",
        borderWidth: 1,
        borderColor: '#009387',
    },
    form__touchableOpacity__button__text: {
        color: '#009387',
        fontSize: 18,
        fontWeight: 'bold',
    }
});
