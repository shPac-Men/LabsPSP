const changeBackgroundBtn = document.getElementById('changeBackgroundBtn');

let isDefaultBackground = true;

function changeBackground() {
    if (isDefaultBackground) {
        document.body.style.backgroundColor = '#666';
    } else {
        document.body.style.backgroundColor = '#f0f0f0';
    }
    isDefaultBackground = !isDefaultBackground;
}

changeBackgroundBtn.addEventListener('click', changeBackground);




// файл script.js
window.onload = function(){ 

    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null
    
    // окно вывода результата
    outputElement = document.getElementById("result")
    
    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')
    
    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                a += digit
            }
            outputElement.innerHTML = a
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                b += digit
                outputElement.innerHTML = b        
            }
        }
    }
    
    //устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });
    
    // установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return
        selectedOperation = 'x'
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return
        selectedOperation = '+'
        if (a!=='' && selectedOperation === '+'){
            a = ((+a) + (+b)).toString();
            b='';
        }
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return
        selectedOperation = '-'
        if (a!=='' && selectedOperation === '-'){
            a = ((+a) - (+b)).toString();
            b='';
        }
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return
        selectedOperation = '/'
    }
    document.getElementById("btn_op_moli").onclick = function() { 
        if (a === '') return
        selectedOperation = 'CO2'
    }
    document.getElementById("btn_op_percent").onclick = function(){
        if (a === '') return 
        selectedOperation = '%'
    }
    document.getElementById("btn_op_sign").onclick = function(){
        if (a !== '' && !selectedOperation){
            a = (-a).toString();
        }
        b = ''
        selectedOperation = null
        outputElement.innerHTML = a
    }
    document.getElementById("btn_op_cancel").onclick = function(){
        if (a !== '' && !selectedOperation){
            a = a.substring(0, a.length - 1);
        }
        b = ''
        selectedOperation = null
        outputElement.innerHTML = a
    }
    document.getElementById("btn_op_sqrt").onclick = function(){
        if( a!=='' && !selectedOperation){
            a = ((+a)**(1/2)).toString();
        }
        b = ''
        selectedOperation = null
        outputElement.innerHTML = a
    }
    document.getElementById("btn_op_square").onclick = function(){
        if( a!=='' && !selectedOperation){
            a = ((+a)**(2)).toString();
        }
        b = ''
        selectedOperation = null
        outputElement.innerHTML = a
    }
    document.getElementById("btn_op_fucktorial").onclick = function(){
        let temp = 1;
        if( a!=='' && !selectedOperation){
            for (let i =2; i <= (+a);i++){
                temp*=i;
            }
        }
        a = temp.toString();
        b = ''
        selectedOperation = null
        outputElement.innerHTML = a;
    }
    // document.getElementById("btn_op_moli").onclick = function(){
    //     if( a!=='' && b!=='' && !selectedOperation){
    //         let mol_mass = 12 + 2*16
    //         let n = (+a)/(mol_mass)
    //         a=n*8,314*(+b)/101325
    //     }
    //     b = ''
    //     selectedOperation = null
    //     outputElement.innerHTML = a
    // }

    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }
    
    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function() { 
        if (a === '' || b === '' || !selectedOperation)
            return
            
        switch(selectedOperation) { 
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
            case '%':
                expressionResult = (+a) /100 * (+b)
                break;
            case 'CO2':
                expressionResult = (+a) * (+b) * 0.0018648
                //expressionResult = (+b)
                break;
          
        }
        
        a = expressionResult.toString()
        b = ''
        selectedOperation = null
        outputElement.innerHTML = a
    }
    };