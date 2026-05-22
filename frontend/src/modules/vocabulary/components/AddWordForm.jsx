import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import { useEffect } from "react";

import { addWordSchema } from "../schemas/addWord.schema";

import { useAddWord } from "../hooks/useAddWord";

import Input from "../../../components/ui/Input";

import Button from "../../../components/ui/Button";

const AddWordForm = ({
  onSuccess,
  setIsSubmitting,
}) => {
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(addWordSchema),

    defaultValues: {
      word: "",
      sourceSentence: "",
    },
  });

  const { mutate, isPending } =
    useAddWord();

  useEffect(() => {
  setIsSubmitting?.(isPending);
}, [isPending, setIsSubmitting]);

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        toast.success(
          "Word added successfully"
        );

        reset();

        onSuccess?.();
      },

      onError: (error) => {
        toast.error(
          error?.response?.data?.message ||
            "Something went wrong"
        );
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* WORD */}
      <div>
        <Input
          placeholder="Enter a word"
          {...register("word")}
        />

        {errors.word && (
          <p className="text-red-500 text-sm mt-1">
            {errors.word.message}
          </p>
        )}
      </div>

      {/* SOURCE */}
      <div>
        <textarea
          rows={4}
          placeholder="Optional: Where did you encounter this word? Write the sentence or context..."
          {...register("sourceSentence")}
          className="
            w-full rounded-2xl border
            px-4 py-3 resize-none
            outline-none
            focus:ring-2 focus:ring-black
          "
        />

        {errors.sourceSentence && (
          <p className="text-red-500 text-sm mt-1">
            {errors.sourceSentence.message}
          </p>
        )}
      </div>

      {/* BUTTON */}
      <Button
        type="submit"
        disabled={isPending}
        className="w-full"
      >
        {isPending
          ? "Adding..."
          : "Add Word"}
      </Button>
    </form>
  );
};

export default AddWordForm;