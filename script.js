document.addEventListener("DOMContentLoaded", function() {
    const display = document.querySelector('.zero');
    const buttons = document.querySelectorAll('button');
    let currentInput = '0';
    let previousInput = '';
    let operator = '';

    function updateDisplay() {
        display.textContent = currentInput;
    }

    function handleNumber(number) {
        if (currentInput === '0' || currentInput === '') {
            currentInput = number;
        } else {
            currentInput += number;
        }
        updateDisplay();
    }

    function handleOperator(op) {
        if (operator) {
            handleEquals();
        }
        operator = op;
        previousInput = currentInput;
        currentInput = '';
    }

    function handleEquals() {
        if (!operator || currentInput === '' || previousInput === '') return;
        let result;
        const prev = parseFloat(previousInput);
        const curr = parseFloat(currentInput);

        switch (operator) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '/':
                result = prev / curr;
                break;
            default:
                return;
        }
        currentInput = result.toString();
        operator = '';
        previousInput = '';
        updateDisplay();
    }

    function handleClear() {
        currentInput = '0';
        previousInput = '';
        operator = '';
        updateDisplay();
    }

    function handleDecimal() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
            updateDisplay();
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;
            if (button.classList.contains('num')) {
                handleNumber(value);
            } else if (button.classList.contains('plus') || button.classList.contains('minus') || 
                       button.classList.contains('times') || button.classList.contains('divide')) {
                handleOperator(value);
            } else if (button.classList.contains('equal')) {
                handleEquals();
            } else if (button.classList.contains('clear_button')) {
                handleClear();
            } else if (value === '.') {
                handleDecimal();
            }
        });
    });

    updateDisplay();
});
