import React, { useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

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
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

const screenWidth = Dimensions.get('window').width;
const CARD_HEIGHT = screenWidth * 0.4;
const EXPANDED_HEIGHT = screenWidth * 0.6;

const ListingCard: React.FC<ListingCardProps> = ({ data, visible, onPrevious, onNext, hasPrevious, hasNext }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  if (!visible || !data) return null;

  const handleViewMore = () => {
    router.push({
      pathname: '/listing/[id]',
      params: { id: data._id }
    });
  };

  const renderCollapsedView = () => {
    return (
      <View className="flex-row h-full">
        <View className="w-[45%] h-full p-3">
          <Image
            source={data.images[0] || "https://picsum.photos/seed/696/3000/2000"}
            contentFit="cover"
            className="rounded-xl"
            style={{ width: screenWidth/2.5, height: screenWidth/2.5 }}
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
          />
          {imageLoading && (
            <View className="absolute inset-0 justify-center items-center">
              <ActivityIndicator color="#fff" />
            </View>
          )}
        </View>

        <View className="flex-1 p-4 justify-between">
          <View>
            <Text className="font-bold text-xl mb-2 text-white">
              {data.title}
            </Text>
            <Text className="text-gray-300 mb-2">
              {data.address}
            </Text>
            <Text className="text-gray-400 mb-2" numberOfLines={2}>
              {data.description}
            </Text>
          </View>

          <View className="flex-row justify-between items-center">
            <Text className="font-bold text-white">
              ${data.pricePerHour}/hr
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderExpandedView = () => {
    return (
      <View className="flex-1">
        <View className="w-full h-[60%]">
          <Image
            source={data.images[0] || "https://picsum.photos/seed/696/3000/2000"}
            contentFit="cover"
            style={{ width: screenWidth, height: 300 }}
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
          />
          {imageLoading && (
            <View className="absolute inset-0 justify-center items-center">
              <ActivityIndicator color="#fff" />
            </View>
          )}
        </View>

        <View className="flex-1 p-4">
          <Text className="font-bold text-2xl mb-2 text-white">
            {data.title}
          </Text>
          <Text className="text-gray-300 mb-2">
            {data.address}
          </Text>
          <Text className="text-gray-400 mb-4" numberOfLines={4}>
            {data.description}
          </Text>

          <View className="flex-row justify-between items-center">
            <View>
              <Text className="font-bold text-white text-xl">
                ${data.pricePerHour}/hr
              </Text>
              <Text className="text-gray-300">${data.pricePerDay}/day</Text>
              <Text className="text-gray-300">${data.pricePerMonth}/month</Text>
            </View>
            <TouchableOpacity 
              onPress={handleViewMore}
              className="bg-[#1d434f] px-6 py-3 rounded-lg"
            >
              <Text className="text-white font-semibold text-lg">View More</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={() => setIsExpanded(!isExpanded)}
      className="bg-[#1d434f] rounded-xl overflow-hidden m-3 shadow-lg flex-1"
    >
      <LinearGradient
        colors={['#1d434f', '#2e6165']}
        className="flex-1"
      >
        {/* Left Arrow */}
        {hasPrevious && (
          <TouchableOpacity 
            onPress={onPrevious}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-black/30 rounded-full p-2"
          >
            <Text className="text-white text-2xl">←</Text>
          </TouchableOpacity>
        )}

        {/* Right Arrow */}
        {hasNext && (
          <TouchableOpacity 
            onPress={onNext}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-black/30 rounded-full p-2"
          >
            <Text className="text-white text-2xl">→</Text>
          </TouchableOpacity>
        )}

        {isExpanded ? renderExpandedView() : renderCollapsedView()}

        <View className="absolute bottom-0 left-0 right-0 h-6 items-center justify-center">
          <View className="w-8 h-1 bg-gray-400 rounded-full" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ListingCard;


