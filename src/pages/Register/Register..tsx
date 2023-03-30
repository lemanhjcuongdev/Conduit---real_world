import { FormEvent, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { loginAPI, registerAPI } from "../../api/user";
import Input from "../../components/Input/Input";
import { EmailValidation } from "../../utils/InputValidation";
import IUserProps from "../Login/type";
import useAuthContext from "../../hooks/useAuthContext";
import { loginAction, registerAction } from "../../store/actions";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //change page's title
  document.title = "Register - Conduit";

  const { state, dispatch } = useAuthContext();
  const { user } = state;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      setError("Please enter email or password!");
    } else if (!EmailValidation(email)) {
      setError("Please enter a valid email or password!");
    } else {
      const LoginUser: IUserProps = {
        username: username,
        email: email,
        password: password,
      };

      registerAPI({
        user: LoginUser,
      }).then((data) => {
        if (!data.errors) {
          //set data into local storage and dispatch register action
          localStorage.setItem("user_data", JSON.stringify(data.user));
          dispatch(registerAction(data.user));
        } else {
          //catch error
          if (data.errors.email) {
            setError(`Email ${data.errors.email[0]}`);
          }
          if (data.errors.username) {
            setError(`Username ${data.errors.username[0]}`);
          }
        }
      });
    }
  };

  return (
    <>
      {user && <Navigate to="/" replace={true} />}
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign up</h1>
              <p className="text-xs-center">
                <Link to="/register">Have an account?</Link>
              </p>

              <ul className="error-messages">{error}</ul>

              <form onSubmit={handleSubmit}>
                <fieldset className="form-group">
                  <Input
                    className="form-control form-control-lg"
                    placeholder="Username"
                    value={username}
                    setValue={setUsername}
                    setError={setError}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <Input
                    className="form-control form-control-lg"
                    placeholder="Email"
                    value={email}
                    setValue={setEmail}
                    setError={setError}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <Input
                    className="form-control form-control-lg"
                    placeholder="Password"
                    value={password}
                    type="password"
                    setValue={setPassword}
                    setError={setError}
                  />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right">
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
