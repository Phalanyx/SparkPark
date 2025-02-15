import * as ImagePicker from "expo-image-picker";
import { Button, Image, View, Alert } from "react-native";
import { useState } from "react";

export default function ImagePickerExample() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {

    // perms
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Allow access to your photos to pick an image.");
      return;
    }

    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Allow access to camera to take a picture.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // In progress
  const uploadToCloudflare = async () => {
    if (!image) {
      Alert.alert("No Image", "Please pick an image first.");
      return;
    }
  
    const response = await fetch(image);
    const blob = await response.blob();
  
    const formData = new FormData();
    formData.append("file", blob, "upload.jpg");
  
    try {
      const uploadResponse = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!uploadResponse.ok) {
        throw new Error("Upload failed");
      }
  
      const data = await uploadResponse.json();
      Alert.alert("Upload Success", `File URL: ${data.fileUrl}`);
    } catch (error) {
      Alert.alert("Upload Error");
    }
  };
  


  return (
    <View>
      <Button title="Pick an image" onPress={pickImage} />
      <Button title="Take a Picture" onPress={takePicture} />
      <Button title="Upload to Cloudflare" onPress={uploadToCloudflare} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}
