function calculatePower() {
    const Y = Number(document.getElementById("inputY").value);
    const calculator = {
        base: Y - 2,
        power(y) {
            return Math.pow(this.base, y);
        }
    };
    const result = calculator.power(Y);
    document.getElementById("result").innerText = `Результат: ${result}`;
}
