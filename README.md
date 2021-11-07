# Minesweeper

## Url:

https://mine-sweeper-deviget.web.app

## Components:

- Client web application
- Database

## Tools:

- React for the client web application
- Firebase Firestore for the database
- Firebase Authentication for authenticating users

## Features:

* When a cell with no adjacent mines is revealed, all adjacent squares are revealed recursively
* Ability to 'flag' a cell with a question mark or red flag
* Detect when the game is over
* Time tracking
* Ability to select the game parameters: number of rows, columns, and mines
* Ability to start a new game and preserve/resume the old ones
* Ability to support multiple users/accounts

## UI design:

### Home page: /

If user is not logged in, they see a login button.

If the user is logged in, they see:
- a link to start a new game
- a link to see old games

### Game page: /games/:gameId

This page initially presents 3 input fields for the number of rows, columns, and mines, as well as a Start button.

Once the Start button is pressed, these elements are displayed:
- the game board,
- a Timer,
- a button to Save the game (which saves in the database and redirects to the Home page),
- a button to Exit the game without saving (which redirects to the Home page)

### Saved games: /games

This page displays the saved games, which the user can click to resume.

## References:

- Building an accessible bingo web app:  
https://www.24a11y.com/2019/building-an-accessible-bingo-web-app/

- GoogleChromeLabs's Minesweeper:  
https://proxx.app  
https://github.com/GoogleChromeLabs/proxx

- How to Keep Your CSS Grid Layouts Accessible:  
https://webdesign.tutsplus.com/articles/a-guide-to-css-grid-and-accessibility--cms-32857

- ARIA Grid As an Anti-Pattern:  
https://adrianroselli.com/2020/07/aria-grid-as-an-anti-pattern.html

- Grids Part 1: To grid or not to grid:  
https://sarahmhigley.com/writing/grids-part1/

- How to make MineSweeper with React:  
https://medium.com/@learncodefromjohn/how-to-make-minesweeper-with-react-fb4f9b5358da  
https://github.com/LearnCodeFromJohn/MineSweeper  
https://learncodefromjohn.github.io/MineSweeper/

- Minesweeper in 100 minutes - React JS Game:  
https://www.youtube.com/watch?v=BLdd0zP-tAw

- Build Minesweeper with React & Typescript [2] - Game Logic:  
https://www.youtube.com/watch?v=TbdjunaRVgM

- How To Build A Minesweeper Clone With JavaScript:  
https://www.youtube.com/watch?v=kBMnD_aElCQ

- Github projects:  
https://github.com/nbsp1221/react-minesweeper-game  
https://github.com/TomerOmri/Minesweeper-React  
https://github.com/Obee88/minesweeper-react