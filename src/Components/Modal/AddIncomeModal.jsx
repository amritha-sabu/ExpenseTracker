import './Modal.css';
import { useState } from 'react';

const AddIncomeModal = ({handleAddWalletBalance, setShowAddBalance}) => {
    const [income, setIncome] = useState(0);

    const handleInputChange = (e) => {
        setIncome(e.target.value);
    }

    return (
        <div className='overlay'>
            <div className='addIncomeForm'>
                <h2>Add Balance</h2>
                <form onSubmit={(e) => handleAddWalletBalance(e, income)}>
                    <input 
                    type='number' 
                    name='income' 
                    placeholder='Income Amount'
                    onChange={handleInputChange}
                    required/>
                    <button type='submit' className='addButton'>Add Balance</button>
                    <button onClick={() => setShowAddBalance(false)}>Cancel</button>
                </form>
            </div>
        </div>
    )
};

export default AddIncomeModal;