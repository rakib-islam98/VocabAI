export const submitFeedback = async (data) => {
  const response = await fetch(
    "https://formspree.io/f/mojbzzvl",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to submit feedback");
  }

  return response.json();
};