const conversionRates = {
    length: {
        cm: 0.01,
        m: 1,
        km: 1000,
        in: 0.0254,
        ft: 0.3048,
        mi: 1609.34
    },
    mass: {
        mg: 0.000001,
        g: 0.001,
        kg: 1,
        lb: 0.453592,
        oz: 0.0283495
    },
    area: {
        cm2: 0.0001,
        m2: 1,
        km2: 1_000_000,
        in2: 0.00064516,
        ft2: 0.092903
    }
};

function convertValue() {
    const category = document.getElementById('unit-category').value;
    const fromValueField = parseFloat(document.getElementById('from-value').value);
    const fromUnit = document.getElementById('from-unit').value;
    const toUnit = document.getElementById('to-unit').value;
    const toValueField = document.getElementById('to-value');

    if (isNaN(fromValueField)) {
        toValueField.value = '';
        return;
    }

    const rates = conversionRates[category];

    if (!(fromUnit in rates) || !(toUnit in rates)) {
        toValueField.value = 'Invalid units';
        return;
    }

    let baseValue = fromValueField * rates[fromUnit];
    let result = baseValue / rates[toUnit];

    toValueField.value = result.toFixed(5);
}

document.getElementById('from-value').addEventListener('input', convertValue);
document.getElementById('from-unit').addEventListener('change', convertValue);
document.getElementById('to-unit').addEventListener('change', convertValue);
document.getElementById('unit-category').addEventListener('change', convertValue);

const fromValueInput = document.getElementById('from-value');
const toValueInput = document.getElementById('to-value');
const buttons = document.querySelectorAll('.calc-btn');

buttons.forEach(button => {
    const func = button.getAttribute('data-func');

    if (!func) {
        return;
    }

    if (func.startsWith('num-')) {
        const digit = func.split('-')[1];
        button.addEventListener('click', () => {
            if (fromValueInput.value === '0' || fromValueInput.value === '') {
                fromValueInput.value = digit;
            } else {
                fromValueInput.value += digit;
            }
            convertValue();
        });
    }

    if (func === 'symb-point') {
        button.addEventListener('click', () => {
            if (!fromValueInput.value.includes('.')) {
                fromValueInput.value += '.';
                convertValue();
            }
        });
    }

    if (func === 'change-symb') {
        button.addEventListener('click', () => {
            if (fromValueInput.value.startsWith('-')) {
                fromValueInput.value = fromValueInput.value.slice(1);
            } else if (fromValueInput.value !== '0' && fromValueInput.value !== '') {
                fromValueInput.value = '-' + fromValueInput.value;
            }
            convertValue();
        });
    }

    if (func === 'math-clear') {
        button.addEventListener('click', () => {
            fromValueInput.value = '0';
            toValueInput.value = '';
        });
    }
});