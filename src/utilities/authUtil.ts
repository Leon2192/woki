import { authService } from "@/redux/services/userApi";
import { setUser, setLoading, setError, clearError } from "@/redux/features/authSlice";
import { AppDispatch } from "@/redux/store";

export const signInWithGoogle = async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  dispatch(clearError());
  try {
    const user = await authService.signInWithGoogle();
    dispatch(setUser({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
    }));
    console.log('user',user);
    return user;
  } catch (error:any) {
    dispatch(setError(error.message));
    console.error("Error al iniciar sesión con Google:", error.message);
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const logout = async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  dispatch(clearError());
  try {
    await authService.signOut();
    dispatch(setUser(null));
  } catch (error:any) {
    dispatch(setError(error.message));
    console.error("Error al cerrar sesión:", error.message);
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const registerWithEmail = async (email: string, password: string, dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  dispatch(clearError());
  try {
    const user = await authService.registerWithEmail(email, password);
    dispatch(setUser({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
    }));
    console.log('user', user);
    return user;
  } catch (error:any) {
    dispatch(setError(error.message));
    console.error("Error al registrarse:", error.message);
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const signInWithEmail = async (email: string, password: string, dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  dispatch(clearError());
  try {
    const user = await authService.signInWithEmail(email, password);
    dispatch(setUser({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
    }));
    console.log('user', user);
    return user;
  } catch (error:any) {
    dispatch(setError(error.message));
    console.error("Error al iniciar sesión:", error.message);
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const handleGoogleSignIn = async (dispatch: AppDispatch) => {
  try {
    await signInWithGoogle(dispatch);
  } catch (error:any) {
    console.error(error.message);
  }
};

export const handleEmailSignIn = async (email: string, password: string, dispatch: AppDispatch) => {
  try {
    await signInWithEmail(email, password, dispatch);
  } catch (error:any) {
    console.error(error.message);
  }
};

export const handleRegisterWithEmail = async (email: string, password: string, dispatch: AppDispatch) => {
  try {
    await registerWithEmail(email, password, dispatch);
  } catch (error:any) {
    console.error(error.message);
  }
};

export const handleLogout = async (dispatch: AppDispatch) => {
  try {
    await logout(dispatch);
    console.log("Sesion cerrada exitosamente")
  } catch (error:any) {
    console.error(error.message);
  }
};
