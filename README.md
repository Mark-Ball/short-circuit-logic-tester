# Development plan

## 1. Develop logic for the console
- question class
- randomised questions
- method to check if answer is correct
- method for scoring

## 2. Testing
- manual testing
- test that the questions can always be evaluated by Node

## 3. Set up Express app
- landing page with button to go to game
- game with timer
- congratulations page

## 4. Additional features
- leaderboard (MongoDB)
- page that shows you which questions you got wrong and right
- hard mode
- Heroku hosting

## Notable bugs

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
