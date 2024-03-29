import { StyleSheet, Platform, Dimensions } from 'react-native'
const deviceHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  imageContainer: {
    flex: 1,
    width: null,
    height: null
  },
  logoContainer: {
    flex: 1,
    marginTop: deviceHeight / 8,
    marginBottom: 30
  },
  logo: {
    position: "absolute",
    left: Platform.OS === "android" ? 40 : 50,
    top: Platform.OS === "android" ? 35 : 60,
    width: 250,
    height: 200
  },
  text: {
    color: "#D8D8D8",
    bottom: 6,
    marginTop: 5
  }
});
