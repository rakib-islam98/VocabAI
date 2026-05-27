export const validateExercise = (
  exercise
) => {
  /*
  ================================
  REQUIRED FIELDS
  ================================
  */

  if (!exercise.question) {
    return false;
  }

  if (!exercise.correctAnswer) {
    return false;
  }

  /*
  ================================
  OPTIONS VALIDATION
  ================================
  */

  if (
    !Array.isArray(exercise.options)
  ) {
    return false;
  }

  if (
    exercise.options.length !== 4
  ) {
    return false;
  }

  /*
  ================================
  EMPTY OPTIONS
  ================================
  */

  const hasEmptyOption =
    exercise.options.some(
      (option) =>
        !option ||
        typeof option !== "string"
    );

  if (hasEmptyOption) {
    return false;
  }

  /*
  ================================
  UNIQUE OPTIONS
  ================================
  */

  const uniqueOptions = new Set(
    exercise.options.map((option) =>
      option.trim().toLowerCase()
    )
  );

  if (uniqueOptions.size !== 4) {
    return false;
  }

  /*
  ================================
  CORRECT ANSWER EXISTS
  ================================
  */

  const correctAnswerExists =
    exercise.options.includes(
      exercise.correctAnswer
    );

  if (!correctAnswerExists) {
    return false;
  }

  return true;
};