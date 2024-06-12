"use client";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AllMovies from '@/components/shared/AllMovies';
import { RootState } from '@/redux/store';
import { loadUserFromStorage } from '@/redux/features/authSlice';
import MovieSlider from '@/components/ui/MovieSlider';
import LoginForm from '@/components/shared/LoginForm';

const HomePage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  if (!user) {
    return <LoginForm />; 
  }

  return (
    <>
      <MovieSlider />
      <AllMovies />
    </>
  );
};

export default HomePage;
