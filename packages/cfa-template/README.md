# cfa-template

This is the official base template for [Create Frigg App](https://github.com/friggframework/create-frigg-app), a CLI tool for generating new Frigg applications.

The primary purpose of this template is to provide a structured starting point for developing applications with the Frigg framework.

## Editing and Running the Template Locally

If you need to make changes to the template and test them locally, you can use the `--template` flag with the `create-frigg-app` CLI to specify the local path to the template.

1. **Navigate to the folder where you will create the new test app:**

   ```sh
   cd /path/to/your/test/app
   ```

2. **Run `create-frigg-app` with the `--template` flag:**

   ```sh
   npx create-frigg-app --template=file:/path/to/create-frigg-app/packages/cfa-template
   ```

   > **_NOTE:_** this will use latest published version of `create-frigg-app` with the local template. If you want to use the local version of `create-frigg-app` as well, check the README in the `create-frigg-app` package for instructions on how to run with your local changes.

## Contributing

We will update this section soon with broader guidelines on how to contribute to the template. For now, please follow the steps above to test and validate your changes locally.
