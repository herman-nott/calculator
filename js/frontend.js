const dots = document.querySelector('.dots');
const sidebar = document.querySelector('.sidebar');
const menuItems = document.querySelectorAll('.link-text');
const engButtons = document.querySelectorAll('.engineering-button');
const calculatorContainer = document.querySelector('.calculator-container');

dots.addEventListener('click', () => {
    dots.classList.toggle('active');
    document.querySelector('.sidebar').classList.toggle('open');
});

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        if (item.textContent === 'Engineer Calculator') {
            engButtons.forEach(btn => btn.classList.remove('hidden'));
            calculatorContainer.classList.add('engineering-mode');
        } else {
            engButtons.forEach(btn => btn.classList.add('hidden'));
            calculatorContainer.classList.remove('engineering-mode');
        }

        sidebar.classList.remove('open');
        dots.classList.remove('active');
    });
});

const converter = document.querySelector('.converter');
const categoryContainer = document.querySelector('.converter-category');
const fromUnit = document.getElementById('from-unit');
const toUnit = document.getElementById('to-unit');
const fromValue = document.getElementById('from-value');
const toValue = document.getElementById('to-value');
const historyField = document.querySelector('.history-field');
const outputField = document.querySelector('.output-field');

document.querySelectorAll('.link-text').forEach(el => {
    el.addEventListener('click', (e) => {
        const text = e.target.textContent;
        if (text === 'Converter') {
            converter.classList.remove('hidden');
            categoryContainer.classList.remove('hidden');
            historyField.classList.add('hidden');
            outputField.classList.add('hidden');
        } else {
            converter.classList.add('hidden');
            categoryContainer.classList.add('hidden')
            historyField.classList.remove('hidden');
            outputField.classList.remove('hidden');
        }
    });
});

const units = {
    length: [
        { value: 'cm', label: 'cm' },
        { value: 'm', label: 'm' },
        { value: 'km', label: 'km' },
        { value: 'in', label: 'in' },
        { value: 'ft', label: 'ft' },
        { value: 'mi', label: 'mi' },
    ],
    mass: [
        { value: 'mg', label: 'mg' },
        { value: 'g', label: 'g' },
        { value: 'kg', label: 'kg' },
        { value: 'lb', label: 'lb' },
    ],
    area: [
        { value: 'cm2', label: 'cm²' },
        { value: 'm2', label: 'm²' },
        { value: 'km2', label: 'km²' },
        { value: 'in2', label: 'in²' },
        { value: 'ft2', label: 'ft²' },
    ]
};

const unitCategoryElement = document.getElementById('unit-category');
const fromUnitElement = document.getElementById('from-unit');
const toUnitElement = document.getElementById('to-unit');

function updateUnitOptions(category) {
    fromUnitElement.innerHTML = '';
    toUnitElement.innerHTML = '';

    units[category].forEach(unit => {
        const fromOption = document.createElement('option');
        fromOption.value = unit.value;
        fromOption.textContent = unit.label;

        const toOption = fromOption.cloneNode(true);

        fromUnitElement.appendChild(fromOption);
        toUnitElement.appendChild(toOption);
    });
}

unitCategoryElement.addEventListener('change', function () {
    updateUnitOptions(this.value);
});

updateUnitOptions(unitCategoryElement.value);