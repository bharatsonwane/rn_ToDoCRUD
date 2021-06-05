import React, { memo } from 'react';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconFoundation from 'react-native-vector-icons/Foundation';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconZocial from 'react-native-vector-icons/Zocial';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IconAntDesignIcons from 'react-native-vector-icons/AntDesign';


// const Props = {
//     iconSet: string,
//     name: string,
//     size: number,
//     color: string,
// };
const Vicon = (props) => {
    const { iconSet, ...otherProps } = props;
    switch (iconSet) {
        case "Entypo":
            return <IconEntypo {...otherProps} />;
        case "EvilIcons":
            return <IconEvilIcons {...otherProps} />;
        case "Feather":
            return <IconFeather {...otherProps} />;
        case "FontAwesome":
            return <IconFontAwesome {...otherProps} />;
        case "FontAwesome5":
            return <IconFontAwesome5 {...otherProps} />;
        case "Foundation":
            return <IconFoundation {...otherProps} />;
        case "Ionicons":
            return <IconIonicons {...otherProps} />;
        case "MaterialIcons":
            return <IconMaterialIcons {...otherProps} />;
        case "MaterialCommunityIcons":
            return <IconMaterialCommunityIcons {...otherProps} />;
        case "Octicons":
            return <IconOcticons {...otherProps} />;
        case "Zocial":
            return <IconZocial {...otherProps} />;
        case "SimpleLineIcons":
            return <IconSimpleLineIcons {...otherProps} />;
        case "AntDesign":
            return <IconAntDesignIcons {...otherProps} />;
        default:
            return <IconFontAwesome {...otherProps} />;
    }
};

export default memo(Vicon);