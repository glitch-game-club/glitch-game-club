
We've created this CODEGUIDE.md file to collate information on how to format our starter games for learners. 

It is just a guide, feel free to stray from it if you can justify it. 

You can look at this project as an example https://glitch.com/edit/#!/hazards-enemies-vlinted?path=js/index.js:35:0 

- create a minimal index.html linking to phaser and one .js file with all your game code
- create a playState state object from scratch and use function syntax of  `playState.create = function () {` rather than nested approach - see above example for more details
- use following guidelines - https://www.w3schools.com/js/js_conventions.asp
- as such produces minimal js / es lint warning
- avoid object literal syntax (one reason to use Phaser 2 rather than 3)
- put variables that can be most manipulated by users to affect game play at start as globals
- put variables in global if they are needed by more than one function
- list variables at the start of functions

You might want to use [ESLint](https://eslint.org/) to automatically check for JavaScript style problems. A suggested config file for ESLint is [here](https://github.com/webgameclubs/edlab-gamemakers-club/blob/master/.eslintrc.js).

Here are some more general guidelines

Please try to follow the following guidelines;

* **Readability of code**: Try to write code so it is obvious what it does. 
* **Make it modular but avoid nested structures** Write code so it encourages the practice of solving problems by breaking difficult problems into small pieces but try to limit the complexity of your code by not nesting structures if you can avoid it to help novice coders.
* **Please avoid jQuery** or other helper frameworks if they are not needed. jQuery is great but plain JS helps makes our code examples clearer to read and consistent. 
* **Use DR Principle** If you  Do Repeat some steps to avoid using more complicated coding structures that's ok. Prioritise clarity and readability over efficiency
* **Follow the JavaScript code standards** Try to follow the [coding standards from W3Schools](https://www.w3schools.com/js/js_conventions.asp)
* **favour tinker-ability over extend-ability** where possible, write in a style that is easy to change and experiment with, even if that means you write code that is difficult to reuse elsewhere

