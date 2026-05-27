import { useNavigate, Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthLayout from "../../../layouts/AuthLayout";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import { loginSchema } from "../auth.validation";

import useAuthStore from "../../../store/authStore";

import { useLoginMutation } from "../hooks/useAuthMutations";

import toast from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();

  const setUser = useAuthStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useLoginMutation();

  const onSubmit = async (data) => {
    try {
      const user = await loginMutation.mutateAsync(data);

      setUser(user);
      toast.success("Login successful");

      navigate("/vocabulary");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthLayout>
      <form  autoComplete="on" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Welcome Back</h1>

          <p className="text-gray-600 mt-2">
            Login to continue your vocabulary journey.
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

          <Input
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password")}
          />

          <Button type="submit" loading={loginMutation.isPending}>
            Login
          </Button>
        </div>

        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-black font-medium">
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
