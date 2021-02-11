import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Header from "./components/Header";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Hero from "./components/Hero";

function App() {
    const [userToken, setUserToken] = useState(Cookies.get("userToken") || "");
    // GET pour garder l'userToken en mémoire si il y en a un

    const setUser = (token) => {
        if (token) {
            Cookies.set("userToken", token, { expires: 2 });
            setUserToken(token);
        } else {
            Cookies.remove("userToken");
            setUserToken(null);
        }
    };
    // On crée une fonction qui prend le token. Si il y a token, on crée le cookie, durée, sinon remove userToken pour déconnecter

    return (
        <Router>
            <Header userToken={userToken} setUser={setUser} />
            <Hero />
            <Switch>
                <Route path="/offer/:id">
                    <Offer />
                </Route>
                <Route path="/login">
                    <Login setUser={setUser} />
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
