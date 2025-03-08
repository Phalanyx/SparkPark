import React, { useState } from 'react';
import { View, TextInput, Text, SectionList } from 'react-native';
import { Icon } from 'react-native-elements'



const Search: React.FC<{ setData: (data: any[]) => void , setCenter: (data:any[]) => void}> = ({ setData, setCenter }) => {
    const [query, setQuery] = useState('');

    const handleSearch = async (query: string): Promise<void> => {
        if (query.length < 3) {
            const fetchData = async () => {
                try {
                    const response = await fetch('http://localhost:4000/', { method: "GET" });
                    const result = await response.json();
                    console.log(result);
                    setData(result);
    
                } catch (error) {
                    setData([]);
                    console.error('There was an error making the request!', error);
                } 
            };
            fetchData();
            return;
        }
        
        let response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND}/geolocation/isochrones`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ address: query }),
        });
        let data = await response.json();
        setData(data.points);
        setCenter([data.lat, data.lon]);
        console.log(data)
    };
    


    return (
        <View className="p-2 flex flex-row items-center">
            <TextInput
                className="h-12 border bg-none pl-2 bg-[#004B25] rounded-lg text-white flex-grow"
                placeholder="Search"
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={(e) => {
                    handleSearch(e.nativeEvent.text);
                }}
            />
            <View className="w-12 h-12 flex items-center justify-center">
            <Icon
                name='filter'
                type='font-awesome'
                onPress={() => console.log('hello')} />
            </View>
        </View>
    );
};



export default Search;
