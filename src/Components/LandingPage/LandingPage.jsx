import { useEffect } from "react";
import Hero from "../Hero Section/Hero";

const LandingPage = () => {

    useEffect(() => {
        if(!localStorage.getItem('walletBalance')){
            localStorage.setItem('walletBalance', 5000);
        }

        if(!localStorage.getItem('totalExpense')){
            localStorage.setItem('totalExpense', 0);
        }

        if(!localStorage.getItem('expenses')){
            localStorage.setItem('expenses', JSON.stringify([]));
        }
    }, []);

    return(
        <div className="landing-page">
            <h1>Expense Tracker</h1>
            <Hero />
        </div>
    );
};

export default LandingPage;