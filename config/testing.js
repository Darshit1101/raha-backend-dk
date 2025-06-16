// Multiply all numbers using reduce
function multiply(...nums) {
  return nums.reduce((acc, curr) => acc * curr);
}

// Add all numbers using reduce
function sum(...nums) {
  return nums.reduce((acc, curr) => acc + curr);
}

// console.log('Sum =', sum(10, 2, 3));       
// console.log('Multiply =', multiply(1, 2, 3)); 