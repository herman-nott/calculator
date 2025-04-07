let memoryVariable = 0;

engButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const func = btn.getAttribute('data-func');
        const currentValue = result_output === '' ? '0' : result_output; // handle pesky zeroes

        switch (func) {
            case 'math-pow': {
                const operatorSymbol = '^';
                
                if (hasCalculated) {
                    history_cache = result_output + operatorSymbol;
                    hasCalculated = false;
                } else if (currentOperator && isEnteringNumber) {
                    history_cache += result_output + operatorSymbol;
                } else if (currentOperator) {
                    history_cache = history_cache.slice(0, -1) + operatorSymbol;
                } else {
                    history_cache = currentValue + operatorSymbol;
                }
                
                currentOperator = '^';
                isEnteringNumber = false;
                historyField.textContent = history_cache;
                break;
            }
            
            case 'math-sqrt':
                if (currentValue === '0') {
                    historyField.innerHTML = '√0';
                    result_output = '0';
                } else {
                    historyField.innerHTML = '√' + currentValue;
                    let result = Math.sqrt(parseFloat(currentValue));
                    result = Math.round(result * 1000) / 1000;
                    result_output = String(result);
                }
                outputField.textContent = formatNumber(result_output);
                hasCalculated = true;
                break;

            case 'math-rev':
                historyField.textContent = formatNumber("1/" + result_output);
                result_output = String(1 / Number(result_output));
                outputField.textContent = formatNumber(result_output);
                break;

            case 'math-module':
                historyField.textContent = '|' + currentValue + '|';
                result_output = String(Math.abs(parseFloat(currentValue)));
                outputField.textContent = formatNumber(result_output);
                hasCalculated = true;
                break;

            case 'math-factorial':
                let factorialVariable = 1;
                historyField.textContent = formatNumber(currentValue + '!');
                for (let i = 1; i <= Number(result_output); i++) {
                    factorialVariable *= i;
                }
                result_output = String(factorialVariable);
                outputField.textContent = formatNumber(result_output);
                break;

            case 'memory-clear':
                memoryVariable = 0;
                break;

            case 'memory-result':
                result_output = String(parseFloat(memoryVariable));
                outputField.textContent = formatNumber(result_output);
                break;

            case 'memory-add':
                memoryVariable += Number(result_output);
                hasCalculated = true;
                isEnteringNumber = false;
                break;

            case 'memory-sub':
                memoryVariable -= Number(result_output);
                hasCalculated = true;
                isEnteringNumber = false;
                break;

            case 'math-markup': {
                if (!currentOperator || result_output === '') break;

                const cost = parseFloat(history_cache
                    .replace(/,/g, '')
                    .replace(/[+\-×÷^]$/, ''));
                const value = parseFloat(result_output.replace(/,/g, ''));
            
                let result;
                switch (currentOperator) {
                    case '÷':
                        result = cost / (1 - value / 100);
                        break;
                    case '-':
                        result = ((cost - value) / value) * 100;
                        break;
                    case '+':
                        result = cost * (1 + value / 100);
                        break;
                    case '×':
                        result = cost * (1 - value / 100);
                        break;
                    default:
                        outputField.textContent = 'ERROR';
                        return;
                }
                result = Math.round(result * 100) / 100;
            
                outputField.textContent = formatNumber(String(result));
                historyField.textContent = formatNumber(history_cache + result_output + 'MU');
                hasCalculated = true;
                result_output = String(result);
                currentOperator = '';
                break;
            }

            default:
                break;
        }
    });
});
