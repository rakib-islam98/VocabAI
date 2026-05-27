import { useNavigate, Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthLayout from "../../../layouts/AuthLayout";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import { registerSchema } from "../auth.validation";

import useAuthStore from "../../../store/authStore";

import { useRegisterMutation } from "../hooks/useAuthMutations";

import toast from "react-hot-toast";

export default function RegisterPage() {
  const navigate = useNavigate();

  const setUser = useAuthStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useRegisterMutation();

  const onSubmit = async (data) => {
    try {
      const user = await registerMutation.mutateAsync(data);

      setUser(user);

      toast.success("Account created successfully");

      navigate("/");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Registration failed"
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
          <h1 className="text-3xl font-semibold">
            Create Account
          </h1>

          <p className="text-gray-600 mt-2">
            Start building your AI-powered vocabulary system.
          </p>
        </div>

        <div className="space-y-4">
          <Input
            id="name"
            label="Name"
            type="text"
            autoComplete="name"
            placeholder="Enter your name"
            error={errors.name?.message}
            {...register("name")}
          />

          <Input
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            id="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password")}
          />

          <Button
            type="submit"
            loading={registerMutation.isPending}
          >
            Create Account
          </Button>
        </div>

        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-black font-medium"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}