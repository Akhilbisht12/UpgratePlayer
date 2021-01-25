import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';

export default function Home({navigation}) {
  const [video, setVideo] = useState()
  const [loading, setLoading] = useState(true)
    useEffect(() => {
      Permissions.askAsync(Permissions.CAMERA_ROLL)
      MediaLibrary.getAssetsAsync({
        mediaType : ['video'],
      }).then((res)=>{
        console.log(res.assets)
        setVideo(res.assets)
        setLoading(false)
      })
      const unsubscribe = navigation.addListener('focus', () => {
        ScreenOrientation.unlockAsync()
        });
      return unsubscribe
    }, [navigation])

    if(loading) return <Text>loading</Text>

    else{
      return (
      <ScrollView style={styles.container}>
        <View style={styles.head}>
          <Text style={styles.logo}>Upgrate Player</Text>
        </View>
        <View>
          {video.map((item,i)=>{
            return(
              <TouchableOpacity key={i} onPress={()=>navigation.navigate('Player', {uri : item.uri})} style={styles.videoRow}>
                <Image style={styles.folder} source={{uri : 'https://img.icons8.com/cute-clipart/64/000000/folder-invoices.png'}}/>
                <Text>{item.filename}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </ScrollView>
      )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    head : {
      backgroundColor : 'blue',
      padding : 10
    },
    logo : {
      color : 'white',
      fontSize : 25
    },
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
  });
  