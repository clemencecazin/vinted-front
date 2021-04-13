import { Redirect } from "react-router-dom";
import FormOffer from "../components/FormOffer";

const Publish = ({ userToken }) => {
    return userToken ? (
        <FormOffer userToken={userToken} />
    ) : (
        // If the User is not connected redirect to login
        <Redirect to={{ pathname: "/login", state: { fromPublish: true } }} />
    );
};

export default Publish;
