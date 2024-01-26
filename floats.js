ipt = "3+5*6-2/4"
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
