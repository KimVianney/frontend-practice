let buffer = "0"; 
let runningTotal = 0;
let previousOp = null;
const screen = document.querySelector('.screen');

function buttonClick (value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    render();
}

function handleNumber(number) {
    if (buffer === '0') {
        buffer = number;
    } else {
        buffer += number;
    }
} 

function flushOperation(intBuffer) {
    if (previousOp === '+') {
        runningTotal += intBuffer;
    } else if (previousOp === '-') {
        runningTotal -= intBuffer;
    } else if (previousOp === 'x') {
        runningTotal *= intBuffer;
    } else if (previousOp === '/') {
        runningTotal /= intBuffer; 
    }

}

function handleMath(value) {
    if (buffer === '0') {
        // do nothing
        return;
    }

    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOp = value;
    buffer = '0';
}



function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            break;
        case '=':
            if (previousOp === null) {
                // need numbers to do math
                return;
            }
            flushOperation(parseInt(buffer));
            previousOp = null;
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;
        case '<':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length-1);
            }
            break;
        case '+':
        case '-':
        case '/':
        case 'x':
            handleMath(symbol);
            break;
    }
}

function init() {
    document
    .querySelector('.keypad')
    .addEventListener("click", (e) => {
        buttonClick(e.target.innerText);
    })
}

function render(){
    screen.innerText = buffer;
}

init()