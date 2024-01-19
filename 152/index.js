const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function calculateOperations(n) {
  const dp = new Array(n + 1).fill(Infinity);
  dp[1] = 0;

  for (let i = 1; i <= n; i++) {
    if (i * 2 <= n) {
      dp[i * 2] = Math.min(dp[i * 2], dp[i] + 1);
    }
    if (i * 3 <= n) {
      dp[i * 3] = Math.min(dp[i * 3], dp[i] + 1);
    }
    if (i + 1 <= n) {
      dp[i + 1] = Math.min(dp[i + 1], dp[i] + 1);
    }
  }

  const operations = [];
  let current = n;

  while (current > 1) {
    operations.unshift(current);
    if (current % 2 === 0 && dp[current / 2] === dp[current] - 1) {
      current /= 2;
    } else if (current % 3 === 0 && dp[current / 3] === dp[current] - 1) {
      current /= 3;
    } else {
      current -= 1;
    }
  }

  operations.unshift(1);

  return operations;
}

rl.on('', (input) => {
  const num = parseInt(input);

  const result = calculateOperations(num);

  console.log(result.length - 1);
  console.log(result.join(' '));

  rl.close();
});
