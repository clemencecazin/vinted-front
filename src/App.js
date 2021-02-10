import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import axios from "axios";

function App() {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                "https://lereacteur-vinted-api.herokuapp.com/offers"
            );

            setData(response.data);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    return isLoading ? (
        <p>En cours de chargement...</p>
    ) : (
        <Router>
            <Switch>
                <Route path="/offer/:id">
                    <Offer />
                </Route>

                <Route path="/">
                    <Home data={data.offers} setData={setData} />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
