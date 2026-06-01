import { useMutation } from "@tanstack/react-query";

import {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
} from "../services/auth.service";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};
