import React from 'react';
import SkyLight from 'react-skylight';
import { SERVER_URL } from '../constants.js'

class ExpenseDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expense: {
                category: {}
            }
        };
    }

    componentDidMount() {
    }

    doView = (expenseId) => {
        this.viewDialog.show()
        this.fetchExpenseById(expenseId);
    }

    fetchExpenseById = (expenseId) => {
        fetch(SERVER_URL + 'expense/' + expenseId)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    expense: responseData,
                });
            })
            .catch(err => console.error(err));
    }

    doEdit = () => {
        this.props.doEdit(this.state.expense);
        this.viewDialog.hide();
    }

    render() {
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref={ref => this.viewDialog = ref } >
                    <h3>{this.state.expense.name}</h3>
                    <div>
                        <span>Description :</span>
                        <span>{this.state.expense.description}</span>
                    </div>
                    <div>
                        <span>Amount :</span>
                        <span>{this.state.expense.amount}</span>
                    </div>
                    <div>
                        <span>Category :</span>
                        <span>{this.state.expense.category.name}</span>
                    </div>
                    <button onClick={this.doEdit}>Edit</button>
                    <button onClick={this.doClose}>Cancel</button>
                </SkyLight>
            </div>
        );
    }
}

export default ExpenseDetail;