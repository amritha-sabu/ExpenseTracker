import { useState } from "react";
import { MdFastfood, MdLocalGroceryStore, MdDirectionsBus, MdMovie } from "react-icons/md";
import { FaEdit, FaTrash } from "react-icons/fa"; 
import AddExpenseModal from '../Modal/AddExpenseModal';
import './Expenses.css';
const Expenses = ({ setWalletBalance,
    setTotalExpense,
    expense, setExpense
}) => {
    const [editExpense, setEditExpense] = useState(false);
    const [targetExpense, setTargetExpense] = useState({});

    const handleDelete = (exp) => {
        setExpense(expense.filter((item) => item.id !== exp.id));
        setTotalExpense((prevExp) => prevExp - exp.price);
        setWalletBalance((prevBalance) => prevBalance + exp.price);
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

    const handleEditExpense = (exp) => {
        setEditExpense(true);
        setTargetExpense(exp);
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
                                    <p className="category">{exp.category}</p>
                                    <p className="date">{exp.date}</p>
                                </div>
                            </section>
                            <section className="right">
                                <div className="price">
                                    <p>${exp.price}</p>
                                </div>
                                <div className="edit-del">
                                    <FaEdit className="edit" onClick={() => handleEditExpense(exp)}/>
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
            </div>

            {editExpense && (
                <AddExpenseModal target={targetExpense} handleAddExpense={handleEditExpense} setShowAddExpense={setEditExpense} />
            )}
        </div>
    );
};

export default Expenses;