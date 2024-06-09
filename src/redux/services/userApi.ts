import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase/firebaseConfig";

export const authService = {
  signInWithGoogle: async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error:any) {
      console.error("Error al iniciar sesión con Google:", error.message);
      throw error;
    }
  },
  signOut: async () => {
    try {
      await signOut(auth);
    } catch (error:any) {
      console.error("Error al cerrar sesión:", error.message);
      throw error;
    }
  },
};
