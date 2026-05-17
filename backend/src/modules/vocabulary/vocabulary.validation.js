export const validateAddVocabulary = (data) => {
  const { word, meaning } = data;

  if (!word || !meaning) {
    return "Word and meaning are required";
  }

  return null;
};