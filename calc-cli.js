#!/usr/bin/node

/**
 * calc-cli - The cli based version of the web calculator in nodejs
 * 
 * Author: Bradley Dillion Gilden
 * Date: 25-01-2024
 */

process.stdin.setEncoding("utf8");

console.log("Please enter calculation (press Ctrl+D or enter EOF to end):");

// continuosly read input from stdin
process.stdin.on("data", function (data) {
  // remove white spaces and newlines at the ends
  let calculation = data.trim();

  if (calculation === "exit" || calculation === "EOF") {
    process.stdin.emit("end");
  }
  // remove spaces and trailing newlines
  calculation = calculation.split(/\s+/);
  calculation = cleanup(calculation);
  calculation = filterOperations(calculation);
  calculation = bodmas(calculation);
  console.log(calculation);
});

process.stdin.on("end", function () {
  console.log("Good Bye !!! :)");
});

/*
 * cleanup - cleans up equation by converting the strings to ints and floats and
 * removes excess operators at the ends
 * Returns: list of int/float operands with trailing operations removed
 */
function cleanup(calculation) {
  let calc = calculation;
  let opCount = 0;
  const ignore = ["*", "+", "/", "-"];
  try {
    for (let i = 0; i < calc.length; i++) {
      // keep track on number of operations encountered so we can remove them later if theres excess
      if (ignore.includes(calc[i])) {
        opCount += 1;
      } else {
        opCount = 0;
      }
      // if a number is preceeded by a '-', make it negative
      if (calc[i] === "-" && !isNaN(calc[i + 1]) && isNaN(calc[i - 1])) {
        if (calc[i + 1].includes(".")) {
          calc.splice(i, 2, parseFloat(`-${calc[i + 1]}`));
        } else {
          calc.splice(i, 2, parseInt(`-${calc[i + 1]}`));
        }
        opCount = 0;
      } else if (ignore.includes(calc[i]) && i === 0) {
        // removes excess operators at start
        calc.splice(i, 1);
        // go back to first index and try again
        i--;
      } else if (ignore.includes(calc[i]) && i === calc.length - 1) {
        // removes excess operators at the end
        calc.splice(i - opCount + 1, opCount);
        break;
      } else if (!isNaN(calc[i])) {
        if (calc[i].includes(".")) {
          calc[i] = parseFloat(calc[i]);
        } else {
          calc[i] = parseInt(calc[i]);
        }
      } else if (isNaN(calc[i]) && !ignore.includes(calc[i])) {
        // handle invalid inputs
        throw new Error("Incorrect type");
      }
    }
  } catch (err) {
    console.log(err.message);
    calc = [];
  } finally {
    return calc;
  }
}

/**
 * filterOperations - if operations are entered in succession this function will determine the operations
 * that take the most precidence
 * precidence order= /, *, +, -
 * Returns: list of operands and filtered operations
 */
function filterOperations(calculation) {
  let opCount = 0;
  let highest = null;
  let calc = calculation;
  const operators = ["-", "+", "*", "/"];

  for (let i = 0; i < calc.length; i++) {
    if (operators.includes(calc[i])) {
      opCount++;
      // find operator of highest precidence for current consecutive sequence of operators
      highest =
        operators.indexOf(calc[i]) > operators.indexOf(highest)
          ? calc[i]
          : highest;
    } else {
      opCount = 0;
      highest = null;
    }
    if (highest && opCount > 1 && !isNaN(calc[i + 1])) {
      calc.splice(i - opCount + 1, opCount, highest);
      // reset operator count since a number is encountered next
      opCount = 0;
      highest = null;
    }
  }
  return calc;
}

/**
 * calculate - perform basic calculations
 * @param {int | float} n1  - first operand
 * @param {String} operation  - operation [+ , * , -, /]
 * @param {int | float} n2 - second operand
 */
function calculate(n1, operation, n2) {
  switch (operation) {
    case "-":
      return n1 - n2;
    case "+":
      return n1 + n2;
    case "*":
      return n1 * n2;
    case "/":
      return n1 / n2;
  }
}

/**
 * bodmas - performs calculations in order of basic bodmas operations
 */
function bodmas(calculation) {
  const operations = ["/", "*", "+", "-"];
  let calc = calculation;

  if (calc.length === 0) return "";
  // in order of bodmas operations
  for (let j of operations) {
    for (let i = 0; i < calc.length && calc.includes(j); i++) {
      // if current index contains current operation
      if (calc[i] === j) {
        calc.splice(i - 1, 3, calculate(calc[i - 1], calc[i], calc[i + 1]));
        // iterate back as to not miss the next operation
        i--;
      }
    }
  }
  return calc[0];
}
