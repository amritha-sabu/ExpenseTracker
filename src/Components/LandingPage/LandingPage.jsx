import { useState, useEffect } from "react";
import Hero from "../Hero Section/Hero";
import Expenses from "../Expenses/Expenses";

const LandingPage = () => {
    // const [topExpensesData, setTopExpensesData] = useState([
    //     {category : 'Food', price : 0},
    //     {category : 'Transport', price : 0},
    //     {category : 'Entertainment', price : 0},
    //     {category : 'Grocerry', price  : 0}
    // ]);

    const [walletBalance, setWalletBalance] = useState(
        localStorage.getItem('walletBalance')
    );

    const [totalExpense, setTotalExpense] = useState(
        localStorage.getItem('totalExpense')
    );

    const [expense, setExpense] = useState(
        JSON.parse(localStorage.getItem('expenses')) || []
    );

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

    const calculateTopExpenses = (expenses) => {
        if (!expenses || expenses.length === 0) {
            return [];
        }

        const categoryTotals = expenses.reduce((acc, exp) => {
            acc[exp.category] = (acc[exp.category] || 0) + exp.price;
            return acc;
        }, {});
    
        return Object.keys(categoryTotals)
            .map((category) => ({
                category,
                amount: categoryTotals[category],
            }))
            .sort((a, b) => b.amount - a.amount) // Sort by amount in descending order
            .slice(0, 5); // Get the top 5 categories
    };
    
    const topExpensesData = calculateTopExpenses(expense);

    useEffect(() => {
        // Clear localStorage (optional, for testing)
        localStorage.clear();
    
        // Initialize default values
        if (!localStorage.getItem('walletBalance')) {
            localStorage.setItem('walletBalance', 5000);
        }
    
        if (!localStorage.getItem('totalExpense')) {
            localStorage.setItem('totalExpense', 0);
        }
    
        if (!localStorage.getItem('expenses')) {
            localStorage.setItem('expenses', JSON.stringify([]));
        }
    }, []);

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
            setExpense={setExpense}
            topExpensesData={topExpensesData}/>
        </div>
    );
};

export default LandingPage;