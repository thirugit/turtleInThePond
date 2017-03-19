#Turtle in the pond

The application is a simulation of a turtle moving around a pond, of dimension 5 units x 5 units. There are no other obstructions in the pond. The turtle is free to roam around the surface of the pond, but will be prevented from touching the walls surrounding the pond (anything outside of the 5 x 5 grid). Any movement that would result in the turtle leaving the pond would be prevented, however further valid movement commands would still be allowed.

> This application is coded in **React JS framework**, depending on the inputs in text box, mouse click and arrow keys the turtle will move inside the pond accordingly (Custom version of turtle pond game). 

## Tools and framework used

1. React js with redux - JavaScript library for building user interfaces and to store the state of the application. 
2. Webpack -  Module Bundler.
3. Babel - JavaScript compiler.
4. Eslint - Linter tool to maintain the code quality.
5. Mocha/Chai, Sinon - Testing framework 

## Getting started

```
To see the results quickly, I have already compiled the javascript files using webpack and added to this package.
So, this project can run without installing in the local machine. Just open the index.html file in the browser (present in the following location ..\public\index.html)
```

```
If you want to install and run the project in the local machine, follow the below steps.
```

####To install the project

1. Install [node server v5.4.1](https://nodejs.org/download/release/v5.4.1/)
2. Open the terminal and go to root folder of this project 
3. Run `npm install`  (This command will download all the dependencies of this project)

####To start the project

1. Open the terminal and go to root folder of this project 
2. Run `npm run start`
3. Open browser and hit http://localhost:3000

####To run test cases 

1. Open the terminal and go to root folder of this project 
2. Run `npm run test`

####To find the test coverage

1. Open the terminal and go to root folder of this project 
2. Run `npm run test-cover`

Note: if test-cover is not working, then Run `npm install babel-cli -g` and re-run `test-cover`

## Features 

1. Type command in the format 'PLACE 1,2,NORTH' which places the turtle in the appropriate X and Y axis in the grid and in the direction specified
2. Type LEFT (or use 'left' arrow) which rotates the turtle in left direction and RIGHT (or use 'right' arrow) which rotates it in right direction
3. Type MOVE (or use 'up' arrow) which moves the turtle by 1 unit in the direction it is facing. It cannot move beyond the grid.
4. Type REPORT (or use 'down' arrow) which reports the location of the turle in the grid to the console.
5. Click on the grid to place the turtle in that location(direction by default is north or it faces the direction it is already in)
6. Appropriate error messages on user commands

## To do 

1. Improve code coverage 
2. Convert CSS to SASS

