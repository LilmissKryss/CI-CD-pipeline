// import question model
import Question from "../models/Question.js";
// gets a set of random questions
export const getRandomQuestions = async (_req, res) => {
    try {
        console.log("Fetching random questions...");
        // First check if there are any questions in the database
        const count = await Question.countDocuments();
        console.log(`Found ${count} questions in the database`);
        if (count === 0) {
            console.log("No questions found in the database");
            return res
                .status(404)
                .json({ message: "No questions found in the database" });
        }
        const questions = await Question.aggregate([
            { $sample: { size: Math.min(count, 10) } },
            { $project: { __v: 0 } },
        ]);
        console.log(`Returning ${questions.length} random questions`);
        return res.status(200).json(questions);
    }
    catch (err) {
        console.error("Error fetching questions:", err);
        return res.status(500).json({ error: err.message });
    }
};
//# sourceMappingURL=questionController.js.map