# minesweeper-API
API test

We ask that you complete the following challenge to evaluate your development skills. Please use the programming language and framework discussed during your interview to accomplish the following task.

PLEASE DO NOT FORK THE REPOSITORY. WE NEED A PUBLIC REPOSITORY FOR THE REVIEW. 

## The Game
Develop the classic game of [Minesweeper](https://en.wikipedia.org/wiki/Minesweeper_(video_game))

## Show your work

1.  Create a Public repository ( please dont make a pull request, clone the private repository and create a new plublic one on your profile)
2.  Commit each step of your process so we can follow your thought process.

## What to build
The following is a list of items (prioritized from most important to least important) we wish to see:
* Design and implement a documented RESTful API for the game (think of a mobile app for your API)
* When a cell with no adjacent mines is revealed, all adjacent squares will be revealed (and repeat)
* Ability to 'flag' a cell with a question mark or red flag
* Detect when game is over
* Persistence
* Time tracking
* Ability to start a new game and preserve/resume the old ones
* Ability to select the game parameters: number of rows, columns, and mines
* Ability to support multiple users/accounts
 
## Deliverables we expect:
* Code in a public Github repo
* README file with the decisions taken and important notes

## Bonus Points
* URL where the game can be accessed and played (use any platform of your preference: heroku.com, aws.amazon.com, etc)
* Implement an API client library for the API designed above. Ideally, in a different language, of your preference, to the one used for the API

## Time Spent
We suggest not spending more than 4-5 hours total.  Please make commits as often as possible so we can see the time you spent and please do not make one commit.  We will evaluate the code and time spent.
 
What we want to see is how well you handle yourself given the time you spend on the problem, how you think, and how you prioritize when time is sufficient to solve everything.

Please email your solution as soon as you have completed the challenge or the time is up



# SOLUTION:

## Notes:

There are some points in the requirements that are not very precise. For instance, there are many functionalities that could be implemented in the client app only, and that don't need a server / database, and other functionalities where the server / database would only add some advantages over the client-only solution.

So I'll assume that when there is no significant advantage for using a server / database, a client-only solution will be correct. For instance, we could have an API endpoint for generating the new game parameters (the mines positions), but that can be done much more easily in the client. The advantage of using the server in such a case, would be being able to have well-known problems, and hence different users could compare themselves over the same "stages". But as that is not a very significant advantage, and that is not explicitly mentioned in the requirements, I will only use the client for that.

The first requirement is especially vague, as it seems that this challenge requires a huge API by looking at it, and it also mentions a "mobile app", which is misleading:
> Design and implement a documented RESTful API for the game (think of a mobile app for your API)


## Components:

- Client web application
- Server REST API
- Database

## Tools:

Considering the time constraint, I will use the tools that I am more familiar with, which are:

- React for the client web application
- Firebase Functions for server REST API
- Firebase Firestore for the database
- Firebase Authentication for authenticating users (this is needed for the last requirement: "Ability to support multiple users/accounts")

## Tasks breakdown:

1. Create React App with the following features:
* When a cell with no adjacent mines is revealed, all adjacent squares will be revealed (and repeat)
* Ability to 'flag' a cell with a question mark or red flag
* Detect when game is over
* Time tracking
* Ability to select the game parameters: number of rows, columns, and mines

2. Add the following features, using the backend (Firebase Functions REST API and Firestore):
* Design and implement a documented RESTful API for the game (think of a mobile app for your API)
* Persistence: I assume this is the same as the next step
* Ability to start a new game and preserve/resume the old ones

3. Add authentication / authorization capability:
* Ability to support multiple users/accounts

4. Add unit tests

## UI design:

### Home page: /

If user is not logged in, they will see a login button.

If the user is logged in, they will see:
- a link to start a new game
- a link to see old games

### Game page: /games/:gameId

This page will initially present 3 input fields for the number of rows, columns, and mines, as well as a Start button.

Once the Start button is pressed, these elements will be displayed:
- the game board,
- a Timer,
- a button to Save the game (which will save in the database and redirect to the Home page),
- a button to Exit the game without saving (which will redirect to the Home page)

Note: every game could be stored in the database, which could be used later for showing the user their past statistics. However, as that is not a requirement, I won't implement it.

### Saved games: /games

This page will displayed the saved games, which the user can click to resume.


# TODO:

1. Improve accessibility:

- add event listeners for key presses
- save the last tab index, so that the user can go back to their last cell
- more accessibility attributes in the game board