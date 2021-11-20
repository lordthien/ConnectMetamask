import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
function PublicRouter({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        sessionStorage.getItem("token") ? (
          <Redirect
            to={{
              pathname: "/dashboard",
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
}
class App extends Component {
  render() {
    return (
      <Router>
        <React.Suspense fallback={loading}>
          <Switch>
            <PublicRouter exact path="/login" name="Login Page">
              <Login />
            </PublicRouter>
            <PublicRouter exact path="/register" name="Register Page">
              <Register />
            </PublicRouter>
            <Route
              exact
              path="/404"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
            <Route
              path="/"
              name="Home"
              render={(props) => <TheLayout {...props} />}
            />
          </Switch>
        </React.Suspense>
      </Router>
    );
  }
}

export default App;
