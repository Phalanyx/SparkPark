import React, {useEffect, useState} from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import { Link } from "expo-router";
export default function Index() {
  const [datas, setDatas] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api', { method: "GET" });
        const result = await response.json();
        setDatas(result);
      } catch (error) {
        console.error('There was an error making the request!', error);
      }
    };

    fetchData();
  }, []);
  return (
    <View style={{flex: 1}}>
      <Link href="/login">To Login Page</Link>
      <Text className="text-lg">The following are the data of parking spots in Toronto retrieved from our MongoDB database, through our node + express server.</Text>
      <Text> {JSON.stringify(datas)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%'
  }
})