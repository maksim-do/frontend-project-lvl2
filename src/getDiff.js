import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getFilepathAbs = (filepath) => {
  if (filepath[0] === '.' && (filepath[1] === '.' || filepath[1] === '/')) {
    return path.resolve(process.cwd(), filepath);
  }
  return filepath;
};

const parseObjToArr = (operator, obj) => Object.keys(obj)
  .map((el) => ({ oper: operator, prop: el, value: obj[el] }));

const compare = (arr1, arr2) => {
  const intersection = _
    .intersectionWith(arr1, arr2, (a, b) => a.prop === b.prop && a.value === b.value)
    .map((el) => ({ ...el, oper: ' ' }));
  const modifedArr1 = _.xorBy(arr1, intersection, 'prop');
  const modifedArr2 = _.xorBy(arr2, intersection, 'prop');
  const result = _.sortBy([...modifedArr1, ...modifedArr2, ...intersection], (el) => el.prop);
  return result;
};

const getSentence = (arr) => {
  const firstStr = '{\n';
  const lastStr = '}';
  const bodyAnswer = arr.map(({ oper, prop, value }) => `  ${oper} ${prop}: ${value}\n`);
  return [firstStr, ...bodyAnswer, lastStr].join('');
};

export default (filepatch1, filepatch2) => {
  if (!filepatch1 || !filepatch2) return 'Not attribut';
  const obg1 = fs.readFileSync(getFilepathAbs(filepatch1), 'utf8');
  const obg2 = fs.readFileSync(getFilepathAbs(filepatch2), 'utf8');

  const a = compare(parseObjToArr('-', JSON.parse(obg1)), parseObjToArr('+', JSON.parse(obg2)));
  return getSentence(a);
};
