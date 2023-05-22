import "dotenv/config";
import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";

export default cleanEnv(process.env, {
  NODE_ENV: str(),
  MONGO_CONNECTION_STRING: str(),
  PORT: port(),
  AWS_ACCESS_KEY_ID: str(),
  AWS_SECRET_ACCESS_KEY: str(),
  AWS_REGION: str(),
  AWS_BUCKET_NAME: str(),
  SESSION_SECRET: str(),
  GOOGLE_CLIENT_ID: str(),
  GOOGLE_CLIENT_SECRET: str(),
  GOOGLE_OAUTH_REDIRECT_URL: str(),
  PUBLIC_SITE_URL: str(),
  ADMIN_SITE_URL: str(),
  REVALIDATE_SECRET: str(),
});
