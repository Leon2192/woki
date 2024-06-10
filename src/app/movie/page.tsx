import React from "react";
// import { useRouter } from "next/router";
import ProductPage from "./[...id]/page";


const MoviePage = () => {
  // const router = useRouter();
  // const { id } = router.query;

  return (
    <div>
      <h1>Movie Page</h1>
      <ProductPage />
    </div>
  );
};

export default MoviePage;
