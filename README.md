# How to run this application

You can run the application directly using node 12 with `npm install` and `npm start`, it will run the application using the default create react app development serve.

If you prefer to use a _docker_ machine, no problem! There is already a dockerfile set up that builds this application for production envronment, you just need docker installed in your machine and run the commands `make docker-build` and `make run`.

The application is going to be available using `localhost:8080`.

# Running the tests

I decided to use `react-testing-library` together with `jest` for unit testing this application. Not all components are tested, but you can find tests of snapshot(html generated) and behavioral testing(firing events and asserting text/output), including the ones related to the custom react hook for conversation API.

Just run: `npm tests`

# Interesting decisions

- Using React Hooks, for applying side effects and state management, also I have implemented my own hook for integration with message api.
- I try to use BEM methodology for creating an easy to mantain and react css.
- I use SASS as CSS pre processor.
- I decided to use Typescript for more safety when working with JS.
- Dockerized application.
- The idea of sepation of concerns between components, scenes and services. All components should live inside of components folder. All scenes(they are "pages" in a single page application) live insede of scenes folder and all integrations with external api, live inside of services folder.
- SCSS shared variables
- I tried to use a pre-defined range of css sizes(for padding, margins, width...), all of them using REM size. The main idea behind this decision is avoid pixel perfect.
