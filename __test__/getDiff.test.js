import getDiff from '../src/getDiff';

const result1 = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('get diff json', () => {
  const result = getDiff('./__test__/__fixture__/1.json', './__test__/__fixture__/2.json');
  expect(result).toBe(result1);
});

test('get diff yml', () => {
  const result = getDiff('./__test__/__fixture__/1.yml', './__test__/__fixture__/2.yml');
  expect(result).toBe(result1);
});
