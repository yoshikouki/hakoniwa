import { fibonacciGenerator, fibonacciRatio } from "./fibonacci";

async function main() {
  const fibonacci = fibonacciGenerator();
  let count = 1;
  let prev = 0;

  console.log(`Count\t${"Fibonacci".padStart(20, " ")}\tRatio`);
  const timer = setInterval(() => {
    const { value, done } = fibonacci.next();
    if (done) {
      clearInterval(timer);
      return;
    }
    const ratio = fibonacciRatio(prev, value);

    const countStr = count.toString().padStart(5, " ");
    const fibStr = value.toString().padStart(20, " ");
    const ratioStr = ratio.toString().padEnd(20, " ");
    console.log(`${countStr}\t${fibStr}\t${ratioStr}`);

    prev = value;
    count++;
  }, 1000);
}

main();
