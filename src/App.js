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
import Payment from "./containers/Payment";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import ModifyOffer from "./containers/ModifyOffer";
library.add(faSearch, faPlus);

function App() {
    const [data, setData] = useState();

    const [userToken, setUserToken] = useState(
        Cookies.get("userToken") || null
    );

    const [userId, setUserId] = useState(Cookies.get("userId") || null);

    // GET to keep userToken in memory, if there is one

    const setUser = (token) => {
        if (token) {
            Cookies.set("userToken", token, { expires: 2 });
            // OnCLick, the cookie, is created with his expiration date
            setUserToken(token);
        } else {
            // If no token, we remove userToken to disconnect
            Cookies.remove("userToken");
            setUserToken(null);
        }
    };

    const setIdUser = (id) => {
        if (id) {
            Cookies.set("userId", id, { expires: 2 });
            // OnCLick, the cookie, is created with his expiration date
            setUserId(id);
        } else {
            // If no token, we remove userToken to disconnect
            Cookies.remove("userId");
            setUserId(null);
        }
    };

    return (
        <Router>
            <Header
                userToken={userToken}
                setUser={setUser}
                data={data}
                setData={setData}
                setUserId={setUserId}
            />
            <Switch>
                <Route path="/modify">
                    <ModifyOffer userToken={userToken} />
                </Route>
                <Route path="/publish">
                    <Publish userToken={userToken} />
                </Route>
                <Route path="/offer/:id">
                    <Offer userId={userId} userToken={userToken} />
                </Route>
                <Route path="/login">
                    <Login setUser={setUser} setIdUser={setIdUser} />
                </Route>
                <Route path="/signup">
                    <Signup setUser={setUser} setIdUser={setIdUser} />
                </Route>
                <Route path="/payment">
                    <Payment userToken={userToken} />
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
