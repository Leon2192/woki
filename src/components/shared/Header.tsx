import React from "react";
import Image from "next/image";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Sidebar from "./Sidebar";

const Header = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <AppBar position="static" style={{ backgroundColor: "transparent" }}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Link href="/">
            <Image src="/images/logo.png" alt="Logo" width={120} height={40} />
          </Link>
        </div>
        <div style={{ flexGrow: 1 }}></div>
        <Sidebar />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
