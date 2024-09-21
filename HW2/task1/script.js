function checkTriangleExistence(a, b, c) {
    if (a <= 0 || b <= 0 || c <= 0) {
        return "Стороны должны быть положительными числами.";
    }
    if (a + b > c && a + c > b && b + c > a) {
        return "Треугольник существует.";
    } else {
        return "Треугольник не существует.";
    }
}

function checkTriangle() {
    const side1 = parseFloat(document.getElementById("side1").value);
    const side2 = parseFloat(document.getElementById("side2").value);
    const side3 = parseFloat(document.getElementById("side3").value);
    const result = checkTriangleExistence(side1, side2, side3);
    document.getElementById("result").innerText = result;
}
