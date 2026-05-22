import { useMutation } from "@tanstack/react-query";

import {
  loginUser,
  registerUser,
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