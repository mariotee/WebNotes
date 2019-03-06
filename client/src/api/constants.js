const PROD_URL = "https://ju48kiggo7.execute-api.us-east-2.amazonaws.com/api"
const DEV_URL = "https://1ztk64k2b4.execute-api.us-east-2.amazonaws.com/test"
export const LAMBDA_URL = process.env.NODE_ENV === "production" ? PROD_URL : DEV_URL