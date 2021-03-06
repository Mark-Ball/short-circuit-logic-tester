const falsyValues = [0, null, undefined, '', false, NaN];
const truthyValues = [1, 5, "\"hello\"", 7, 12, 23, "\"cat\"", "\"left\"", "\"right\"", "\"ok\"", true];
const trickValues = ["\"0\"", "\"null\"", "\"undefined\"", "\"false\"", "\"true\"", "\"zero\"", "[]", "{}"];

function randomFalsy() {
    return falsyValues[Math.floor(Math.random() * falsyValues.length)];
}

function randomTruthy() {
    return truthyValues[Math.floor(Math.random() * truthyValues.length)];
}

function randomTrick() {
    return trickValues[Math.floor(Math.random() * trickValues.length)];
}

// 50% &&, 50% ||
// 20% falsy vs falsy
// 20% falsy vs truthy
// 20% truthy vs falsy
// 20% truthy vs truthy
// 4% trick vs falsy
// 4% trick vs truthy
// 4% falsy vs trick
// 4% truthy vs trick
// 4% trick vs trick

class Question {
    constructor() {
        this.logicalOperator = Math.random() > 0.5 ? '&&' : '||';

        let randomType = Math.random();

        if (randomType <= 0.20) {
            this.left = randomFalsy();
            this.right = randomFalsy();
            // logic to prevent left and right from being the same
            while (this.left === this.right) {
                this.right = randomFalsy();
            }
        } else if (randomType <= 0.40) {
            this.left = randomFalsy();
            this.right = randomTruthy();
        } else if (randomType <= 0.60) {
            this.left = randomTruthy();
            this.right = randomFalsy();
        } else if (randomType <= 0.80) {
            this.left = randomTruthy();
            this.right = randomTruthy();
            while (this.left === this.right) {
                this.right = randomTruthy();
            }
        } else if (randomType <= 0.84) {
            this.left = randomTrick();
            this.right = randomFalsy();
        } else if (randomType <= 0.88) {
            this.left = randomTrick();
            this.right = randomTruthy();
        } else if (randomType <= 0.92) {
            this.left = randomFalsy();
            this.right = randomTrick();
        } else if (randomType <= 0.96) {
            this.left = randomTruthy();
            this.right = randomTrick();
        } else {
            this.left = randomTrick();
            this.right = randomTrick();
            while (this.left === this.right) {
                this.right = randomTrick();
            }
        }

        // logic to handle the empty string because an empty string renders as blank in html
        // if we have an empty string, we must put it inside another string to get it to render
        if (this.logicalOperator === '&&') {
            if (this.left === '' && this.right === '') {
                this.text = `"${this.left}" && "${this.right}"`
            } else if (this.left === '') {
                this.text = `"${this.left}" && ${this.right}`
            } else if (this.right === '') {
                this.text = `${this.left} && "${this.right}"`
            } else {
                this.text = `${this.left} && ${this.right}`
            }
        } else {
            if (this.left === '' && this.right === '') {
                this.text = `"${this.left}" || "${this.right}"`
            } else if (this.left === '') {
                this.text = `"${this.left}" || ${this.right}`
            } else if (this.right === '') {
                this.text = `${this.left} || "${this.right}"`
            } else {
                this.text = `${this.left} || ${this.right}`
            }
        }

        this.correctAnswer = this.logicalOperator === '&&' ?
            this.left && this.right :
            this.left || this.right;

        // logic to handle the case where the answer is an empty string
        if (this.correctAnswer === '') {
            this.correctAnswer = '""';
        }
    }
}

module.exports = Question;