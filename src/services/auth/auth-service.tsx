import { apiUrl } from "@/lib/configs";
import { graphqlUseToken } from "../graphql/graphql-service";

export async function discordLogin() {
    window.location.href = apiUrl + "/auth/discord/login";
}

export function getAuthToken() {
    const token = localStorage.getItem("auth_token");
    return token;
}

export function setAuthToken(token: string) {
    localStorage.setItem("auth_token", token);
    
    graphqlUseToken(token);
}

export function removeAuthToken(): void {
    localStorage.removeItem("auth_token");
}
