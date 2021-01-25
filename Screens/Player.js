import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native'
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function Player({route}) {
    const uri = route.params.uri
    useEffect(()=>{
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
    },[])
    var {width , height} = Dimensions.get('window')
    return (
        <View style={{flex : 1}}>
            <StatusBar hidden/>
            <Video
                source={{ uri }}
                rate={1}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay={true}
                isLooping
                useNativeControls
                style={{width : height, height : width}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    
})
