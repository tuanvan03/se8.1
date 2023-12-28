import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    FlatList,
    TouchableOpacity,
  } from 'react-native';

  const HomeScreen = () => {
    return (
        <View style = {styles.container}>
            <Text>Wellcome Home</Text>
        </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent : 'center',
        alignItems : 'center',
      },
    });

export default HomeScreen;