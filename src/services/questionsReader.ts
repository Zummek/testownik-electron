import fs from 'fs';
import { promisify } from 'util';

import encodingDetector from './encodingDetector';

const windows1250 = require('windows-1250');

const readFileAsync = promisify(fs.readFile);

function decodeBuffer(textBuffer: any) {
  if (encodingDetector.isUTF8(textBuffer)) {
    return textBuffer.toString('utf-8');
  }
  const binary = textBuffer.toString('binary');
  return windows1250.decode(binary);
}

function getLinkToImage(line: any) {
  return line.split('[img]').pop().split('[/img]').shift();
}

function readXQuestion(quizPath: any, filename: any, lines: any) {
  const correctAnswers = lines[0].trim().substring(1).split('').map((char: any, index: any) => ({ char, index }))
    .filter((i: any) => i.char === '1')
    .map((i: any) => i.index);
  const questionType = lines[1].trim().startsWith('[img]') ? 'image' : 'text';
  const questionContent = questionType === 'image' ? getLinkToImage(lines[1]) : lines[1];
  const answers = lines.slice(2).filter((l: any) => l.replace(/^\s*/, '').replace(/\s*$/, '').length !== 0).map((line: any, index: any) => {
    // eslint-disable-next-line no-param-reassign
    line = line.trim();
    return {
      id: index,
      type: line.startsWith('[img]') ? 'image' : 'text',
      content: line.startsWith('[img]') ? getLinkToImage(line) : line,
      isCorrect: correctAnswers.findIndex((i: any) => i === index) !== -1
    };
  });
  const question = {
    tag: filename,
    contentType: questionType,
    content: questionContent,
    type: 'single',
    answers
  };
  return question;
}

function getYQuestionContent(line: any, numberOfSelects: any) {
  const a = line.split(/({wybór [1-9][0-9]*})/);
  const content = a.map((l: any) => {
    if (l.match(/{wybór [1-9][0-9]*}/)) {
      return {
        selectId: parseInt(l.replace('{wybór ', '').replace('}', ''), 10) - 1,
        visibleContent: ''
      };
    }
    return l;
  });
  return content;
}

function readYQuestion(quizPath: string, filename: string, lines: any) {
  const correctAnswersOfSelects = lines[0].trim().substring(2).split('').map((char: any) => parseInt(char, 10) - 1);

  const questionType = lines[1].trim().startsWith('[img]') ? 'image' : 'text';
  const questionContent = getYQuestionContent(lines[1], lines[0].trim().substring(1, 1));
  const answers = lines.slice(2).filter((l: any) => l.replace(/^\s*/, '').replace(/\s*$/, '').length !== 0).map((line: any, selectIndex: any) => {
    const options = line.trim().split(';;').filter((x: any) => x);
    const correctOptionId = correctAnswersOfSelects[selectIndex];
    return {
      id: selectIndex,
      correctOptionId,
      options: options.map((o: string, answerIndex: number) => ({
        id: answerIndex,
        type: o.startsWith('[img]') ? 'image' : 'text',
        content: o.startsWith('[img]') ? getLinkToImage(o) : o,
        isCorrect: correctOptionId === answerIndex
      }))
    };
  });
  const question = {
    tag: filename,
    contentType: questionType,
    content: questionContent,
    type: 'select',
    answers
  };
  return question;
}

function getQuestionFromBuffer(textBuffer: Buffer, quizPath: string, filename: string) {
  const text = decodeBuffer(textBuffer);
  const lines = text.split('\n');
  const firstLine = lines[0].trim();
  if (firstLine.startsWith('X')) {
    return readXQuestion(quizPath, filename, lines);
  }
  return readYQuestion(quizPath, filename, lines);
}

export default {
  async readFilesFromFolder(quizPath: any, files: any) {
    const getQuestionFromFile = async (filename: any) => {
      const textBuffer = await readFileAsync(`${quizPath}/${filename}`);
      return getQuestionFromBuffer(textBuffer, quizPath, filename);
    };

    const questionPromises = files
      .filter((filename: string) => filename.endsWith('.txt'))
      .map(getQuestionFromFile);

    return Promise.all(questionPromises).then(qs => qs.filter(q => q !== null));
  }
};
