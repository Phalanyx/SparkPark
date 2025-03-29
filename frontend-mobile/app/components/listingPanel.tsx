import React, { useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

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
  visible: boolean;
}

const screenWidth = Dimensions.get('window').width;

const ListingCard: React.FC<ListingCardProps> = ({ data, visible }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const router = useRouter();
  const screenHeight = Dimensions.get('window').height;

  if (!visible || !data) return null;

  const handleViewMore = () => {
    router.push({
      pathname: '/listing/[id]',
      params: { id: data._id }
    });
  };

  return (
    <View
      className="flex-row bg-[#1d434f] rounded-lg overflow-hidden m-2 shadow"
      style={{ height: screenHeight * 0.15 }}
    >
      <View className="w-[40%] h-full">
        <Image
          source={data.images[0] || "https://picsum.photos/seed/696/3000/2000"}
          contentFit="cover"
          className="rounded-lg p-2"
          style={{ width: screenWidth/2.7, height: screenWidth/3 }}
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
        />
        {imageLoading && (
          <View className="absolute inset-0 justify-center items-center">
            <ActivityIndicator color="#fff" />
          </View>
        )}
      </View>

      <View className="flex-1 p-3 justify-center">
        <Text className="font-bold text-lg mb-1 text-white">
          {data.title}
        </Text>
        <Text className="text-gray-300 mb-1">
          {data.address}
        </Text>
        <Text className="text-gray-400 mb-1" numberOfLines={2}>
          {data.description}
        </Text>
        <View className="flex-row justify-between items-center">
          <Text className="font-bold text-white">
            ${data.pricePerHour}/hr
          </Text>
          <TouchableOpacity 
            onPress={handleViewMore}
            className="bg-blue-500 px-3 py-1 rounded"
          >
            <Text className="text-white">View More</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ListingCard;


