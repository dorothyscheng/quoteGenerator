# Random Quote Generator

An application to randomly display a quote.

## Introduction

Your task is to build a frontend application for displaying a random quote from the provided api. This application does not need to be deployed or hosted anywhere- just something you can run locally.

## What We Expect From You

1. A button to allow a user to fetch a new random quote.
2. Display a list of characters from the api. Clicking on a character should fetch a new random quote by that character.
3. Utilize tailwindcss to style the application however you'd like.
4. Add any additional feature of your choice.
5. Upload your completed code to your own github account and share it with us. If the repo is private please share it with `violetlabs44`.

### APIs

#### Random Quote

- To fetch a random quote make a GET request to `http://localhost:3000/quote`
- To fetch a random quote by a particular character make a GET request to `http://localhost:3000/quote?characters=dwight` or `http://localhost:3000/quote/?characters=dwight,pam`

#### Array of characters

To fetch an array of characters make a GET request to `http://localhost:3000/characters`.

## Time Estimate

We expect this to take you 2-4 hours to complete. This isn’t a hard limit- it is just for you to plan your time!

## About this project

This project is split into 3 separate packages using [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/).

```bash
.
├── packages
│   ├── client  # ReactJs application
│   ├── domain  # TypeScript library
│   ├── server  # NestJs api application
```

### Built With

[![NestJs][nest.js]][Nest-url] [![React][React.js]][React-url]

## Getting Started

### Prerequisites

- Node v16

```
npm install npm@latest -g
```

To install the dependencies and run the scripts it is recommended to use `yarn`

```
npm install --global yarn
```

### Installation

From the root install the packages using yarn:

```
yarn
```

## Running the app

To run the application you need will need to start `server` and `client`.

### Start the Server (API)

Open a terminal window and run the following command from the root of the project:

```
yarn start:server
```

![](https://i.imgur.com/I2Kelil.png)

This will start the NestJs application and seed the in-memory sqlite database with data from [office_quotes.json](./packages/server/src/seeds/office_quotes.json).

You can access the api from your browser or with postman at the following address http://localhost:3000/quote.

### Start the Client

Open another terminal window to start the client application.

```
yarn start:client
```

![](https://i.imgur.com/qH6vBTM.png)

This will run the app in the development mode. Open http://localhost:4000 to view it in the browser.

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Nest.js]: https://img.shields.io/badge/NestJs-20232A?style=for-the-badge&logo=nestjs&logoColor=e0234d
[Nest-url]: https://nestjs.com/
