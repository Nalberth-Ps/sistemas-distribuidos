// tests/example.test.ts

import { greet } from '../src/components/Greeting';

test('greet returns the correct greeting message', () => {
  expect(greet('World')).toBe('Hello, World!');
});
