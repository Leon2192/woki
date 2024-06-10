import { signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
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
  registerWithEmail: async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error:any) {
      console.error("Error al registrarse:", error.message);
      throw error;
    }
  },
  signInWithEmail: async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error:any) {
      console.error("Error al iniciar sesión:", error.message);
      throw error;
    }
  }
};
