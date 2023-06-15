//-------------------------------------------Function Declarations-------------------------------------------
function ScaleUp(e){
    e.target.setAttribute('style','transform:scale(1,1);');
};

function ScaleDown(e){
    e.target.setAttribute('style','transform:scale(0.9,0.9);');
};

function KeyPressed(e){
    console.log(e.key);
}

function toFixedWithoutZeros(num, precision){
    return `${Number.parseFloat(num.toFixed(precision))}`;
}

function CheckForDecimal(obj){
    for(x of obj){
        if(x=='.'){
            return 1;
        }
    }
    return 0;
}

function noTwoDecimals(){
    if(calculator.Operator==''){
        if(!CheckForDecimal(calculator.Num1)){
            calculator.Num1 += '.';
            DispInput.textContent = calculator.Num1;
            return;
        }
        else{
            return
        }
    }
    else{
        if(!CheckForDecimal(calculator.Num2)){
            calculator.Num2+='.';
            DispInput.textContent = calculator.Num2;
            return;
        }
    }
}

function NumAssign(e){                               //function to store operand values and display them
    Op.forEach(element=>{
        element.addEventListener('click',OpAssign);
    })

    if(calculator.Operator == ''){
        calculator.Num1 = calculator.Num1 + (e.target.getAttribute('value'));
        DispInput.textContent = calculator.Num1;
    }
    else{
        calculator.Num2 = calculator.Num2 + e.target.getAttribute('value');
        DispInput.textContent = calculator.Num2;
    }
}

function OpAssign(e){                                  //function to store operator and perform operations
    if(e.target.getAttribute('value')=='='){
        if((calculator.Num1!='')&&(calculator.Num2!='')&&(calculator.Operator!='')){
            DispInput.textContent=+toFixedWithoutZeros(calculator.calculate(),5);
            DispOperator.textContent = '';
            DispStoredValue.textContent='';
            Digit.forEach(element=>{
                element.removeEventListener('click',NumAssign);
            })
            Op.forEach(element=>{
                element.removeEventListener('click',OpAssign);
            })
            Del.removeEventListener('click',Delete);

        }
    }
    else{
        if((calculator.Num1!='')&&(calculator.Num2!='')&&(calculator.Operator!='')){
            DispStoredValue.textContent=+toFixedWithoutZeros(calculator.calculate(),5);
            calculator.Num1=DispStoredValue.textContent;
            calculator.Num2 = '';
            calculator.Operator=e.target.getAttribute('value');
            DispInput.textContent='';
            DispOperator.textContent=e.target.getAttribute('value');
        }
        else{
            calculator.Operator = e.target.getAttribute('value');
            
            DispOperator.textContent=e.target.textContent;

        }
    }
}

function ClearAll(){                                            //function to clear previous operations
    calculator.Num1 = calculator.Num2 = calculator.Operator = '';
    DispInput.textContent = DispStoredValue.textContent=DispOperator.textContent = '';
    //calculator.Expression='';
    Digit.forEach(element=>{
        element.addEventListener('click',NumAssign);
    })
    Del.addEventListener('click',Delete);
}

function Delete(e){                                             //function to create a backspace like button
    if(calculator.Operator==''){
        calculator.Num1 = calculator.Num1.slice(0,calculator.Num1.length-1);
        DispInput.textContent = calculator.Num1;
        if(calculator.Num1.length==0&&calculator.Num2.length==0){
            Op.forEach(element=>{
                element.removeEventListener('click',OpAssign);
            })   
        }
    }
    else if(calculator.Operator!=''&&calculator.Num2!=''){
        calculator.Num2 = calculator.Num2.slice(0,calculator.Num2.length-1);
        DispInput.textContent = calculator.Num2;
    }
    else{
        calculator.Operator = '';
        DispOperator.textContent = calculator.Operator;
        if(calculator.Num1.length==0&&calculator.Num2.length==0){
            Op.forEach(element=>{
                element.removeEventListener('click',OpAssign);
            })   
        }
    }
}

//-------------------------------------------Variable Declarations------------------------------------------
let calculator = {
    Num1:'',
    Num2:'',
    Operator:'',
    //Expression:'',
    Add : function(){
        return (Number(this.Num1) + Number(this.Num2));
    },
    Sub : function(){
        return (Number(this.Num1) - Number(this.Num2));
    },
    Mul : function(){
        return (Number(this.Num1) * Number(this.Num2));
    },
    Div : function(){
        return (Number(this.Num1) / Number(this.Num2));
    },
    calculate: function(){
        switch(calculator.Operator){
            case '+':{
                return this.Add();
            }
            case '-':{
                return this.Sub();
            }
            case '*':{
                return this.Mul();
            }
            case '/':{
                return this.Div();
            }
        }

    }
}

const Buttons = document.querySelectorAll(".key, .clear, .delete");
const Digit = document.querySelectorAll('.number');
const Op = document.querySelectorAll('.operator');
const DispOperator = document.querySelector('.operation');
const DispInput = document.querySelector('.inputValue');
const DispStoredValue = document.querySelector('.storedValue');
const Reset = document.querySelector('.clear');
const Del = document.querySelector('.delete');
const Decimal = document.querySelector('.decimal');



//---------------------------------------------Event Listeners---------------------------------------------
window.addEventListener('keydown',KeyPressed);
Decimal.addEventListener('click',noTwoDecimals);

Buttons.forEach(element => {
    element.addEventListener('mousedown',ScaleDown);
    element.addEventListener('mouseup',ScaleUp);
});


Digit.forEach(element=>{
    element.addEventListener('click',NumAssign);
})


Reset.addEventListener('click',ClearAll);

Del.addEventListener('click',Delete);

