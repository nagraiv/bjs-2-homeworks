function parseCount(value) {
    const result = Number.parseFloat(value);
    if (Number.isNaN(result)) {
        throw new Error("Невалидное значение");
    }
    return result;
}

function validateCount(goodsQuantity) {
    try {
        return parseCount(goodsQuantity);
    } catch (error) {
        return error;
    }
}

class Triangle {
    constructor(a, b, c) {
        this.sides = [a, b, c].sort((x, y) => x - y);
        if (this.sides[0] + this.sides[1] < this.sides[2]) {
            throw new Error('Треугольник с такими сторонами не существует');
        }
    }

    get perimeter() {
        return this.sides.reduce((acc, el) => acc + el, 0);
    }

    get area() {
        const p = this.perimeter / 2;
        // формула Герона через reduce
        const s = Math.sqrt(this.sides.reduce((acc, el) => acc * (p - el), p));
        return +s.toFixed(3);
    }
}

function getTriangle(a, b, c) {
    try {
        return new Triangle(a, b, c);
    } catch (e) {
        return {
            get perimeter() {
                return 'Ошибка! Треугольник не существует';
            },
            get area() {
                return 'Ошибка! Треугольник не существует';
            },
        };
    }
}

