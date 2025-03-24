import { useState } from "react";
import { MdFastfood, MdLocalGroceryStore, MdDirectionsBus, MdMovie } from "react-icons/md";
import { FaEdit, FaTrash } from "react-icons/fa"; 
import AddExpenseModal from '../Modal/AddExpenseModal';
import BarGraph from "../BarGraph/BarGraph";
import './Expenses.css';
const Expenses = ({ setWalletBalance,
    setTotalExpense,
    expense, setExpense,
    topExpensesData
}) => {
    const [editExpense, setEditExpense] = useState(false);
    const [targetExpense, setTargetExpense] = useState({});

    const handleDelete = (exp) => {
        setExpense(expense.filter((item) => item.id !== exp.id));
        setTotalExpense((prevExp) => prevExp - parseFloat(exp.price));
        setWalletBalance((prevBalance) => parseFloat(prevBalance) + parseFloat(exp.price));
    };

    const getCategoryIcon = (category) => {
        switch(category) {
            case "Food":
                return <MdFastfood className="icon" />;
            case "Grocery":
                return <MdLocalGroceryStore className="icon" />;
            case "Transportation":
                return <MdDirectionsBus className="icon" />;
            case "Entertainment":
                return <MdMovie className="icon" />;
            default:
                return null;
        }
    }; 

    const handleEditClick = (exp) => {
        setEditExpense(true);
        setTargetExpense(exp);
    };

    const handleEditExpense = (updatedExpense) => {
        console.log(updatedExpense);
        setExpense((prevExpense) => 
        prevExpense.map((exp) => (
            exp.id === updatedExpense.id ? updatedExpense : exp
        )));

        const oldExpense = expense.find((exp) => exp.id === updatedExpense.id);
        if (oldExpense) {
            const priceDifference = parseFloat(updatedExpense.price) - parseFloat(oldExpense.price);
            setTotalExpense((prevTotal) => prevTotal + priceDifference);
            setWalletBalance((prevBalance) => prevBalance - priceDifference);
        }

        setEditExpense(false);
    };
    
    return(
        <div className="transactions">
            <div className="recent-transactions">
                <h2>Recent Transactions</h2>
                {expense.length > 0 ? (
                    expense.map((exp) => (
                        <div key={exp.id} className="transaction">
                            <section className="left">
                                {getCategoryIcon(exp.category)}
                                <div className="expense-details">
                                    <p className="category">{exp.title}</p>
                                    <p className="date">{exp.date}</p>
                                </div>
                            </section>
                            <section className="right">
                                <div className="price">
                                    <p>${exp.price}</p>
                                </div>
                                <div className="edit-del">
                                    <FaEdit className="edit" onClick={() => handleEditClick(exp)}/>
                                    <FaTrash  className="del" onClick={() => handleDelete(exp)}/>
                                </div>
                            </section>
                        </div>
                    ))
                ) : (
                    <p>No transactions yet</p>
                )}
            </div>
            <div className="top-expenses">
                <h2>Top Expenses</h2>
                <BarGraph data={topExpensesData}/>
            </div>

            {editExpense && (
                <AddExpenseModal target={targetExpense} handleAddExpense={handleEditExpense} setShowAddExpense={setEditExpense} />
            )}
        </div>
    );
};

export default Expenses;