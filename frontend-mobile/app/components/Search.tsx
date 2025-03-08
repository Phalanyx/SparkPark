import React, { useState } from 'react';
import { View, TextInput } from 'react-native';

const Search: React.FC<{ setData: (data: any[]) => void }> = ({ setData }) => {
    const [query, setQuery] = useState('');

    const handleSearch = async (query: string): Promise<void> => {
        console.log("hi");
        let response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND}/geolocation/isochrones`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ address: query }),
        });
        let data = await response.json();
        setData(data);
        console.log(data)
    };

    return (
        <View className="p-2">
            <TextInput
                className="h-10 border border-gray-400 pl-2"
                placeholder="Search"
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={(e) => {
                    handleSearch(e.nativeEvent.text);
                }}
            />
        </View>
    );
};

export default Search;
