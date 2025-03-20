import './Modal.css';

const AddExpenseModal = ({handleAddExpense, setShowAddExpense}) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const expense = {
            id: Date.now(),
            title: e.target.title.value,
            price: parseFloat(e.target.price.value),
            category: e.target.category.value,
            date: e.target.date.value
        }
        handleAddExpense(expense);
    };

    return(
        <div className='overlay'>
            <div className='addExpenseForm'>
                <h2>Add Expenses</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input type='text' name='title' placeholder='Title' required/>
                    <input type='number' name='price' placeholder='Price' required/>
                    <select name='category' defaultValue={""} required>
                        <option value="" disabled >Select Category</option>
                        <option value="Food">Food</option>
                        <option value="Grocery">Grocery</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Entertainment">Entertainment</option>
                    </select>
                    <input type='date' name='date' required/>
                    <button type='submit' className='addButton'>Add Expense</button>
                    <button onClick={() => setShowAddExpense(false)}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default AddExpenseModal;