import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Header from "./components/Header";
import Login from "./containers/Login";
import Signup from "./containers/Signup";

function App() {
    const [userToken, setUserToken] = useState();

    const setUser = (token) => {
        if (token) {
            Cookies.set("userToken", token, { expires: 2 });
            setUserToken(token);
        } else {
            Cookies.remove("userToken");
            setUserToken(null);
        }
    };
    return (
        <Router>
            <Header userToken={userToken} setUser={setUser} />
            <Switch>
                <Route path="/offer/:id">
                    <Offer />
                </Route>
                <Route path="/login">
                    <Login setUserToken={setUserToken} setUser={setUser} />
                </Route>
                <Route path="/signup">
                    <Signup setUser={setUser} />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
