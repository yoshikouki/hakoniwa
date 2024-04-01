export function* fibonacciGenerator(): Generator<number> {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

export function fibonacciRatio(a: number, b: number): number {
  return b / a;
}
