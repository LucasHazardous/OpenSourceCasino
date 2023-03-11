<img align="left" height="64" src="./public/logo.png">

# Open Source Casino

![Latest version](https://img.shields.io/github/package-json/v/LucasHazardous/OpenSourceCasino?color=FFCF40&style=flat-square) ![License](https://img.shields.io/github/license/LucasHazardous/OpenSourceCasino?color=36D399&style=flat-square) ![Repo size](https://img.shields.io/github/repo-size/LucasHazardous/OpenSourceCasino?color=6184D8&style=flat-square) ![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/LucasHazardous/OpenSourceCasino?color=F87272&style=flat-square)

## Motivation

Stakes and rewards in this casino are fake. This casino will never give the excitement caused by chasing meaningful rewards. That is not the goal though and will never be. The only excitement that is available here is the one caused by satisfying, easy and intuitive gameplay. This project also gives you an insight why you should never think of a casino as a way to make money.

## Retrieving the currency

Amount of your cyberdonuts is stored in local storage in your browser. To retrieve them:

- head over to the developer console in your browser and in **Application** tab, under **Local Storage** section select the website url and modify the **points** value
- clear browsing data in your browser's settings

---

## Configured scripts

Before running any script install dependencies and configure [Husky Git hook](https://typicode.github.io/husky/#/):

```
npm i
npm run prepare
```

Local development mode:

```
npm run dev
```

Running tests:

```
npm run test
```

Get test coverage:

```
npm run coverage
```
