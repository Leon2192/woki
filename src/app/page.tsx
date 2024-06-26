"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AllMovies from "@/components/shared/MoviesList/AllMovies";
import { RootState } from "@/redux/store";
import { loadUserFromStorage } from "@/redux/features/authSlice";
import MovieSlider from "@/components/ui/MovieSlider/MovieSlider";
import LoginForm from "@/components/shared/LoginForm/LoginForm";

const HomePage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  if (!user) {
    return (
      <div className="h-screen">
        <LoginForm />
      </div>
    );
  }

  return (
    <>
      <MovieSlider />
      <AllMovies />
    </>
  );
};

export default HomePage;
