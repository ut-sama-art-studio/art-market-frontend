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
        <>
            <div className="login-bg top-0"></div>
            <div className="fixed bottom-8 right-2 md:right-8 p-4 flex flex-col items-start space-y-6 text-white">
                <div className="space-y-4">
                    <h1 className="text-6xl font-semibold -mb-4">
                        Welcome!
                    </h1>
                    <p className="text-2xl font-light">
                        Choose a login method.
                    </p>
                </div>

                <div className="space-y-4">
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
                        color="#ffffff"
                        textColor="black"
                    />
                </div>
            </div>
        </>
    );
}
