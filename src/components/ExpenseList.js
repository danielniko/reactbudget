import React, { Component } from 'react';
import { SERVER_URL } from '../constants.js'
import ReactTable from "react-table";
import 'react-table/react-table.css';
import ExpenseForm from './ExpenseForm.js';
import ExpenseDetail from './ExpenseDetail.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ExpenseList extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            expenses: []
        };
    }

    componentDidMount() {
        this.fetchExpenses();
    }

    // Delete expense
    doDelete = (link) => {
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

    doEdit = (expense) => {
        this.expenseForm.doOpenForm(expense);
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
            Cell: ({ value }) => (<button onClick={() => { this.doDelete(value) }}>Delete</button>)
        }, {
            id: 'viewbutton',
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'expenseId',
            Cell: ({ value }) => (<button onClick={() => { this.expenseDetail.doView(value) }}>View</button>)
        }]

        return (
            <div className="App">
                <div>
                    <button style={{ 'margin': '10px' }}
                        onClick={() => this.expenseForm.doOpenForm()}>New Expense</button>
                </div>
                <ExpenseForm ref={ref => this.expenseForm = ref } fetchExpenses={this.fetchExpenses} expense={this.state.expense} />
                <ExpenseDetail ref={ref => this.expenseDetail = ref } doEdit={this.doEdit} />
                <ReactTable data={this.state.expenses} columns={columns}
                    filterable={true} />
                <ToastContainer autoClose={1500} />
            </div>
        );
    }
}

export default ExpenseList;