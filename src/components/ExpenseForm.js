import React from 'react';
import SkyLight from 'react-skylight';

class ExpenseForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: '', description: '', category: '', amount: '' };
    }

    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
    }

    // Add new expense
    addExpense(expense) {
        fetch(SERVER_URL + 'api/cars',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(car)
            })
            .then(res => this.fetchCars())
            .catch(err => console.error(err))
    }

    render() {
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref="addDialog">
                    <h3>New Expense</h3>
                    <form>
                        <input type="text" placeholder="Name" name="name"
                            onChange={this.handleChange} /><br />
                        <input type="text" placeholder="Description" name="description"
                            onChange={this.handleChange} /><br />
                        <input type="text" placeholder="Category" name="category"
                            onChange={this.handleChange} /><br />
                        <input type="text" placeholder="Amount" name="amount"
                            onChange={this.handleChange} /><br />
                        <button onClick={this.handleSubmit}>Save</button>
                        <button onClick={this.cancelSubmit}>Cancel</button>
                    </form>
                </SkyLight>
                <div>
                    <button style={{ 'margin': '10px' }}
                        onClick={() => this.refs.addDialog.show()}>New Expense</button>
                </div>
            </div>
        );
    }
}

export default ExpenseForm;