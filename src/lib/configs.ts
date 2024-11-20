const isProduction = process.env.NODE_ENV == "production";
const manualProduction = false;

const dev_api_url = "http://localhost:8080/api";
const prod_api_url = "https://utsama.kevicai.com/api";

export var apiUrl =
    isProduction || manualProduction ? prod_api_url : dev_api_url;
