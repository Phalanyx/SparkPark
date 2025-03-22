import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  ScrollView, 
  Alert, 
  Switch, 
  TouchableOpacity, 
  Modal, 
  Image 
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useRouter, Redirect } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';
import { launchImageLibrary } from 'react-native-image-picker'; 
import { FontAwesome } from '@expo/vector-icons'; 
import ImagePickerModal from '../components/ListingForm';

const AddListingForm = () => {
  // Step navigation state
  const [currentStep, setCurrentStep] = useState(0);

  // Step 0 fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);

  // Step 1 fields
  const [country, setCountry] = useState('');
  const [street, setStreet] = useState('');
  const [aptSuite, setAptSuite] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  
  // Single string for final address (used in the backend payload)
  const [address, setAddress] = useState('');

  // Location for storing lat/lng
  const [location, setLocation] = useState('');

  // Pricing fields
  const [pricePerHour, setPricePerHour] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [pricePerMonth, setPricePerMonth] = useState('');
  const [payAsYouGo, setPayAsYouGo] = useState(false);

  // Step 2 fields
  const [availability, setAvailability] = useState('');
  const [features, setFeatures] = useState('');

  // Size / category data from step 0
  const [selectedCategory, setSelectedCategory] = useState<string>('MEDIUM');
  const [noHeightLimit, setNoHeightLimit] = useState(false);
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial');

  const sizeGuideData = [
    { minSize: '10.0 x 4.5', category: 'X-LARGE', examples: 'RV, bus, large truck' },
    { minSize: '6.5 x 3.0',  category: 'LARGE',   examples: 'Van, minivans, pickup' },
    { minSize: '5.5 x 2.7',  category: 'MEDIUM',  examples: 'Small/crossover SUV' },
    { minSize: '5.0 x 2.5',  category: 'SMALL',   examples: 'Sedan, 2-seater truck' },
    { minSize: '3.5 x 1.8',  category: 'X-SMALL', examples: 'Motorcycle, scooter, etc.' },
  ];


  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (!user) {
        router.push('/map');
      }
    });
    return unsubscribe;
  }, [router]);

  const handleSubmit = async () => {
    try {
      const token = await auth().currentUser?.getIdToken(false);
      // if (!token) { ... }

      const payload = {
        title,
        description: JSON.stringify(selectedTypes),
        // We store the final, concatenated address in `address`:
        address,
        location: {
          type: 'Point',
          coordinates: location
            .split(',')
            .map(coord => parseFloat(coord.trim()))
        },
        size :{
          length: length,
          width:width
        },
        images: images.map(img => img.trim()),
        pricePerHour: parseFloat(pricePerHour),
        pricePerDay: pricePerDay ? parseFloat(pricePerDay) : undefined,
        pricePerMonth: pricePerMonth ? parseFloat(pricePerMonth) : undefined,
        payAsYouGo,
        availability: availability.split(',').map(entry => {
          const parts = entry.trim().split(' ');
          return {
            date: new Date(parts[0]),
            availableFrom: parts[1],
            availableUntil: parts[2]
          };
        }),
        features: features.split(',').map(feature => feature.trim()),
      };
      console.log(payload);

      const response = await fetch(
        process.env.EXPO_PUBLIC_BACKEND + '/add-listing',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        }
      );

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Listing added successfully');
      } else {
        Alert.alert('Error', data.message || 'Error adding listing');
      }
    } catch (error) {
      console.error('Error submitting listing:', error);
      Alert.alert('Error', 'An error occurred while submitting the listing.');
    }
  };

  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  // Example of how you might handle picking images
  const handleAddImage = useCallback(() => {
    launchImageLibrary(
      { mediaType: 'photo', selectionLimit: 0 }, 
      (response) => {
        if (!response.didCancel && !response.errorCode && response.assets) {
          const uris = response.assets.map((asset) => asset.uri || '');
          setImages((prev) => [...prev, ...uris]);
        }
      }
    );
  }, []);

  // Existing geocode logic (if you still need it)
  const handleGeocodeAddress = async () => {
    if (!address) {
      Alert.alert('Please enter an address');
      return;
    }
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND}/geolocation/geocode`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ address }),
      });
      const data = await response.json();
      if (data && data.coordinates) {
      } else {
        Alert.alert('Error', 'Could not geocode address');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to geocode address');
    }
  };

  // New function to call the isochrones endpoint
  const handleSearch = async (query: string): Promise<void> => {
    console.log("hi");
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND}/geolocation/isochrones`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ address: query }),
      });
      const data = await response.json();
      // Save the returned points (e.g., lon/lat) into state
      setLocation(`${data.lat}, ${data.lon}`);
      console.log(data);
    } catch (error) {
      console.error("Error in handleSearch", error);
    }
  };

  interface StepNavigationProps {
    onBack?: () => void;
    onNext: () => void;
    showBack?: boolean;
  }
  
  const StepNavigation: React.FC<StepNavigationProps> = ({
    onBack,
    onNext,
    showBack = false,
  }) => {
    return (
      <View className="flex-row mt-4 justify-center">
        {showBack && (
          <TouchableOpacity
            onPress={onBack}
            className="w-1/4 mr-2 p-4 rounded-md items-center bg-[#064c4f]"
          >
            <Text className="text-white font-semibold">Back</Text>
          </TouchableOpacity>
        )}
  
        <TouchableOpacity
          onPress={onNext}
          className={`p-4 rounded-md items-center bg-[#064c4f] ${
            showBack ? 'flex-1 ml-2' : 'w-full'
          }`}
        >
          <Text className="text-white font-semibold">Save and Continue</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      // -----------------------------------------------------------
      // STEP 0
      // -----------------------------------------------------------
      case 0:
        return (
          <View className="p-12 mt-10">
            <Text className='text-3xl text-white'>Let's pave your space...</Text>
            <Text className='text-xl mt-3 text-white'>Name your parking space*</Text>
            <TextInput 
              value={title} 
              onChangeText={setTitle} 
              placeholder="Some Name..." 
              className='text-white'
              placeholderTextColor="#99AAB5"
            />

            <Text className="text-xl text-white mt-3">
              What kind of space is it?
            </Text>
            <Text className="text-sm text-gray-300">
              (Select all applicable)
            </Text>

            {/* Pill buttons for space types */}
            <View className="flex-row flex-wrap mt-3 gap-2">
              {['Garage', 'Driveway', 'Street parking'].map(type => (
                <TouchableOpacity
                  key={type}
                  onPress={() => toggleType(type)}
                  className={`px-4 py-2 rounded-full ${
                    selectedTypes.includes(type) ? 'bg-[#48BB78]' : 'bg-[#2F4858]'
                  }`}
                >
                  <Text className="text-white">{type}</Text>
                </TouchableOpacity>
              ))}

              {/* “Other (enter below)” pill */}
              <TouchableOpacity
                onPress={() => toggleType('Other')}
                className={`px-4 py-2 rounded-full ${
                  selectedTypes.includes('Other') ? 'bg-[#48BB78]' : 'bg-[#2F4858]'
                }`}
              >
                <Text className="text-white">Other (enter below)</Text>
              </TouchableOpacity>
            </View>

            {selectedTypes.includes('Other') && (
              <View className="mt-4">
                <TextInput
                  value={description}
                  onChangeText={setDescription}
                  placeholder="a spaceship..."
                  placeholderTextColor="#99AAB5"
                  className="bg-[#2F4858] text-white p-3 rounded-md"
                />
              </View>
            )}

            <View className="my-4 h-[1px] w-full bg-gray-300" />

            <Text className="text-xl text-white mt-3">How big is it?</Text>
            <Text className="text-sm text-gray-300">
              (Select a size category or manually type in dimensions)
            </Text>

            {/* Example size categories */}
            <View className="flex-row flex-wrap mt-4 gap-2">
            {sizeGuideData.map((row, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectedCategory(row.category);
                  const [len, wid] = row.minSize.split('x').map(s => s.trim());
                  setLength(len);
                  setWidth(wid);
                }}
                className={`px-4 py-2 rounded-full border ${
                  selectedCategory === row.category
                    ? 'bg-[#48BB78] border-[#48BB78]'
                    : 'bg-[#2F4858] border-gray-400'
                }`}
              >
                <Text className="text-white">{row.category}</Text>
              </TouchableOpacity>
            ))}
              {/* "Manually Type In" chip */}
              <TouchableOpacity
                onPress={() => setSelectedCategory('manual')}
                className={`px-4 py-2 rounded-full border ${
                  selectedCategory === 'manual'
                    ? 'bg-[#48BB78] border-[#48BB78]'
                    : 'bg-[#2F4858] border-gray-400'
                }`}
              >
                <Text className="text-white">Manually Type In</Text>
              </TouchableOpacity>
            </View>

            {/* If user selected a known category, show that info */}
            {selectedCategory !== 'manual' && sizeGuideData.find(r => r.category === selectedCategory) && (
              <View className="mt-4 p-4 bg-[#2F4858] rounded-md">
                <Text className="text-white">
                  Dimensions: {
                    sizeGuideData.find(r => r.category === selectedCategory)?.minSize
                  } meters
                </Text>
                <Text className="text-gray-300 text-sm mt-1">
                  {
                    sizeGuideData.find(r => r.category === selectedCategory)?.examples
                  }
                </Text>
              </View>
            )}

            {/* If user selected manual input */}
            {selectedCategory === 'manual' && (
              <View className="mt-4">
                <Text className="text-white mb-1">Length</Text>
                <TextInput
                  value={length}
                  onChangeText={setLength}
                  keyboardType="numeric"
                  placeholder="e.g. 20.0"
                  placeholderTextColor="#99AAB5"
                  className="bg-[#2F4858] text-white p-3 rounded-md mb-3"
                />

                <Text className="text-white mb-1">Width</Text>
                <TextInput
                  value={width}
                  onChangeText={setWidth}
                  keyboardType="numeric"
                  placeholder="e.g. 15.0"
                  placeholderTextColor="#99AAB5"
                  className="bg-[#2F4858] text-white p-3 rounded-md mb-3"
                />

                <Text className="text-white mb-1">Height</Text>
                {noHeightLimit ? (
                  <Text className="text-gray-300 italic mb-3">No limit</Text>
                ) : (
                  <TextInput
                    value={height}
                    onChangeText={setHeight}
                    keyboardType="numeric"
                    placeholder="e.g. 7.0"
                    placeholderTextColor="#99AAB5"
                    className="bg-[#2F4858] text-white p-3 rounded-md mb-3"
                  />
                )}

                <TouchableOpacity
                  onPress={() => {
                    setNoHeightLimit(prev => !prev);
                    setHeight('');
                  }}
                >
                  <Text className="text-[#48BB78] underline">
                    {noHeightLimit ? 'Use a specific height' : 'No height limit'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Size Guide Modal Button */}
            <TouchableOpacity
              onPress={() => setShowSizeGuide(true)}
              className="mt-4 border border-gray-300 rounded-md px-4 py-2 w-32"
            >
              <Text className="text-white text-center">Size Guide</Text>
            </TouchableOpacity>

            {/* Size Guide Modal */}
            <Modal visible={showSizeGuide} transparent animationType="fade">
              <View className="flex-1 bg-black bg-opacity-60 justify-center items-center">
                <View className="bg-[#2F4858] w-5/6 p-4 rounded-md">
                  <Text className="text-lg text-white mb-2">Size Guide</Text>
                  <ScrollView>
                    {/* Table Header */}
                    <View className="flex-row">
                      <View className="flex-1 p-2 border border-gray-400">
                        <Text className="text-white font-bold">Minimum Size</Text>
                      </View>
                      <View className="flex-1 p-2 border border-gray-400">
                        <Text className="text-white font-bold">Category</Text>
                      </View>
                      <View className="flex-1 p-2 border border-gray-400">
                        <Text className="text-white font-bold">Examples</Text>
                      </View>
                    </View>

                    {/* Render table rows from sizeGuideData */}
                    {sizeGuideData.map((row, index) => (
                      <View className="flex-row" key={index}>
                        <View className="flex-1 p-2 border border-gray-400">
                          <Text className="text-white">{row.minSize}</Text>
                        </View>
                        <View className="flex-1 p-2 border border-gray-400">
                          <Text className="text-white">{row.category}</Text>
                        </View>
                        <View className="flex-1 p-2 border border-gray-400">
                          <Text className="text-white">{row.examples}</Text>
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                  <TouchableOpacity
                    onPress={() => setShowSizeGuide(false)}
                    className="mt-4 bg-[#48BB78] p-3 rounded-md"
                  >
                    <Text className="text-white text-center">Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <View className="my-6 h-[1px] w-full bg-gray-400" />

            <Text className="text-xl text-white mt-3">What does it look like?</Text>
            <Text className="text-sm text-gray-300">
              (Upload images of the parking space and surroundings)
            </Text>

            <View className='flex flex-row gap-1 mt-4 flex-wrap '>
              <ImagePickerModal setImages={setImages} images={images} />
              {images.map((uri, index) => (
                <Image
                  key={index}
                  source={{ uri }}
                  style={{ width: 60, height: 60, borderRadius: 8 }}
                />
              ))}
            </View>

            <StepNavigation
              onBack={() => setCurrentStep(prev => prev - 1)}
              onNext={() => setCurrentStep(prev => prev + 1)}
              showBack={currentStep > 0}
            />
          </View>
        );

      // -----------------------------------------------------------
      // STEP 1 (UPDATED)
      // -----------------------------------------------------------
      case 1:
        // Compute the combined address from the address fields
        const combinedAddress = [
          street,
          aptSuite,
          cityInput,
          province,
          postalCode,
          country,
        ]
          .filter(Boolean)
          .join(', ');
        return (
          <View className="p-12 mt-10">
            <Text className="text-3xl text-white mb-4">Pinning it down...</Text>

            <Text className="text-xl text-white">Where is it?</Text>
            <Text className="text-sm text-gray-300 mb-4">
              (Enter the exact location details of your space)
            </Text>

            <Text className="text-white mb-1">Country</Text>
            <TextInput
              value={country}
              onChangeText={setCountry}
              placeholder="e.g. Canada"
              placeholderTextColor="#99AAB5"
              className="bg-[#2F4858] text-white p-3 rounded-md mb-4"
            />

            <Text className="text-white mb-1">Street address</Text>
            <TextInput
              value={street}
              onChangeText={setStreet}
              placeholder="123 Main St"
              placeholderTextColor="#99AAB5"
              className="bg-[#2F4858] text-white p-3 rounded-md mb-4"
            />

            <Text className="text-white mb-1">Apt, suite (optional)</Text>
            <TextInput
              value={aptSuite}
              onChangeText={setAptSuite}
              placeholder="Apt 101"
              placeholderTextColor="#99AAB5"
              className="bg-[#2F4858] text-white p-3 rounded-md mb-4"
            />

            <Text className="text-white mb-1">City</Text>
            <TextInput
              value={cityInput}
              onChangeText={setCityInput}
              placeholder="e.g. Toronto"
              placeholderTextColor="#99AAB5"
              className="bg-[#2F4858] text-white p-3 rounded-md mb-4"
            />

            <Text className="text-white mb-1">Province / State</Text>
            <TextInput
              value={province}
              onChangeText={setProvince}
              placeholder="Ontario"
              placeholderTextColor="#99AAB5"
              className="bg-[#2F4858] text-white p-3 rounded-md mb-4"
            />

            <Text className="text-white mb-1">Postal Code</Text>
            <TextInput
              value={postalCode}
              onChangeText={setPostalCode}
              placeholder="M4B 1B3"
              placeholderTextColor="#99AAB5"
              className="bg-[#2F4858] text-white p-3 rounded-md mb-4"
            />

            {/* Display the combined address and add the Geocode button */}
            <View className="mt-4">
              <Text className="text-white">
                Combined Address: {combinedAddress}
              </Text>
              <TouchableOpacity
                onPress={() => handleSearch(combinedAddress)}
                className="mt-2 bg-[#48BB78] p-3 rounded-md"
              >
                <Text className="text-white text-center">Geocode</Text>
              </TouchableOpacity>
              {location && (
                <Text className="text-white mt-2">
                  Coordinates: {location}
                </Text>
              )}
            </View>

            <View className="bg-[#2F4858] rounded-md h-40 justify-center items-center mt-4">
              <Text className="text-white">[Map Placeholder]</Text>
            </View>

            <Text className="text-xl text-white mt-6">What will the pricing be?</Text>
            <Text className="text-sm text-gray-300 mb-4">
              (Enter what you will charge for the space)
            </Text>

            <Text className="text-white mb-1">Hourly</Text>
            <TextInput
              value={pricePerHour}
              onChangeText={(text) =>
                setPricePerHour(text.replace(/[^0-9.]/g, ''))
              }
              keyboardType="numeric"
              placeholder="$70"
              placeholderTextColor="#99AAB5"
              className="bg-[#2F4858] text-white p-3 rounded-md mb-4"
            />

            <Text className="text-white mb-1">Daily (optional)</Text>
            <TextInput
              value={pricePerDay}
              onChangeText={(text) =>
                setPricePerDay(text.replace(/[^0-9.]/g, ''))
              }
              keyboardType="numeric"
              placeholder="$100"
              placeholderTextColor="#99AAB5"
              className="bg-[#2F4858] text-white p-3 rounded-md mb-4"
            />

            <Text className="text-white mb-1">Monthly (optional)</Text>
            <TextInput
              value={pricePerMonth}
              onChangeText={(text) =>
                setPricePerMonth(text.replace(/[^0-9.]/g, ''))
              }
              keyboardType="numeric"
              placeholder="$500"
              placeholderTextColor="#99AAB5"
              className="bg-[#2F4858] text-white p-3 rounded-md mb-4"
            />

            <View className="flex-row items-center mb-4">
              <Text className="text-white mr-3">Pay As You Go</Text>
              <Switch
                value={payAsYouGo}
                onValueChange={setPayAsYouGo}
              />
            </View>

            <StepNavigation
              onBack={() => setCurrentStep((prev) => prev - 1)}
              onNext={() => {
                // Set the final address to be used in the payload
                setAddress(combinedAddress);
                setCurrentStep((prev) => prev + 1);
              }}
              showBack={currentStep > 0}
            />
          </View>
        );

      // -----------------------------------------------------------
      // STEP 2 
      // -----------------------------------------------------------
      case 2:
        return (
          <View className="p-12 mt-10">
            <Text>
              Availability (format: YYYY-MM-DD HH:MM HH:MM, separate multiple entries with commas)
            </Text>
            <TextInput
              value={availability}
              onChangeText={setAvailability}
              placeholder="e.g., 2025-04-01 09:00 17:00, 2025-04-02 10:00 16:00"
            />

            <Text>Features (comma separated)</Text>
            <TextInput
              value={features}
              onChangeText={setFeatures}
              placeholder="e.g., WiFi, EV Charger, Security Camera"
            />

            <Button 
              title="Submit Listing" 
              onPress={handleSubmit} 
            />
            <StepNavigation
              onBack={() => setCurrentStep(prev => prev - 1)}
              onNext={() => setCurrentStep(prev => prev + 1)}
              showBack={currentStep > 0}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <LinearGradient
      colors={['#1d434f', '#2e6165']} // Customize these colors as needed
      style={{ flex: 1 }}
    >
      <ScrollView>
        {renderStep()}
      </ScrollView>
    </LinearGradient>
  );
};

export default AddListingForm;
