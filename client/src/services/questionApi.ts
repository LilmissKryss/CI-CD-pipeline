import type { Question } from "../models/Question.js";

export const getQuestions = async (): Promise<Question[]> => {
  try {
    console.log("Client: Fetching questions from /api/questions/random");
    const response = await fetch("/api/questions/random");

    console.log("Client: Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        "Client: Server returned error:",
        response.status,
        errorText
      );
      throw new Error(
        `Network response was not ok: ${response.status} ${errorText}`
      );
    }

    const data: Question[] = await response.json();
    console.log("Client: Received data:", data);
    return data;
  } catch (error) {
    console.error("Client: Failed to fetch questions:", error);
    throw error;
  }
};
