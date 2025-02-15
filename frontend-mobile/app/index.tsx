import React, {useEffect, useState} from "react";
import { View, StyleSheet, Text } from "react-native";
import Map from "./components/map";
import Login from "./login";

export default function Index() {


  return (
    <View style={{flex: 1}}>
      <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%'
  }
})