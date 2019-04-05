import React from 'react';
import SkyLight from 'react-skylight';
import { SERVER_URL } from '../constants.js'

class ExpenseForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '', description: '', amount: '',
            categoryId: '', 
            categories : []
        };
    }

    componentDidMount() {
        this.fetchCategories();
    }

    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
    }

    fetchCategories = () => {
        fetch(SERVER_URL + 'category')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    categories: responseData,
                    categoryId: responseData[0].categoryId
                });
            })
            .catch(err => console.error(err));
    }

    // Save expense and close modal form
    handleSubmit = (event) => {
        event.preventDefault();
        var category = {
            categoryId: this.state.categoryId
        };
        var newExpense = {
            name: this.state.name,
            description: this.state.description,
            category: category,
            amount: this.state.amount
        };
        this.props.addExpense(newExpense);
        this.refs.addDialog.hide();
    }

    // Cancel and close modal form
    cancelSubmit = (event) => {
        event.preventDefault();
        this.refs.addDialog.hide();
    }

    render() {
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref="addDialog">
                    <h3>New Expense</h3>
                    <form>
                        <input type="text" placeholder="Name" name="name" value={this.state.name}
                            onChange={this.handleChange} /><br />
                        <input type="text" placeholder="Description" name="description" value={this.state.description}
                            onChange={this.handleChange} /><br />
                        <select name="categoryId" value={this.state.categoryId}
                            onChange={this.handleChange}>
                            {this.state.categories.map(
                                (category) => <option key={category.categoryId} value={category.categoryId}>{category.name}</option>
                            )}
                        </select><br />
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