import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthLayout from "../layouts/AuthLayout";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import { registerSchema } from "../modules/auth/auth.validation";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <AuthLayout>
      <form
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
            label="Name"
            type="text"
            placeholder="Enter your name"
            error={errors.name?.message}
            {...register("name")}
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password")}
          />

          <Button
            type="submit"
            loading={isSubmitting}
          >
            Create Account
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}