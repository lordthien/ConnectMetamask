import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";

// routes config
import routes from "../routes";
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        sessionStorage.getItem("token") ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const TheContent = () => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <PrivateRoute
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                  >
                    <CFade>
                      <route.component />
                    </CFade>
                  </PrivateRoute>
                )
              );
            })}
            <Redirect to="/dashboard" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  );
};

export default React.memo(TheContent);
