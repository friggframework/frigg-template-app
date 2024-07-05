import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import serializeForm from "form-serialize";
import FormValidator from "./FormValidator";
import API from "../api/api";
import config from "../frigg.config";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

// login component is a place for a user to enter a username and password
class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.validator = new FormValidator([
      {
        field: "username",
        method: "isEmpty",
        validWhen: false,
        message: "Name is required.",
      },
      {
        field: "password",
        method: "isEmpty",
        validWhen: false,
        message: "Password is required.",
      },
      {
        field: "password",
        method: "isLength",
        args: [{ min: 4 }],
        validWhen: true,
        message: "Password must be at least 4 characters",
      },
    ]);

    this.state = {
      username: "",
      password: "",
      password2: "",
      validation: this.validator.valid(),
    };

    this.submitted = false;
  }

  // passwordMatch = (confirmation, state) => (state.password === confirmation)

  // when form inputs change, this method handles validating them
  handleInputChange = (event) => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // call the api to login with the credentials
  createUser = async (username, password, password2) => {
    if (!username || !password || !password2) {
      return toast.error("Please fill in all the fields");
    }

    if (password !== password2) {
      return toast.error("Password does not match");
    }

    // handle actual form submission here

    const api = new API();
    const data = await api.createUser(username, password);
    if (data.token) {
      return toast.success("New user created! please login.");
    } else {
      return toast.error(
        "Creating a user failed. (its possible this user already exists...)"
      );
    }
  };

  // form submission method, ultimately unpacks form values and calls login method
  handleFormSubmit = async (event) => {
    event.preventDefault();

    const values = serializeForm(event.target, { hash: true });

    const validation = this.validator.validate(this.state);
    this.setState({ validation });

    if (validation.isValid) {
      // ...
    }

    // attempt login
    await this.createUser(values.username, values.password, values.password2);
  };

  render() {
    const validation = this.validator.validate(this.state);

    return (
      <div className="h-screen relative flex flex-col justify-center items-center">
        <div className="bg-white rounded-lg shadow-xl p-12 w-[420px]">
          <h1 className="text-3xl font-semibold text-primary inline-flex">
            <span className="ml-2">{config.appDisplayName}</span>
          </h1>

          <form className="my-10" onSubmit={this.handleFormSubmit}>
            <h3 className="text-xl mb-4 text-l font-semibold text-gray-700">
              Create Account
            </h3>

            <div className="relative mb-2">
              <label className="block text-sm">
                <span className="text-gray-700">Email</span>
                <Input
                  className="block w-full mt-1 text-sm form-input rounded-lg"
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Email"
                  onChange={this.handleInputChange}
                />
              </label>
              <label className="block mt-4 text-sm">
                <span className="text-gray-700">Password</span>
                <Input
                  className="block w-full mt-1 text-sm form-input rounded-lg"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="***************"
                  onChange={this.handleInputChange}
                />
              </label>
              <label className="block mt-4 text-sm">
                <span className="text-gray-700">Confirm Password</span>
                <Input
                  className="block w-full mt-1 text-sm form-input rounded-lg"
                  type="password"
                  id="password2"
                  name="password2"
                  placeholder="***************"
                  onChange={this.handleInputChange}
                />
              </label>

              <Button type="submit">Create Account</Button>

              <p className="mt-8">
                <span className="text-sm font-medium text-primary hover:underline cursor-pointer">
                  Forgot your password?
                </span>
              </p>
              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-primary hover:underline cursor-pointer"
                  to="/"
                >
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

// connects this component to the redux store.
export default connect()(CreateUser);
