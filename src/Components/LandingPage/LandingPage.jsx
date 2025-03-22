import { useState, useEffect } from "react";
import Hero from "../Hero Section/Hero";
import Expenses from "../Expenses/Expenses";

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

    const [walletBalance, setWalletBalance] = useState(
            localStorage.getItem('walletBalance')
        );
    
        const [totalExpense, setTotalExpense] = useState(
            localStorage.getItem('totalExpense')
        );
    
        const [expense, setExpense] = useState(
            JSON.parse(localStorage.getItem('expenses'))
        );

    // useEffect(() => {
    //     // Clear localStorage (optional, for testing)
    //     localStorage.clear();
    
    //     // Initialize default values
    //     if (!localStorage.getItem('walletBalance')) {
    //         localStorage.setItem('walletBalance', 5000);
    //     }
    
    //     if (!localStorage.getItem('totalExpense')) {
    //         localStorage.setItem('totalExpense', 0);
    //     }
    
    //     if (!localStorage.getItem('expenses')) {
    //         localStorage.setItem('expenses', JSON.stringify([]));
    //     }
    // }, []);

    return(
        <div className="landing-page">
            <h1>Expense Tracker</h1>
            <Hero 
            walletBalance={walletBalance} 
            setWalletBalance={setWalletBalance} 
            totalExpense={totalExpense}
            setTotalExpense={setTotalExpense}
            expense={expense}
            setExpense={setExpense}/>

            <Expenses 
            setWalletBalance={setWalletBalance} 
            setTotalExpense={setTotalExpense}
            expense={expense}
            setExpense={setExpense}/>
        </div>
    );
};

export default LandingPage;