class Calculator {
  constructor(previousTextElement, currentTextElement) {
    this.previousTextElement = previousTextElement;
    this.currentTextElement = currentTextElement;
    this.clear();
  }
  clear() {
    this.current = "";
    this.previous = "";
    this.operation = undefined;
  }

  appendNumber(number) {
    if (number === "." && this.current.includes(".")) return;
    this.current = this.current.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.current === "") return;
    if (this.previous !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previous = this.current;
    this.current = "";
  }

  compute() {
    let result;
    const prev = parseFloat(this.previous);
    const curr = parseFloat(this.current);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case "+":
        result = prev + curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "x":
        result = prev * curr;
        break;
      case "/":
        result = prev / curr;
        break;
      case "^":
        result = prev ** curr;
        break;
      default:
        return;
    }
    this.current = result;
    this.operation = undefined;
    this.previous = "";
  }
  getDisplayNumber(number){
      const stringNumber=number.toString()
      const integerDigits=parseFloat(stringNumber.split('.')[0])
      const decimalDigits=stringNumber.split('.')[1]
      console.log(decimalDigits)
      let integerDisplay
      if(isNaN(integerDigits)){
          integerDisplay=''
      } else{
          integerDisplay=integerDigits.toLocaleString('en',{
              maximumFractionDigits:0})
      }
      if (decimalDigits !=null){
          return `${integerDisplay}.${decimalDigits}`
      } else {
          return integerDisplay
      }
  }

  change(){
    let result;
    const curr = parseFloat(this.current);
    if (isNaN(curr)) return;
    result=curr*-1
    this.current = result;
  }

  percentage(){
    let result;
    const curr = parseFloat(this.current);
    if (isNaN(curr)) return;
    result=curr/100
    this.current = result;
  } 

  updateDisplay() {
    this.currentTextElement.innerText = this.getDisplayNumber(this.current);
    if (this.operation != null) {
      this.previousTextElement.innerText = `${this.getDisplayNumber(this.previous)} ${this.operation}`;
    }else {
        this.previousTextElement.innerText=''
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equal]");
const changeButton = document.querySelector("[data-change]");
const percButton = document.querySelector("[data-perc]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousTextElement = document.querySelector("[data-previous]");
const currentTextElement = document.querySelector("[data-current]");

const calculator = new Calculator(previousTextElement, currentTextElement);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});
equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});
allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});
changeButton.addEventListener("click", (button) => {
    calculator.change();
    calculator.updateDisplay();
  });
percButton.addEventListener("click", (button) => {
    calculator.percentage();
    calculator.updateDisplay();
});
addEventListener('keypress',(key)=>{
    if (isNaN(key.key)) return
    calculator.appendNumber(key.key);
    calculator.updateDisplay();
})