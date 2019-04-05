import React, { Component } from 'react';
import { SERVER_URL } from '../constants.js'
import ReactTable from "react-table";
import 'react-table/react-table.css';
import ExpenseForm from './ExpenseForm.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ExpenseList extends Component {

    constructor(props) {
        super(props);
        this.state = { expenses: [] };
    }

    componentDidMount() {
        this.fetchExpenses();
    }

    // Add new expense
    addExpense(expense) {
        fetch(SERVER_URL + 'expense/add',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(expense)
            })
            .then(res => this.fetchExpenses())
            .catch(err => console.error(err))
    }

    // Delete expense
    onDelClick = (link) => {
        fetch(SERVER_URL + 'expense/' + link,
            { method: 'DELETE' })
            .then(res => {
                toast.success("Expense deleted", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                this.fetchExpenses();
            })
            .catch(err => {
                toast.error("Error when deleting", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                console.error(err)
            })
    }

    fetchExpenses = () => {
        fetch(SERVER_URL + 'expense')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    expenses: responseData,
                });
            })
            .catch(err => console.error(err));
    }

    render() {
        const columns = [{
            Header: 'Name',
            accessor: 'name'
        }, {
            Header: 'Description',
            accessor: 'description',
        }, {
            Header: 'Category',
            accessor: 'category.name',
        }, {
            Header: 'Amount',
            accessor: 'amount',
        }, {
            id: 'delbutton',
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'expenseId',
            Cell: ({ value }) => (<button onClick={() => { this.onDelClick(value) }}>Delete</button>)
        }]

        return (
            <div className="App">
                <ExpenseForm addExpense={this.addExpense} fetchExpenses={this.fetchExpenses} />
                <ReactTable data={this.state.expenses} columns={columns}
                    filterable={true} />
                <ToastContainer autoClose={1500} />
            </div>
        );
    }
}

export default ExpenseList;