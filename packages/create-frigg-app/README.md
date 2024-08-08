# create-frigg-app

CLI tool for leveraging ready-made templates to help you quickly set up new applications using the Frigg framework.

This package includes the global command for [Create Frigg App](https://github.com/friggframework/create-frigg-app). Please refer to its [documentation](https://docs.friggframework.org/).

## Editing and Running the create command Locally

If you need to make changes to the create command and test them locally, you can use run the same script that is exposed on `package.json > bin > create-frigg-app`:

- If you're in the root of the `create-frigg-app` package, you can run the `index.js` file with the following command:

  ```sh
  ./packages/create-frigg-app/index.js <app-name>
  ```

- If you want to create the test app on a folder outside of the `create-frigg-app` directory, you just need to adjust the path to the `index.js` file:

  ```sh
  /path/to/create-frigg-app/packages/create-frigg-app/index.js <app-name>
  ```

> Make sure to replace `<app-name>` with the name of the app you want to create.
