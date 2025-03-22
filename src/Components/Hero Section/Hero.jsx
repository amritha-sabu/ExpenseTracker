import { useMemo, useState } from 'react';
import AddIncomeModal from '../Modal/AddIncomeModal';
import AddExpenseModal from '../Modal/AddExpenseModal';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './Hero.css';

const Hero = ({walletBalance, setWalletBalance,
    totalExpense, setTotalExpense,
    expense, setExpense
}) => {
    const [showAddBalance, setShowAddBalance] = useState(false);
    const [showAddExpense, setShowAddExpense] = useState(false);
    // const [walletBalance, setWalletBalance] = useState(
    //     localStorage.getItem('walletBalance')
    // );

    // const [totalExpense, setTotalExpense] = useState(
    //     localStorage.getItem('totalExpense')
    // );

    // const [expense, setExpense] = useState(
    //     JSON.parse(localStorage.getItem('expenses'))
    // );

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
        const updatedExpense = [...expense, newExpense];
        setExpense(updatedExpense);
        localStorage.setItem('expenses', JSON.stringify([...expense, newExpense]));

        const newTotalExpense =parseFloat(totalExpense) + parseFloat(newExpense.price);
        setTotalExpense(newTotalExpense);
        localStorage.setItem('totalExpense', newTotalExpense);

        const newWalletBalance = parseFloat(walletBalance) - parseFloat(newExpense.price);
        if(newWalletBalance < 0){
            alert('You do not have enough balance to add this expense.');
        }else{
            setWalletBalance(newWalletBalance);
            localStorage.setItem('walletBalance', newWalletBalance);

            setShowAddExpense(false);
        }
    };

    const pieChartData = useMemo(() => {
        if(!expense || expense.length === 0)
            return [];
        const categoryTotal = expense.reduce((acc, exp) => {
            acc[exp.category] = (acc[exp.category] || 0) + exp.price;
            return acc;
        }, {});

        return Object.keys(categoryTotal).map((category) => ({
            name: category,
            value: categoryTotal[category]
        }));
    },[expense]);

    const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'];

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
                <div className='pieCHart'>
                    {pieChartData.length > 0 ? (
                        <PieChart width={300} height={300}>
                            <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    ) : (
                        <p>No expenses added yet.</p>
                    )}
                </div>
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