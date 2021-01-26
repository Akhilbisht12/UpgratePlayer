import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, StatusBar, ActivityIndicator } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';

export default function Home({navigation}) {
  const [video, setVideo] = useState([])
  const [loading, setLoading] = useState(true)
    useEffect(() => {
      Permissions.askAsync(Permissions.CAMERA_ROLL)
      MediaLibrary.getAlbumsAsync()
      .then((res)=>{
        console.log(res[0])
        res.map((item,i)=>{
          MediaLibrary.getAssetsAsync({
            mediaType : ['video'],
            album : item.id
          })
          .then((res2)=>{
            if(res2.assets.length!==0){
              var temp = video
              temp.push(item)
              setVideo(temp)
            }
          })
          if(i===res.length-1){
            setLoading(false)
          }
        })
      })
      const unsubscribe = navigation.addListener('focus', () => {
        ScreenOrientation.unlockAsync()
        });
      return unsubscribe
    }, [navigation])

    if(loading) return <ActivityIndicator/>

    else{
      return (
          <ScrollView style={styles.container}>
            <StatusBar/>
            <View style={styles.head}>
              <Text style={styles.logo}>Upgrate Player</Text>
            </View>
            <View>
              {video.map((item,i)=>{
                return(
                  <TouchableOpacity key={i} onPress={()=>navigation.navigate('Folder', {id : item.id})} style={styles.videoRow}>
                    <Image style={styles.folder} source={{uri : 'https://img.icons8.com/cute-clipart/64/000000/folder-invoices.png'}}/>
                    <Text>{item.title} {item.assetCount}</Text>
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
  