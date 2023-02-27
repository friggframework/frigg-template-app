# Contribution

In order to test and work on this module, you will need to run the binary manually.

## Step 1: Make some code changes

```
git clone git@github.com:friggframework/create-frigg-app.git
cd create-frigg-app/packages/create-frigg-app
// Make your desired code changes in create-frigg-app
```

## Step 2: Run the binary from the folder you worked on

```
../create-frigg-app/packages/create-frigg-app/index.js my-test-project --template file:../create-frigg-app/packages/cfa-template/
```

Docs on this: https://create-react-app.dev/docs/custom-templates/#testing-a-template

## Step 3: Test your changes

1. Tests pass locally `npm test`
2. Check the generated code to make sure it works manually
3. Make sure your code changes are in the generated code.
