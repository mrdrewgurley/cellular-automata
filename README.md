# React Cellular Automata Demo

A single-page, cursory code-sample for prospective employer review. This frontend application is powered by [React](http://facebook.github.io/react) & [Redux](http://redux.js.org), written in [ES6](http://es6-features.org), tested with [Jest](http://facebook.github.io/jest) and built with [Brunch](http://brunch.io).

[Click Here for a Live Demo](https://rawgit.com/mrdrewgurley/cellular-automata/master/public/index.html)

## Getting started  
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.
* Instructions are for OS X deployment

### Prerequisites
* [Node.js](http://nodejs.org)
```
brew install node
```

* [Yarn](https://yarnpkg.com)
```
brew install yarn
```

* [Brunch](http://brunch.io)
```
yarn global add brunch --prefix /usr/local
```

### Installing
* Clone the Repository
```
git clone https://github.com/mrdrewgurley/cellular-automata.git
```

* Change to project directory
```
cd cellular-automata
```

* Build application dependencies:
```
yarn install
```

### Running
* Watches the project with continuous rebuild. This will also launch HTTP server with pushState at http://localhost:3333/
```
yarn start
```

### Testing
* Displays a verbose output of test results
```
yarn test
```

### Deployment
* Builds minified project for production
```
brunch build --production
```

### Author
Drew has over fifteen years of experience in the Software Engineering field, with more than six years of Data Management experience -- acquisition, transformation, analytics and distribution.

He undertakes many roles including solutions architecture, technological strategy, project management, database administration, hands-on development and senior-level management.

### License
This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details
