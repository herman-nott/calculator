const calcButtons = document.querySelectorAll('.calc-btn');
let result_output = outputField.textContent;
let history_cache = historyField.textContent;

let currentOperator = '';
let lastInput = '';
let hasCalculated = false;
let isEnteringNumber = false;

calcButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const func = btn.getAttribute('data-func');

        if (func.startsWith('num-')) {
            const digit = func.split('-')[1];
            
            if (hasCalculated) {
                history_cache = ' ';
                historyField.textContent = ' ';
                result_output = digit;
                hasCalculated = false;
                isEnteringNumber = true;
            } else if (!isEnteringNumber || result_output === '0') {
                result_output = digit;
                isEnteringNumber = true;
            } else {
                result_output += digit;
            }
            
            outputField.textContent = formatNumber(result_output);
            return;
        }

        switch (func) {
            case 'math-clear':
                if (result_output !== '0' && result_output !== '') {
                    result_output = '0';
                    outputField.textContent = '0';
                    isEnteringNumber = false;
                } else {
                    historyField.textContent = ' ';
                    history_cache = ' ';
                    result_output = '0';
                    outputField.textContent = '0';
                    currentOperator = '';
                    hasCalculated = false;
                    isEnteringNumber = false;
                }
                break;
                
            case 'change-symb':
                result_output = String(-parseFloat(result_output));
                outputField.textContent = formatNumber(result_output);
                break;
                
            case 'symb-point':
                if (!result_output.includes('.')) {
                    result_output += result_output === '' ? '0.' : '.';
                    outputField.textContent = formatNumber(result_output);
                    isEnteringNumber = true;
                }
                break;
                
            case 'math-perc':
                result_output = String(parseFloat(result_output) / 100);
                outputField.textContent = formatNumber(result_output);
                break;

            case 'math-add':
            case 'math-sub':
            case 'math-mult':
            case 'math-div': {
                const operatorMap = {
                    'math-add': '+',
                    'math-sub': '-',
                    'math-mult': '×',
                    'math-div': '÷',
                    'math-pow': '^'
                };
                const operatorSymbol = operatorMap[func];

                if (hasCalculated) {
                    history_cache = result_output + '' + operatorSymbol;
                    hasCalculated = false;
                } else if (currentOperator && isEnteringNumber) {
                    history_cache += '' + result_output + '' + operatorSymbol;
                } else if (currentOperator) {
                    history_cache = history_cache.slice(0, -1) + operatorSymbol;
                } else {
                    history_cache = result_output + '' + operatorSymbol;
                }
                
                currentOperator = operatorSymbol;
                isEnteringNumber = false;
                historyField.textContent = formatNumber(history_cache);
                break;
            }
            
            case 'math-result':
                if (currentOperator && history_cache) {
                    try {
                        let result;
                        if (currentOperator === '^') {
                            const parts = history_cache.split('^');
                            const base = parts[0].replace(/,/g, '');
                            const exponent = result_output.replace(/,/g, '');
                            result = Math.pow(Number(base), Number(exponent));
                        } else {
                            const fullExpression = history_cache + ' ' + result_output;
                            const cleanExpr = fullExpression
                                .replace(/,/g, '')
                                .replace(/×/g, '*')
                                .replace(/÷/g, '/');
                            result = eval(cleanExpr);
                        }
                        result = Math.round(result * 1000000000000) / 1000000000000;
                        
                        outputField.textContent = formatNumber(String(result));
                        historyField.textContent = formatNumber(
                            history_cache.replace(/,/g, '') + 
                            result_output.replace(/,/g, ''));
                        
                        hasCalculated = true;
                        result_output = String(result);
                        currentOperator = '';
                    } catch (e) {
                        outputField.textContent = 'ERROR';
                    }
                } else if (result_output !== '') {
                    historyField.textContent = formatNumber(result_output);
                    outputField.textContent = formatNumber(result_output);
                    hasCalculated = true;
                }
                break;
        }
    });
});

function formatNumber(input) {
    if (input === '') return '0';

    const hasTrailingDot = input.endsWith('.');
    const parts = input.split(/([+\-×÷^])/g);

    const formatted = parts.map(part => {
        if (/^\d+(\.\d+)?$/.test(part) || /^\d+\.$/.test(part)) {
            const [intPart, decPart] = part.split('.');
            const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

            if (hasTrailingDot && part === input) {
                return formattedInt + '.';
            }

            return decPart !== undefined ? `${formattedInt}.${decPart}` : formattedInt;
        } else {
            return part;
        }
    });

    return formatted.join('');
}
