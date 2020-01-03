# Javascript Short Circuit Evaluation Tester

https://jsshortcircuit.herokuapp.com/

The JS Short Circuit Tester is an application designed to help you improve your ability to evaluate short circuit logic in Javascript.

The test involves 10 questions with truthy and falsy values and the && or || logical operator.

## Features

### 1. Randomised questions

The questions have three randomised components:
- the logical operator
- whether the expression will be a truthy vs falsy value, falsy vs falsy, truthy vs truthy etc
- the left and right sides of the expression are randomised from a list of truthy or falsy values, depending on which type of question is randomised

This leads to infinite replayability and forces the player to learn the rules of short circuit evaluation, rather than simply memorise answers.

### 2. Answers evaluated by Node.js

All expressions are evaluated by Node.js, which facilitates the randomisation of expressions. Without the ability to programmatically evaluate expressions, each question would have to be given an answer by a human being, which would reduce the number of expressions available in the application.

Evaluation by Node.js also eliminates the potential for human error in determining the correct answers.

### 3. Trick values

The expressions may sometimes use so called 'trick values', which are intended to train the player to recognise values which are often mistaken for truthy when they are falsy or vice versa.

These trick values include strings of falsy values (e.g. 'null', 'undefined'), empty arrays and empty objects, and values which are in other ways similar to falsy values (e.g. 'zero').

### 4. Leaderboard

The results for each quiz can be saved into a Mongo database, which is then used to determine the top 10 scores for the application. The quiz is scored firstly on accuracy, this means that a 10/10 score will always be ranked higher than a 9/10. Equal scores use the time to complete the quiz, measured in hundredths of a second, as a tiebreaker.

## Unresolved vulnerabilities

### 1. Anyone can send a POST to the endpoint

Posts can be sent to the '/leaderboard' endpoint, bypassing the entire quiz.

### 2. The form on the Report page can be resubmitted, creating multiple records in the database

## Notable bugs encountered during development

### 1. Script getting 404 not found

This bug occurred when trying to link a script using the src tag e.g.
```HTML
<script src='./../quizScript'></script>
```

This will throw a 404 error in the browser console, saying the script could not be found at localhost:3000/quizscript. This happens because although the path given in ```src``` above was correct, the file cannot be accessed via the browser. To solve the problem, we must make our file available.

There are two methods to do this: 1) set up a route, 2) expose a public directory.

#### To set up a route

In routes.js:
```Javascript
router.get('/scripts/quizscript', res.sendFile(__dirname + '/scripts/quizScript.js'));
```

Note that the ```scripts``` directory must exist in the root and ```quizScript.js``` must be inside that folder.

When the user goes to the ```/scripts/quizscript``` endpoint, they will be served the file. This is not intended for the user to go to and look at themselves, but it is available for that, so don't put anything confidential on that page. This will allow the user's browser to access the script they need.

#### To expose the public directory

First create a public directory (i.e. a directory called 'public' in the root of the project).

Next go into ```app.js``` and write the following middleware ```app.use(express.static('public'))```.

This will allow the public directory and any sub-directories to be accessible on those endpoints. We must place ```quizScript.js``` inside ```public/scripts/```. Lastly, in the script tag we must reference this location 
```HTML
<script src='/scripts/quizScript.js'></script>
```