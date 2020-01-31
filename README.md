# Setup

## Get MongoDB

See https://docs.mongodb.com/manual/installation/

For a Mac using Homebrew:

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

Database will be setup when the project is run for the first time

## Setup

```bash
npm install # For global project
cd client && npm install && cd ..# For client
```

## Run tests

See `package.json`

```bash
npm run test # unit tests
npm run test-integration # integration tests
npm run test-acceptance # acceptance tests
```

## Run project

```bash
npm start # starts both client and server
```
