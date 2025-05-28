import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleprovider } from "./firebase";

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleprovider);
    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    
  } catch (error) {
    console.error("Logout Error:", error);
    throw error;
  }
};
