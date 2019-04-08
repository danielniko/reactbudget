import React from 'react';
import SkyLight from 'react-skylight';
import { SERVER_URL } from '../constants.js'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';

class ExpenseForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expenseId: '',
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

    doOpenForm = (expense) => {
        this.addDialog.show();
        if(expense) {
            this.setState({
                expenseId: expense.expenseId,
                name: expense.name,
                description: expense.description,
                amount: expense.amount,
                categoryId: expense.category.categoryId
            });
            /*
            set state happens asynchronus
            this.setState({expense: ex}, function () {
                console.log("disimpan = " + JSON.stringify(this.state.expense));
            });
            */
        }

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
            expenseId: this.state.expenseId,
            name: this.state.name,
            description: this.state.description,
            category: category,
            amount: this.state.amount
        };
        this.saveExpense(newExpense);
        this.addDialog.hide();
    }

    // Add new expense
    saveExpense(expense) {
        var method = "POST";
        if(expense.expenseId) {
            method = "PUT"
        }
        fetch(SERVER_URL + 'expense',
            {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(expense)
            })
            .then(res => this.props.fetchExpenses())
            .catch(err => console.error(err))
    }

    // Cancel and close modal form
    cancelSubmit = (event) => {
        event.preventDefault();
        this.addDialog.hide();
    }

    render() {
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref={ref => this.addDialog = ref } >
                    <h3>New Expense</h3>
                    <form>
                        <TextField label="Name" placeholder="Name" name="name" value={this.state.name}
                            onChange={this.handleChange}/><br/>
                        <TextField label="Description" placeholder="Description" name="description" value={this.state.description}
                            onChange={this.handleChange}/><br/>
                        <Select name="categoryId" value={this.state.categoryId}
                            onChange={this.handleChange}>
                            {this.state.categories.map(
                                (category) => <option key={category.categoryId} value={category.categoryId}>{category.name}</option>
                            )}
                        </Select><br />


                        <TextField label="Amount" placeholder="amount" name="amount" value={this.state.amount}
                            onChange={this.handleChange}/><br/>
                        <Button variant="contained" color="primary" 
                            onClick={this.handleSubmit}>Save</Button>
                        <Button variant="contained" color="primary" 
                             onClick={this.cancelSubmit}>Cancel</Button>
                    </form>
                </SkyLight>
            </div>
        );
    }
}

export default ExpenseForm;