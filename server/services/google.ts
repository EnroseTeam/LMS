import createHttpError from "http-errors";
import env from "../configs/validateEnv";
import axios from "axios";
import qs from "qs";

interface GoogleTokensResult {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  id_token: string;
}

export const getGoogleAuthTokens = async ({
  code,
}: {
  code: string;
}): Promise<GoogleTokensResult> => {
  const url = "https://oauth2.googleapis.com/token";

  const values = {
    code,
    client_id: env.GOOGLE_CLIENT_ID,
    client_secret: env.GOOGLE_CLIENT_SECRET,
    redirect_uri: env.GOOGLE_OAUTH_REDIRECT_URL,
    grant_type: "authorization_code",
  };

  try {
    const res = await axios.post<GoogleTokensResult>(
      url,
      qs.stringify(values),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return res.data;
  } catch (error) {
    throw createHttpError(400, "Google Token авахад алдаа гарлаа.");
  }
};

interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export const getGoogleUser = async ({
  id_token,
  access_token,
}: {
  id_token: string;
  access_token: string;
}): Promise<GoogleUserResult> => {
  try {
    const res = await axios.get<GoogleUserResult>(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    throw createHttpError(400, "Хэрэглэгчийн мэдэллийг авахад алдаа гарлаа.");
  }
};
