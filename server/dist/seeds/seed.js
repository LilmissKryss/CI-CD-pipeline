import db from "../config/connection.js";
import Question from "../models/Question.js";
import cleanDB from "./cleanDb.js";
// Use dynamic import for JSON files to avoid import assertion issues
const pythonQuestionsModule = await import("./pythonQuestions.json", {
    assert: { type: "json" },
});
const pythonQuestions = pythonQuestionsModule.default;
db.once("open", async () => {
    await cleanDB("Question", "questions");
    await Question.insertMany(pythonQuestions);
    console.log("Questions seeded!");
    process.exit(0);
});
//# sourceMappingURL=seed.js.map