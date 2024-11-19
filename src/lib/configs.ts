const isProduction = process.env.NODE_ENV == "production";
const manualProduction = false;

const apiUrlEnv =
    isProduction || manualProduction
        ? process.env.NEXT_PUBLIC_API_URL
        : process.env.NEXT_PUBLIC_LOCAL_API_URL;
export var apiUrl = apiUrlEnv || "http://localhost:8080/api";
