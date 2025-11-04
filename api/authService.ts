import apiInstance from "./apiInstance";
import Cookies from "js-cookie";
import axios from "axios";
import { useAuthStore, User } from "@/stores/useAuthStore";

interface SignupResponse {
  message: string;
  unverifiedEmail: string;
  success: boolean;
}

interface VerifyEmailResponse {
  token: string;
  user: User;
}
interface LoginResponse {
  token: string;
  user: User;
}
interface ResendCodeResponse {
  message: string;
}
export const registerUserClient = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  phone: string
): Promise<SignupResponse> => {
  try {
    const response = await apiInstance.post<SignupResponse>(
      "/api/auth/signup",
      {
        firstname,
        lastname,
        email,
        password,
        phone,
      }
    );

    const { setUnverifiedEmail } = useAuthStore.getState();

    setUnverifiedEmail(email);

    return {
      ...response.data,
      success: true,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message ||
          "Registration failed. Please check your data."
      );
    }
    throw new Error(
      "An unexpected network error occurred during registration."
    );
  }
};

export const verifyEmailClient = async (
  email: string,
  code: string
): Promise<VerifyEmailResponse> => {
  try {
    const response = await apiInstance.post<VerifyEmailResponse>(
      "/api/auth/verify-email",
      {
        email,
        code,
      }
    );

    const { token, user } = response.data;
    const { login: loginUser, clearUnverifiedEmail } = useAuthStore.getState();

    loginUser(token, user);

    clearUnverifiedEmail();

    const rememberMeDays = 30;
    Cookies.set("shiftremit_auth_token", token, {
      expires: rememberMeDays,
      secure: process.env.NODE_ENV === "production",
    });

    apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message ||
          "Email verification failed. Check the code."
      );
    }
    throw new Error(
      "An unexpected network error occurred during email verification."
    );
  }
};
export const resendCodeClient = async (
  email: string
): Promise<ResendCodeResponse> => {
  try {
    const response = await apiInstance.post<ResendCodeResponse>(
      "/api/auth/resend-verification",
      {
        email,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "Failed to resend verification code."
      );
    }
    throw new Error(
      "An unexpected network error occurred while trying to resend the code."
    );
  }
};

export const loginClient = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await apiInstance.post<LoginResponse>("/api/auth/login", {
      email,
      password,
    });

    const { token, user } = response.data;
    const { login: loginUser, clearUnverifiedEmail } = useAuthStore.getState();

    loginUser(token, user);

    clearUnverifiedEmail();

    const rememberMeDays = 30;
    Cookies.set("shiftremit_auth_token", token, {
      expires: rememberMeDays,
      secure: process.env.NODE_ENV === "production",
    });

    apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message ||
          "Login failed. Check your email and password."
      );
    }
    throw new Error("An unexpected network error occurred during login.");
  }
};
