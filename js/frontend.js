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
