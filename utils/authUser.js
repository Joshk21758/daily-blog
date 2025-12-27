import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkAuthToken = async () => {
  try {
    //retrieve the token
    const token = await AsyncStorage.getItem("token");

    //check if user is authenticated
    if (!token) {
      return null;
    }
    //return token to be used in API headers
    return token;
  } catch (err) {
    console.log("Error fetching token from Storage", err);
    return null;
  }
};
