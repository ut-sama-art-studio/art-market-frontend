import React, { useEffect, useState } from "react";
import { apiUrl } from "@/lib/config";

export async function discordLogin() {
    console.log(apiUrl);
    const str = await fetch(apiUrl + "/hello-world");
    console.log(str);
    window.location.href = apiUrl + "/auth/discord/login";
}
