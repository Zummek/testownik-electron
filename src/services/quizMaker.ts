import fs from 'fs';
import { promisify } from 'util';

import store from '../store';

const readFileAsync = promisify(fs.readFile);

export default {
  prepareQuizObject(questions: any, location: any) {
    const quiz = {
      location: location.replace(/\\/g, '/'),
      numberOfQuestions: questions.length,
      numberOfLearnedQuestions: 0,
      numberOfCorrectAnswers: 0,
      numberOfBadAnswers: 0,
      time: 0,
      reoccurrences: questions.map((q: any) => ({
        tag: q.tag,
        value: store.state.reoccurrencesOnStart
      })),
      questions
    };
    return quiz;
  },
  async prepareQuizObjectWithSave(questions: any, location: any) {
    const quizString = await readFileAsync(`${location}/save.json`, 'utf8');
    const quiz = JSON.parse(quizString);
    quiz.questions = questions;
    quiz.location = location;
    return quiz;
  }
};
