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
  
    try {
      const formData = new FormData();
      const fileName = image.split("/").pop() || "upload.jpg";
  
      formData.append("file", {
        uri: image,
        name: fileName,
        type: "image/jpeg",
      } as unknown as Blob);

      // Send to backend
      const uploadResponse = await fetch(process.env.EXPO_PUBLIC_BACKEND + '/upload', {
        method: "POST",
        body: formData
      });

      const responseText = await uploadResponse.text();
      console.log("Response status:", uploadResponse.status);
      console.log("Response body:", responseText);
  
      if (!uploadResponse.ok) {
        throw new Error(`Upload failed: ${responseText}`);
      }
  
      const data = JSON.parse(responseText);
      Alert.alert("Upload Success", `File URL: ${data.fileUrl}`);

    } catch (error) {
      console.error(error);
      Alert.alert("Upload Error", "Something went wrong.");
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
