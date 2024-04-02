# Welcome to the Create Frigg App Template

This is the templated Frigg App to help you get up and running fast with Frigg locally.

The first integration we included "off the shelf" is a HubSpot integration.

## Initialization

- Create a MongoDB instance either locally or on MongoDB Atlas. This will be your data store for development.
- Open the `dev.json` config file in the /backend/config/ directory. This will be the file that the backend (run by
  `serverless offline`) will read from to load up process.ENV.
- Add the connection string to the `MONGO_URI` config variable.
- Head to [HubSpot](https://hubspot.com/)
  - [Create a HubSpot Developer Account](https://app.hubspot.com/signup-hubspot/developers?utm_campaign=create-frigg-app) if you have not yet done so
- In your Developer Account, create your first HubSpot App and explore a bit as you'd like
- Inside your App, head to the "Auth" Tab (located next to "App Info")
- Add a redirect URI of http://localhost/3000/redirect/hubspot
- Copy your credentials to the dev.json config file
- Create a Test Account in HubSpot by using the "Testing" side menu item in your HubSpot account
- Add test data to your HubSpot test account, if you don't already have some

## Running the Application

- EITHER
    - Run `npm start` from the your Frigg App directory root
- OR
    - cd into /backend and run `npm run backend-start`
    - cd into /frontend and run `npm run frontend-start`
- If you have not already, select the "Create Demo User"
- Log in as the Demo User
- You will see the Dashboard with HubSpot as an available connection
- Click "Connect" for HubSpot
- You should be redirected to HubSpot and prompted to authorize
- Complete the authorization flow
- Upon redirect, you should now see a connected HubSpot card
- Select "Get Sample Data" from the HubSpot app dropdown menu to see live data fetched from your test account
- **TBD** interaction with HubSpot Integrations

