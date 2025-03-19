import { useState } from 'react';
import AddIncomeModal from '../Modal/AddIncomeModal';
import './Hero.css';
import AddExpenseModal from '../Modal/AddExpenseModal';

const Hero = () => {
    const [showAddBalance, setShowAddBalance] = useState(false);
    const [showAddExpense, setShowAddExpense] = useState(false);
    const [walletBalance, setWalletBalance] = useState(
        localStorage.getItem('walletBalance')
    );

    const [totalExpense, setTotalExpense] = useState(
        localStorage.getItem('totalExpense')
    );

    const [expense, setExpense] = useState(
        localStorage.getItem('expense')
    );

    const handleAddWalletBalance = (e, income) => {
        e.preventDefault();
        if(!isNaN(income)){
            if(income > 0){
                const newBalance = parseInt(walletBalance) + parseInt(income);
                setWalletBalance(newBalance);
                localStorage.setItem('walletBalance', newBalance);
                setShowAddBalance(false);
            }else{
                alert('Please enter a valid amount.');
            }
        }
    };

    const handleAddExpense = (newExpense) => {
        setExpense((prevExpense) => [...prevExpense, newExpense]);
        localStorage.setItem('expense', JSON.stringify([...expense, newExpense]));

        const newTotalExpense = totalExpense + newExpense.price;
        setTotalExpense(newTotalExpense);
        localStorage.setItem('totalExpense', newTotalExpense);

        const newWalletBalance = walletBalance - newExpense.price;
        setWalletBalance(newWalletBalance);
        localStorage.setItem('walletBalance', newWalletBalance);

        setShowAddExpense(false);
    };

    return(
        <div className='hero-section'>
            <div className='hero-content'>
                <div className='walletBalance'>
                    <h3>Wallet Balance: ${walletBalance}</h3>
                    <button className='addIncome' onClick={() => setShowAddBalance(true)}>+Add Income</button> 
                </div>
                <div className='expenses'>
                    <h3>Expenses: ${totalExpense}</h3>
                    <button className='addExpense' onClick={() => setShowAddExpense(true)}>+Add Expense</button>
                </div>
                <div className='pieCHart'></div>
            </div>

            {showAddBalance && (
                <AddIncomeModal handleAddWalletBalance={handleAddWalletBalance} setShowAddBalance={setShowAddBalance}/>
            )}

            {showAddExpense && (
                <AddExpenseModal handleAddExpense={handleAddExpense} setShowAddExpense={setShowAddExpense} />
            )}
        </div>
    );
};

export default Hero;