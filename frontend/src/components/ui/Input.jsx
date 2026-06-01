import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Input({
  label,
  error,
  id,
  ...props
}) {
  const [showPassword, setShowPassword] =
  useState(false);

  const isPassword =
    props.type === "password";

  const shouldShowToggle =
    isPassword &&
    !props.hidePasswordToggle;
  
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={id}
          {...props}
          type={
            isPassword
              ? showPassword
                ? "text"
                : "password"
              : props.type
          }
          className="
            w-full
            h-12
            px-4
            rounded-xl
            border
            border-gray-300
            outline-none
            transition
            focus:ring-2
            focus:ring-black
            pr-12
          "
        />

        {shouldShowToggle && (
          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-gray-500
            "
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}