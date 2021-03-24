import path, { extname } from 'path';
import { load } from 'js-yaml';
import fs from 'fs';

const getFilepathAbs = (filepath) => {
  if (filepath[0] === '.' && (filepath[1] === '.' || filepath[1] === '/')) {
    return path.resolve(process.cwd(), filepath);
  }
  return filepath;
};

const parseObjToArr = (operator, obj) => Object.keys(obj)
  .map((el) => ({ oper: operator, prop: el, value: obj[el] }));

const parse = (operator, filepath) => {
  const data = fs.readFileSync(getFilepathAbs(filepath), 'utf8');
  const type = extname(filepath);
  if (type === '.json') return parseObjToArr(operator, JSON.parse(data));
  if (type === '.yml') return parseObjToArr(operator, load(data));
  return [];
};

export default parse;
