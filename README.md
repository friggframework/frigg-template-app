# Frigg Template App

Allows you to generate Frigg Api Modules for development.

## Generating a Api Module

```bash
npm install
npm run module:generate # frigg --module generate <ModuleName> --auth basic
# ? What is the name of this API Module? <ModuleName>
# ? Select an authentication strategy:
# > Basic
#   OAuth2
```

## Registering a developer account

```bash
npm install
npm run user:register # frigg --module generate <ModuleName> --auth basic
# ? Developer account email: <UserEmail>
# ? Developer account password: <UserEmail>
# > Basic
#   OAuth2
```

## Creating an App

```bash
npm run app:create # frigg --app create <AppName> --component default-horizontal
# ? What is the name of this App? <AppName>
# ? Select a component layout:
# > Default Horizontal
#   Default Vertical

cd frontend
npm install
npm run start
```

## Adding your Api Module

```bash
npm run module:add --name=<ModuleName> # frigg --module add <ModuleName>
```

## Serving your app

```bash
npm run app:serve
# Frontend app will be running at http://localhost:3000
# Serverless will be running at http://localhost:3001/dev
```
