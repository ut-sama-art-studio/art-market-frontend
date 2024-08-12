"use client";

import React from "react";
import "./login.css";
import CircularBtn3D from "@/components/circular-btn-3d";
import { BsDiscord } from "react-icons/bs";
import { BsGoogle } from "react-icons/bs";

export default function Login() {
    const discordLoginOnClick = () => {};
    const googleLoginOnClick = () => {};

    return (
        <div className="login-bg top-0 text-white">
            <h1 className="text-6xl">Welcome!</h1>
            <p className="text-3xl">Choose a login method.</p>
            <CircularBtn3D
                onClick={discordLoginOnClick}
                text="Login with Discord"
                Icon={BsDiscord}
                color="#6C89E0"
                textColor="white"
            />
            <CircularBtn3D
                onClick={googleLoginOnClick}
                text="Login with Google"
                Icon={BsGoogle}
                color="white"
                textColor="black"
            />
        </div>
    );
}
