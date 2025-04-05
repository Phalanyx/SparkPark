import React, { useState, useCallback } from "react";
import * as ImagePicker from "expo-image-picker";
import { launchImageLibrary } from 'react-native-image-picker'; 

import {
  Button,
  Image,
  View,
  Alert,
  Modal,
  TouchableOpacity,
  Text,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface ImagePickerModalProps {
  images: String [];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ImagePickerModal({ setImages }: ImagePickerModalProps) {
  const [image, setImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const pickImage = useCallback(() => {
    launchImageLibrary(
      { mediaType: 'photo', selectionLimit: 0 },
      (response) => {
        if (!response.didCancel && !response.errorCode && response.assets) {
          const uris = response.assets.map((asset) => asset.uri || '');
          const uploadPromises = uris.map((uri) => uploadToCloudflare(uri));
          Promise.all(uploadPromises)
            .then((uploadResults) => {
              const fileUrls = uploadResults.map((result) => result.fileUrl);
              setImages((prev) => [...prev, ...fileUrls]);
            })
            .catch((error) => {
              console.error("Upload Error:", error);
            });
        }
      }
    );
  }, []);
  
  const takePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Allow access to camera to take a picture."
      );
      return;
    }
    
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const uri = result.assets[0].uri;
      uploadToCloudflare(uri)
        .then((uploadData) => {
          console.log("Upload Success:", uploadData);
        })
        .catch((error) => {
          console.error("Upload Error:", error);
        });
        setImages((prev) => [...prev, uri]); 

    }
  };
  

  
  interface CloudFlareUploadProp {
    fileUrl: string;
  }
  
  const uploadToCloudflare = async (image: string) => {
    if (!image) {
      Alert.alert("No Image", "Please pick an image first.");
      // Throw an error so that the caller knows the operation didn't complete
      throw new Error("No image provided");
    }
    try {
      const formData = new FormData();
      const fileName = image.split("/").pop() || "upload.jpg";
      formData.append("file", {
        uri: image,
        name: fileName,
        type: "image/jpeg",
      } as unknown as Blob);
  
      const uploadResponse = await fetch(
        `${process.env.EXPO_PUBLIC_BACKEND}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
  
      const responseText = await uploadResponse.text();
      console.log("Response status:", uploadResponse.status);
      console.log("Response body:", responseText);
  
      if (!uploadResponse.ok) {
        throw new Error(`Upload failed: ${responseText}`);
      }
      const data: CloudFlareUploadProp = JSON.parse(responseText);
      Alert.alert("Upload Success", `File URL: ${data.fileUrl}`);
      return data;
    } catch (error) {
      console.error(error);
      Alert.alert("Upload Error", "Something went wrong.");
      throw error;
    }
  };
  

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      {/* Button that opens the modal */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="w-[60px] h-[60px] border-2 border-[#48BB78] rounded-md items-center justify-center"
      >
        <FontAwesome name="plus" size={28} color="#48BB78" />
      </TouchableOpacity>

      {/* Modal for image actions */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              padding: 20,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 20 }}>
              Add an Image
            </Text>
            <Button title="Pick an Image" onPress={pickImage} />
            <View style={{ height: 10 }} />
            <Button title="Take a Picture"             />
                        {/*onPress={takePicture} */}

            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200, marginVertical: 20 }}
              />
            )}
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
