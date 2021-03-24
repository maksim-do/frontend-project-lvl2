import _ from 'lodash';
import parse from './parsers.js';

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
  const difference = compare(parse('-', filepatch1), parse('+', filepatch2));
  return getSentence(difference);
};
