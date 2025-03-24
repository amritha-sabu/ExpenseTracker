import { useMemo, useState } from 'react';
import AddIncomeModal from '../Modal/AddIncomeModal';
import AddExpenseModal from '../Modal/AddExpenseModal';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './Hero.css';

const Hero = ({walletBalance, setWalletBalance,
    totalExpense, setTotalExpense,
    expense, setExpense,
}) => {
    const [showAddBalance, setShowAddBalance] = useState(false);
    const [showAddExpense, setShowAddExpense] = useState(false);
    

    const handleAddWalletBalance = (e, income) => {
        e.preventDefault();
        if(!isNaN(income)){
            if(income > 0){
                const newBalance = parseInt(walletBalance) + parseInt(income);
                console.log("New Wallet Balance:", newBalance);
                setWalletBalance(newBalance);
                localStorage.setItem('walletBalance', newBalance);
                console.log("LocalStorage Wallet Balance:", localStorage.getItem('walletBalance')); 
                setShowAddBalance(false);
            }else{
                alert('Please enter a valid amount.');
            }
        }
    };

    const handleAddExpense = (newExpense) => {
        const newWalletBalance = parseFloat(walletBalance) - parseFloat(newExpense.price);
        if(newWalletBalance < 0){
            alert('You do not have enough balance to add this expense.');
            return;
        }else{
            const updatedExpense = [...expense, newExpense];
            setExpense(updatedExpense);
            localStorage.setItem('expenses', JSON.stringify([...expense, newExpense]));

            const newTotalExpense =parseFloat(totalExpense) + parseFloat(newExpense.price);
            setTotalExpense(newTotalExpense);
            localStorage.setItem('totalExpense', newTotalExpense);

            setWalletBalance(newWalletBalance);
            localStorage.setItem('walletBalance', newWalletBalance);

            // setTopExpensesData((prevSpend) => {
            //     const updatedSpend = prevSpend.map((item) => {
            //         if(item.category === newExpense.category){
            //             return {
            //                 ...item,
            //                 price : parseFloat(item.price) + parseFloat(newExpense.price),
            //             };
            //         }
            //         return item;
            //     });
            //     return updatedSpend;
            // });

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
                    <h2>Wallet Balance:</h2>
                    <h3>${walletBalance}</h3>
                    <button type='button' className='addIncome' onClick={() => setShowAddBalance(true)}>+ Add Income</button> 
                </div>
                <div className='expenses'>
                    <h2>Expenses:</h2>
                    <h3>${totalExpense}</h3>
                    <button type='button' className='addExpense' onClick={() => setShowAddExpense(true)}>+ Add Expense</button>
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