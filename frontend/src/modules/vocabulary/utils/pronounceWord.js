export const pronounceWord = (
  word
) => {
  if (!window.speechSynthesis) {
    return;
  }

  const utterance =
    new SpeechSynthesisUtterance(
      word
    );

  utterance.lang = "en-US";

  utterance.rate = 0.9;

  window.speechSynthesis.speak(
    utterance
  );
};