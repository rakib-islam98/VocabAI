import { useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import AuthLayout from "../../../layouts/AuthLayout";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import { resetPasswordSchema } from "../auth.validation";

import { useResetPassword } from "../hooks/useAuthMutations";

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const { token } = useParams();

  const resetPasswordMutation = useResetPassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await resetPasswordMutation.mutateAsync({
        token,
        password: data.password,
      });

      toast.success(response.message);

      reset();

      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Password reset failed");
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
          <h1 className="text-3xl font-semibold">Reset Password</h1>

          <p className="text-gray-600 mt-2">Enter your new password below.</p>
        </div>

        <div className="space-y-4">
          <Input
            id="password"
            label="New Password"
            type="password"
            autoComplete="new-password"
            placeholder="Enter new password"
            error={errors.password?.message}
            {...register("password")}
          />

          <Input
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            autoComplete="new-password"
            placeholder="Confirm password"
            hidePasswordToggle={true}
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <Button type="submit" loading={resetPasswordMutation.isPending}>
            Reset Password
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
