import axios from "axios";

const letterboxdApi = axios.create({
  baseURL: "https://api.letterboxd.com/api/v0/",
});

type GenerateTokenRequest = {
  grant_type: "password";
  username: string;
  password: string;
};

type RefreshTokenRequest = {
  grant_type: "refresh_token";
  refresh_token: string;
};

// TODO: create test for this
export const getToken = (
  request: GenerateTokenRequest | RefreshTokenRequest
) => {
  return letterboxdApi.post("/auth/token", request, {});
};

type LetterboxdAPIConstructorParams = {
  username: string;
  password: string;
};
export default class LetterboxdAPI {
  constructor({ username, password }: LetterboxdAPIConstructorParams) {
    // TODO: generate token with username and password
  }

  logFilm(review: any) {}
}
