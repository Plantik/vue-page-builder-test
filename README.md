# Simple Page Builder

This is a test assignment for MailerLite. The Basic Page Builder Starter was built by Anton Platonov.

Comments:

1 - Created a simple disign without strictly adhering to UI/UX principles. All elements like buttons should be avstracted to UI vue components and styled according to the selected design system. Didn't do that in order to spend more time on building the essential funcionality

2 - The app should be further modularized especially in the part of drag and drop compoennts, drop zones and draggable elements. I would think of TDD for d&d functionality as big chunks of dom related code are difficult to test

3 - I used different approaches to styling to show the availavle options (not all). Also I used slots a lot as they are reccomended by the Vue team

4 - I estimate the time I spent on the test at 7-9 hours. I split the project in logical commits in this rep, but initially I worked differently in another repository trying various options and saving the results for my own library. 

5 - I wrote a couple tests as an example. As stated in item two, the good tests for main functionality can be written after further modulirazation

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Run tests

```sh
npm run test
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```