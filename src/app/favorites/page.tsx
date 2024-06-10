"use client"
import FavoritesList from '@/components/shared/FavoriteList'
import MovieSlider from '@/components/ui/MovieSlider'
import React from 'react'

const page = () => {
  return (
    <>
        <MovieSlider />
        <FavoritesList />
    </>
  )
}

export default page