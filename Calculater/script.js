document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const historyList = document.getElementById('history-list');
    const moreOptions = document.getElementById('more-options');
    const historyPanel = document.getElementById('history');
    const clearHistoryButton = document.getElementById('clear-history');

    let currentInput = '';
    let history = [];
    let memory = 0; // Memory value

    // Function to update the display
    function updateDisplay(value) {
        display.value = value;
        currentInput = value;
    }

    // Function to append numbers to display
    window.appendNumber = function(number) {
        currentInput += number;
        updateDisplay(currentInput);
    };

    // Function to append operators to display
    window.appendOperator = function(operator) {
        if (currentInput.length > 0 && !isNaN(currentInput.slice(-1))) {
            currentInput += operator;
            updateDisplay(currentInput);
        }
    };

    // Function to calculate result
    window.calculate = function() {
        try {
            let result = eval(currentInput);
            let fullCalculation = currentInput + ' = ' + result;
            updateDisplay(result);
            history.push(fullCalculation);
            updateHistory();
            currentInput = result;
        } catch (e) {
            updateDisplay('Error');
        }
    };

    // Function to clear display
    window.clearDisplay = function() {
        updateDisplay('');
    };

    // Function to delete the last character
    window.deleteLast = function() {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput);
    };

    // Function to toggle more options
    window.toggleMoreOptions = function() {
        moreOptions.style.display = moreOptions.style.display === 'none' ? 'block' : 'none';
    };

    // Function to toggle history panel
    window.toggleHistory = function() {
        historyPanel.style.display = historyPanel.style.display === 'none' ? 'block' : 'none';
    };

    // Function to update history display
    function updateHistory() {
        historyList.innerHTML = '';
        history.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            historyList.appendChild(li);
        });
    }

    // Function to append scientific functions to display
    window.appendFunction = function(func) {
        currentInput += func + '(';
        updateDisplay(currentInput);
    };

    // Function to calculate square root
    window.calculateSqrt = function() {
        currentInput = 'Math.sqrt(' + currentInput + ')';
        calculate();
    };

    // Function to switch between light and dark mode
    const changeModeButton = document.getElementById('change-mode');
    changeModeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        changeModeButton.querySelector('i').className = isDarkMode ? 'fas fa-moon' : 'fas fa-sun'; // Change icon
    });

    // Memory Functions
    window.memoryAdd = function() {
        memory += parseFloat(display.value) || 0;
    };

    window.memorySubtract = function() {
        memory -= parseFloat(display.value) || 0;
    };

    window.memoryRecall = function() {
        updateDisplay(memory);
    };

    window.memoryClear = function() {
        memory = 0;
    };

    // Handle keyboard inputs
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        if (key >= '0' && key <= '9') {
            appendNumber(key);
        } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
            appendOperator(key);
        } else if (key === 'Enter' || key === '=') {
            event.preventDefault(); // Prevent default Enter key behavior
            calculate();
        } else if (key === 'Backspace') {
            event.preventDefault(); // Prevent default Backspace behavior
            deleteLast();
        } else if (key === 'Escape') {
            clearDisplay();
        } else if (key === 's') {
            appendFunction('Math.sin');
        } else if (key === 'c') {
            appendFunction('Math.cos');
        } else if (key === 't') {
            appendFunction('Math.tan');
        } else if (key === 'l') {
            appendFunction('Math.log');
        } else if (key === 'e') {
            appendFunction('Math.exp');
        } else if (key === 'r') {
            calculateSqrt();
        } else if (key === 'a') {
            appendFunction('Math.abs');
        } else if (key === 'p') {
            appendFunction('Math.pow');
        }
    });

    // Clear History Functionality
    clearHistoryButton.addEventListener('click', () => {
        history = [];
        updateHistory();
    });
});
