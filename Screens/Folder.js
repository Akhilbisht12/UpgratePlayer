import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Image } from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import * as VideoThumbnails from 'expo-video-thumbnails';

export default function Folder({route}) {
    const navigation = useNavigation();
    const id = route.params.id;
    const [ video, setVideo] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        console.log(id)
        MediaLibrary.getAssetsAsync({
            mediaType : 'video',
            album : id
        })
        .then((res)=>{
            console.log(res.assets[0])
            setVideo(res.assets)
            setLoading(false)
        })
        const unsubscribe = navigation.addListener('focus', () => {
            ScreenOrientation.unlockAsync()
            });
          return unsubscribe
    },[navigation])
    if(loading) return <ActivityIndicator/>
    else{
        return (
            <ScrollView style={{flex : 1}}>
                {video.map((item,i)=>{
                    return(
                    <TouchableOpacity key={i} onPress={()=>navigation.navigate('Player', {uri : item.uri})} style={styles.videoRow}>
                        <Image style={styles.folder} source={{uri : `${VideoThumbnails.getThumbnailAsync(item.uri,{
                            quality : 0.5,
                            time : 1500
                        }).uri}`}}/>
                        <Text>{item.filename}</Text>
                    </TouchableOpacity>
                    )
          })}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    videoRow : {
        flexDirection : 'row',
        alignItems : 'center',
        padding : 10
      },
      folder : {
      height : 50,
      width : 50,
      marginRight : 10
      }
})
