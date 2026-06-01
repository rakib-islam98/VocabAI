import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "react-router-dom";

import toast from "react-hot-toast";

import AuthLayout from "../../../layouts/AuthLayout";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import { forgotPasswordSchema } from "../auth.validation";

import { useForgotPassword } from "../hooks/useAuthMutations";

export default function ForgotPasswordPage() {
  const forgotPasswordMutation = useForgotPassword();

  const location = useLocation();

  const prefilledEmail =
  location.state?.email || "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {email: prefilledEmail},
  });

  const onSubmit = async (data) => {
    try {
      const response = await forgotPasswordMutation.mutateAsync(data);

      toast.success(response.message);

      reset();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to send reset link",
      );
    }
  };

  return (
    <AuthLayout>
      <form
        autoComplete="on"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-semibold">Forgot Password</h1>

          <p className="text-gray-600 mt-2">
            Enter your email address and we'll send you a password reset link.
          </p>
        </div>

        <div className="space-y-4">
          <Input
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email")}
          />

          <Button type="submit" loading={forgotPasswordMutation.isPending}>
            Send Reset Link
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
