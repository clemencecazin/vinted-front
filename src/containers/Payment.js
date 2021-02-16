import React from "react";
import { Redirect } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(
    "pk_test_51ILRufFonkUVsR7aIFB5qP8qFhZVmZsu5EJn1YLFl4RG8WhyfpkxiKxk9JbCHIni0ukndV79wTXFuYz2nlOtZGh300m71jUjjO"
); // Clé public pour accéder à Stripe

const Payment = ({ userToken }) => {
    const location = useLocation();

    console.log(location);

    console.log(location.state.product_description);

    return userToken ? (
        <div className="bg-payment">
            <Elements stripe={stripePromise}>
                <CheckoutForm
                    description={location.state.product_description}
                    price={location.state.product_price}
                />
            </Elements>
        </div>
    ) : (
        <Redirect to="/login" />
    );
};

export default Payment;
