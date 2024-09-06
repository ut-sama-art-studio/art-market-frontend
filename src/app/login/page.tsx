"use client";

import React from "react";
import Image from "next/image";
import "./login.css";
import { useRouter } from "next/navigation";
import Btn3dLg from "@/components/btn-3d-lg";
import { BsDiscord } from "react-icons/bs";
import { BsGoogle } from "react-icons/bs";
import { discordLogin } from "@/services/auth/auth-service";

import loginBackground from "../../../public/images/login-page-bg.png";

export default function LoginPage() {
    const router = useRouter();

    const discordLoginOnClick = async () => {
        await discordLogin();
    };

    const googleLoginOnClick = () => {
        router.push("/auth/google");
    };
    return (
        <>
            <div className="zoom-container">
                <Image
                    className="login-zoom-out-bg"
                    src={loginBackground}
                    alt="Login background"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    priority
                ></Image>
            </div>

            <div className="fixed bottom-8 right-2 md:right-8 p-4 flex flex-col items-start space-y-6 text-white">
                <div className="space-y-4 login-slide-in-left">
                    <h1 className="text-6xl font-semibold -mb-4">Welcome!</h1>
                    <p className="text-2xl font-light">
                        Choose a login method.
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="login-delay-1 login-slide-in-left">
                        <Btn3dLg
                            onClick={discordLoginOnClick}
                            text="Login with Discord"
                            Icon={BsDiscord}
                            color="#6C89E0"
                            textColor="white"
                        />
                    </div>
                    {/* <div className="login-delay-2 login-slide-in-left ">
                        <Btn3dLg
                            onClick={googleLoginOnClick}
                            text="Login with Google"
                            Icon={BsGoogle}
                            color="#ffffff"
                            textColor="black"
                        />
                    </div> */}
                </div>
            </div>
        </>
    );
}
