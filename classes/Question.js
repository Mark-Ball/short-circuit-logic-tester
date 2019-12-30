const falsyValues = [0, null, undefined, '', false, NaN];
const truthyValues = [1, 5, "\"hello\"", 7, 12, 23, "\"cat\"", "\"left\"", "\"right\"", "\"k\"", true];
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
// 
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
        this.point = 0;
        this.logicalOperator = Math.random() > 0.5 ? '&&' : '||';

        let randomType = Math.random();

        if (randomType <= 0.20) {
            this.left = randomFalsy();
            this.right = randomFalsy();
        } else if (randomType <= 0.40) {
            this.left = randomFalsy();
            this.right = randomTruthy();
        } else if (randomType <= 0.60) {
            this.left = randomTruthy();
            this.right = randomFalsy();
        } else if (randomType <= 0.80) {
            this.left = randomTruthy();
            this.right = randomTruthy();
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
        }

        this.text = this.logicalOperator === '&&' ?
            `${this.left} && ${this.right}` :
            `${this.left} || ${this.right}`;

        this.correctAnswer = this.logicalOperator === '&&' ?
            this.left && this.right :
            this.left || this.right;
    }
    
    evaluateResponse(response) {
        if (response === this.getCorrectAnswer()) {
            this.point = 1;
            console.log('Correct!');
        }
    }
}

module.exports = Question;