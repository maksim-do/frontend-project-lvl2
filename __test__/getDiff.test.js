import getDiff from '../src/getDiff'

test('get diff json', () => {
  const result = getDiff('./__test__/fixture/1.json', './__test__/fixture/2.json')
  expect(result).toBe(
`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`
  );
});