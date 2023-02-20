# Contribution

In order to test and work on this module, you will need to use npm link.


## Step 1: Make some code changes

```
git clone git@github.com:friggframework/create-frigg-app.git
cd create-frigg-app/packages/create-frigg-app
// Make your desired code changes in create-frigg-app
```

## Step 2: Link your changes for use locally
```
npm link

cd ~/myProjectDirectory
npx create-frigg-app myApp
```

> Note: When you finish this step, run `which create-frigg-app` and you should see the directory you linked.

## Step 3: Test your changes

1. Tests pass locally `npm test`
2. Check the generated code to make sure it works manually
3. Make sure your code changes are in the generated code.