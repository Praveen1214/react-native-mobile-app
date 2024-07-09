import { Image, View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import FormFeild from "../../components/FormFeild";
import CustomButton from "../../components/CustomButton";

import { Link } from "expo-router";

const SignIn = () => {
  const [form, setForm] = useState({
   
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const Submit = () => {
    setIsSubmitting(true);
    console.log(form);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View  className="w-full flex justify-center h-full px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[130px] h-[84px]"
          />

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log in to Aora
          </Text>

          <FormFeild
            title="Email"
            placeholder="Enter your email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormFeild
            title="Password"
            placeholder="Enter your password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign in"
            handlePress={Submit}
            isLoading={isSubmitting}
            containerStyles="mt-10"
          />
        

        <View className="flex justify-center pt-5 flex-row gap-2">
        <Text className="text-md text-gray-100 font-pregular">
              Don't have an account?
            </Text>
          <Link
              href="/sign-up"
              className="text-md font-psemibold text-secondary"
            >
              Signup
            </Link>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
