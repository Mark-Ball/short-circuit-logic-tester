const falsyValues = [0, null, undefined, '', false, NaN];
const truthyValues = [1, 5, 'hello', 7, true];
const trickValues = ['null', 'false', [], {}, 'zero'];

// 50% &&, 50% ||
// 30% falsy vs falsy
// 15% falsy vs truthy
// 15% truthy vs falsy
// 30% truthy vs truthy
// 5% trick vs falsy
// 5% trick vs truthy

class Question {
    constructor() {
        let randomType = Math.random();

        if (randomType <= 0.45) {
            this.left = falsyValues[Math.floor(Math.random() * falsyValues.length + 1)];
        } else if (randomType <= 0.9) {
            this.left = truthyValues[Math.floor(Math.random() * truthyValues.length + 1)];
        } else {
            this.left = trickValues[Math.floor(Math.random() * trickValues.length + 1)];
        }
    }

    ask() {
        
    }

    values() {
        return [this.left];
    }
}

let q1 = new Question();
console.log(q1.values());
