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
import Publish from "./containers/Publish";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faPlus);

function App() {
    const [data, setData] = useState();

    const [userToken, setUserToken] = useState(
        Cookies.get("userToken") || null
    );
    // GET pour garder l'userToken en mémoire si il y en a un

    const setUser = (token) => {
        if (token) {
            Cookies.set("userToken", token, { expires: 2 });
            // Quand on clique le cookie se crée et le state de setUserToken prend le token
            setUserToken(token);
        } else {
            Cookies.remove("userToken");
            setUserToken(null);
        }
    };
    // On crée une fonction qui prend le token. Si il y a token, on crée le cookie, durée, sinon remove userToken pour déconnecter

    return (
        <Router>
            <Header
                userToken={userToken}
                setUser={setUser}
                data={data}
                setData={setData}
            />
            <Switch>
                <Route path="/publish">
                    <Publish userToken={userToken} />
                </Route>
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
                    <Hero userToken={userToken} />

                    <Home data={data} setData={setData} />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
