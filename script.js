let currentExpression = '';
const resultField = document.querySelector('.result');
const historyList = document.getElementById('historyList');
const historyPanel = document.getElementById('historyPanel');
const overlay = document.querySelector('.overlay');

// Load history from local storage
let history = JSON.parse(localStorage.getItem('calculatorHistory')) || [];

// Render history
function renderHistory() {
    historyList.innerHTML = '';
    history.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = entry;
        historyList.appendChild(listItem);
    });
}

renderHistory();

function appendValue(value) {
    if (resultField.value === '0' && value !== 'CE' && value !== 'C' && value !== '<-') {
        resultField.value = '';
    }
    if (value === 'CE') {
        currentExpression = currentExpression.replace(/[\d.]+$/, '');
    } else if (value === 'C') {
        currentExpression = '';
    } else if (value === '<-') {
        currentExpression = currentExpression.slice(0, -1);
    } else {
        currentExpression += value;
    }
    resultField.value = currentExpression || '0';
}

function clearHistory() {
    history = [];
    localStorage.removeItem('calculatorHistory');
    renderHistory();
}

function calculate() {
    const expression = currentExpression;
    const result = eval(expression);
    const historyEntry = `${expression} = ${result}`;
    if (expression !== '') {
        history.push(historyEntry);
        localStorage.setItem('calculatorHistory', JSON.stringify(history));
        renderHistory();
    }
    currentExpression = '';
    resultField.value = '0';
}

function toggleHistoryPanel() {
    historyPanel.style.display = historyPanel.style.display === 'none' ? 'block' : 'none';
    overlay.style.display = overlay.style.display === 'none' ? 'block' : 'none';
}

window.addEventListener('resize', function() {
    if (window.innerWidth >= 576) {
        historyPanel.style.display = 'block';
        overlay.style.display = 'none';
    }
});

overlay.addEventListener('click', function() {
    toggleHistoryPanel();
});
