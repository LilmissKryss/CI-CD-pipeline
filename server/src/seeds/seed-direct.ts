import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import db from "../config/connection.js";
import Question from "../models/Question.js";
import cleanDB from "./cleanDb.js";

// Get the directory name using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the JSON file directly
const pythonQuestionsPath = path.join(__dirname, 'pythonQuestions.json');
const pythonQuestionsRaw = fs.readFileSync(pythonQuestionsPath, 'utf8');
const pythonQuestions = JSON.parse(pythonQuestionsRaw);

db.once('open', async () => {
  try {
    console.log('Connected to MongoDB. Seeding database...');
    
    // Clean the database
    await cleanDB('Question', 'questions');
    console.log('Database cleaned');
    
    // Insert the questions
    console.log(`Inserting ${pythonQuestions.length} questions...`);
    await Question.insertMany(pythonQuestions);
    
    console.log('Questions seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
});
