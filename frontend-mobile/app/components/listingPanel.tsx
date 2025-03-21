import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Image } from 'expo-image';


interface Listing {
  _id: string;
  title: string;
  address: string;
  description: string;
  images: string[];
  pricePerHour: number;
  pricePerDay: number;
  pricePerMonth: number;
  // add additional properties as needed
}

interface ListingCardProps {
  data: Listing | undefined;
}

const ListingCard: React.FC<ListingCardProps> = ({ data }) => {
  const screenHeight = Dimensions.get('window').height;

  return (
    <View
      className="flex-row bg-[#1d434f] rounded-lg overflow-hidden m-2 shadow"
      style={{ height: screenHeight * 0.15 }}
    >
        <View        className="w-[40%] h-full"
        >
      <Image
        source={"https://picsum.photos/seed/696/3000/2000r"}
        contentFit="cover"

      />
      <Text>{data?.images[0]}</Text>
        </View>

      <View className="flex-1 p-3 justify-center">
        <Text className="font-bold text-lg mb-1 text-white">
          {data?.title}
        </Text>
        <Text className="text-gray-300 mb-1">
          {data?.address}
        </Text>
        <Text className="text-gray-400 mb-1" numberOfLines={2}>
          {data?.description}
        </Text>
        <Text className="font-bold text-black">
          ${data?.pricePerHour}/hr
        </Text>
      </View>
    </View>
  );
};

export default ListingCard;


