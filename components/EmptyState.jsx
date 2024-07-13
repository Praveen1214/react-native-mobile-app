import { View, Text, Image } from "react-native";
import React from "react";
import { router } from "expo-router";
import { images } from "../constants";
import CustomButton from "./CustomButton";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="font-psemibold text-xl text-white mt-2">{subtitle}</Text>
      <Text className="font-pmedium text-sm text-gray-100 ">{title}</Text>

      <CustomButton 
        title="Add Video"
        containerStyles="w-full my-5"
        handlePress={() => router.push("/upload")}
        />
    </View>
    
  );
};

export default EmptyState;
