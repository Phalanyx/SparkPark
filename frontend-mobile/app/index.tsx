import React, {useEffect, useState} from "react";
import { View, StyleSheet, Text } from "react-native";
import Map from "./components/map";


export default function Index() {
  const [datas, setDatas] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api', { method: "GET" });
        const result = await response.json();
        setDatas(result);
      } catch (error) {
        setDatas([]);
        console.error('There was an error making the request!', error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Map />
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