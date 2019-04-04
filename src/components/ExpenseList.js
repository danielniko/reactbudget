import React, { Component } from 'react';
import { SERVER_URL } from '../constants.js'
import ReactTable from "react-table";
import 'react-table/react-table.css';
import ExpenseForm from './ExpenseForm.js';

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
        fetch(SERVER_URL + 'expense',
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

    fetchExpenses = () => {
        fetch(SERVER_URL + 'expenses')
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
        }]

        return (
            <div className="App">
                <ExpenseForm addExpense={this.addExpense} fetchExpenses={this.fetchExpenses}/>
                <ReactTable data={this.state.expenses} columns={columns}
                    filterable={true} />
            </div>
        );
    }
}

export default ExpenseList;