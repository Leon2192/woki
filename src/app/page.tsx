"use client";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { increment, decrement } from "@/redux/features/counterSlice";
import { useGetUsersQuery } from "@/redux/services/userApi";
import AllMovies from "../../src/components/shared/AllMovies";
import MovieSearch from "../../src/components/shared/MovieSearch";

export default function Home() {
  const count = useAppSelector((state) => state.counterReducer.counter);

  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>Total: {count}</h1>
      <MovieSearch />
      <AllMovies />
    </div>
  );
}
