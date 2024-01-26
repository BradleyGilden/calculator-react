
export default function calcMath(inpt) {
  // remove spaces and trailing newlines
  let calculation = mergeDecimals(inpt);
  calculation = cleanup(calculation);
  calculation = filterOperations(calculation);
  calculation = bodmas(calculation);
  return calculation;
}

/**
 * mergeDecimals - merges all number and decimal groups into potential floating points
 * @param {String} ipt - calculation string 
 * @returns list representation of calculation string with merged decimals
 */
function mergeDecimals(ipt) {
  let result = [];
  let currentNumber = '';
  
  for (let char of ipt) {
      // Check if the character is a digit, a dot (for floats), or a minus sign (for negative floats)
      if (/[0-9.]/.test(char)) {
          currentNumber += char;
      } else {
          // If the currentNumber is not empty, add it to the result as a float
          if (currentNumber !== '') {
              result.push(currentNumber);
              currentNumber = ''; // Reset the currentNumber
          }
          
          // Add the non-digit character to the result
          result.push(char);
      }
  }
  
  // If there's a remaining number at the end of the inputString, add it to the result
  if (currentNumber !== '') {
      result.push(currentNumber);
  }
  
  return result
}

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
    // eslint-disable-next-line no-unsafe-finally
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
  const operations = ["/", "*"];
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
  for (let i = 0; i < calc.length && (calc.includes('+') || calc.includes('-')); i++) {
    // if current index contains current operation
    if (calc[i] === '+' || calc[i] === '-') {
      calc.splice(i - 1, 3, calculate(calc[i - 1], calc[i], calc[i + 1]));
      // iterate back as to not miss the next operation
      i--;
    }
  }
  return calc[0];
}
