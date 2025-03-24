import { useState } from 'react';
import './Modal.css';

const AddExpenseModal = ({ target, handleAddExpense, setShowAddExpense}) => {
    const [formData, setFormData] = useState({
        title : target ? target.title : '',
        price : target ? target.price : '',
        category : target ? target.category : '',
        date : target ? target.date : '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const expense = {
            id: target? target.id : Date.now(),
            title: formData.title,
            price: parseFloat(formData.price),
            category: formData.category,
            date: formData.date
        }
        handleAddExpense(expense);
    };

    return(
        <div className='overlay'>
            <div className='addExpenseForm'>
                <h2>Add Expenses</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input type='text' name='title' value={formData.title} onChange={handleChange} placeholder='Title' required/>
                    <input type='number' name='price' value={formData.price} onChange={handleChange} placeholder='Price' required/>
                    <select name='category' value={formData.category} onChange={handleChange} required>
                        <option value="" disabled >Select Category</option>
                        <option value="Food">Food</option>
                        <option value="Grocery">Grocery</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Entertainment">Entertainment</option>
                    </select>
                    <input type='date' name='date' value={formData.date} onChange={handleChange} required/>
                    <button type='submit' className='addButton'>Add Expense</button>
                    <button onClick={() => setShowAddExpense(false)}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default AddExpenseModal;