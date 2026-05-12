// Three ways to sum to n

// Task

// Provide 3 unique implementations of the following function in JavaScript.

// Input: `n` - any integer

// *Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.

// Output: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.

// 1. Mathematical formula
// Idea: Uses Gauss’ summation formula: sum = n * (n + 1) / 2
function sum_to_n_1(n) {
  if (n <= 0) return 0;
  return (n * (n + 1)) / 2;
}
// O(1) time, O(1) space

// 2. Iterative solution (loop (Maybe for or while))
// Idea: Uses a loop to accumulate values from 1 to n.
function sum_to_n_2(n) {
  let sum = 0;

  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
}
// or
// function sum_to_n_2(n) {
//   let sum = 0;

//   while (n > 0) {
//     sum += n;
//     n--;
//   }

//   return sum;
// }
// O(n) time, O(1) space

// 3. Recursive solution
// Idea: Uses Recursive to auto calculate sum until n <= 1
function sum_to_n_3(n) {
  if (n <= 0) return 0;

  return n + sum_to_n_3(n - 1);
}
// O(n) time, O(n) space

// TEST CASE:
function test(fn, input, expected) {
  const result = fn(input);
  const pass = result === expected;

  console.log(
    `${pass ? "PASS" : "FAIL"} | input: ${input} | expected: ${expected} | got: ${result}`,
  );
}

// cases
test(sum_to_n_1, 5, 15);
test(sum_to_n_2, 5, 15);
test(sum_to_n_3, 5, 15);

test(sum_to_n_1, 10, 55);
test(sum_to_n_2, 10, 55);
test(sum_to_n_3, 10, 55);

test(sum_to_n_1, 0, 0);
test(sum_to_n_2, 0, 0);
test(sum_to_n_3, 0, 0);
