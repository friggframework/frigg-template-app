# cfa-template

This is the official base template for [Create Frigg App](https://github.com/friggframework/create-frigg-app), a CLI tool for generating new Frigg applications.

The primary purpose of this template is to provide a structured starting point for developing applications with the Frigg framework.

## Editing and Running the Template Locally

If you need to make changes to the template and test them locally, follow these steps:

1. **Navigate to the `create-frigg-app` package directory:**

   ```sh
   cd ./packages/create-frigg-app
   ```

2. **Link the package locally:**

   ```sh
   npm link
   ```

3. **Navigate to the directory where you want to create a test app:**

   ```sh
   cd /path/to/your/test/app
   ```

4. **Link the `create-frigg-app` package in your test app directory:**

   ```sh
   npm link create-frigg-app
   ```

5. **Create a new Frigg app using the CLI:**

   ```sh
   npx create-frigg-app <app-name>
   ```

Replace `<app-name>` with the desired name of your test application.

## Contributing

We will update this section soon with broader guidelines on how to contribute to the template. For now, please follow the steps above to test and validate your changes locally.
