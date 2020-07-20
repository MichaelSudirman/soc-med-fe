import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import axios from "axios";
import jwtDecode from "jwt-decode";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";
// Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import user from "./pages/user";
// Components and utils
import Navbar from "./components/layout/Navbar";
import themeObject from "./util/theme";
import AuthRoute from "./util/AuthRoute";
// Material UI core imports
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

/*
  setting axios default url under the POST bug,
  cannot POST using proxy key under pacakage.json
*/
axios.defaults.baseURL = "https://us-central1-soc-med.cloudfunctions.net/api";

const theme = createMuiTheme(themeObject);

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      <>
        {/* Icons made by smashicon */}
        <MuiThemeProvider theme={theme}>
          <Provider store={store}>
            <div className="App">
              <Router>
                <Navbar />
                <div className="container">
                  <Switch>
                    <Route exact path="/" component={home} />
                    <AuthRoute exact path="/login" component={login} />
                    <AuthRoute exact path="/signup" component={signup} />
                    <Route exact path="/users/:handle" component={user} />
                    <Route exact path="/users/:handle/post/:postId" component={user} />
                  </Switch>
                </div>
              </Router>
            </div>
          </Provider>
        </MuiThemeProvider>
      </>
    );
  }
}

export default App;
