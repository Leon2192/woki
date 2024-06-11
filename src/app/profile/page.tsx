"use client";
import React from "react";
import { RootState } from "@/redux/store";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Image from "next/image";

const Page = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (user !== null) {
    return (
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: 5,
            marginTop: 5,
          }}
        >
          <div
            style={{ width: "100px", height: "100px", position: "relative" }}
          >
            <Image
              src="/images/profile.jpg"
              alt="Imagen de perfil"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

        <div>
          <Typography
            variant="h2"
            gutterBottom
            style={{
              color: "white",
            }}
          >
            User Profile
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            style={{
              color: "white",
            }}
          >
            UID: {user.uid}
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            style={{
              color: "white",
            }}
          >
            Display Name: {user.displayName}
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            style={{
              color: "white",
            }}
          >
            Email: {user.email}
          </Typography>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Page;
