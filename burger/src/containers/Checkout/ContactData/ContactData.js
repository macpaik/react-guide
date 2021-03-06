import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import styles from './Contact.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    orderHandler = (event) => {
        event.preventDefault();
        const order = {
          ingredients: this.props.ings,
          price: this.props.price,
          customer: {
            name: 'Paik',
            address: {
              street: 'Teststreet 1',
              zipCode: '41351',
              country: 'Japan'
            },
            email: 'test@test.test'
          },
          deliveryMethod: 'fastest'
        };

        this.props.onOrderBurger(order);
    }

    render() {
        let form = (
            <form>
                <input className={styles.Input} type="text" name="name" placeholder="Your name" />
                <input className={styles.Input} type="text" name="email" placeholder="Your email" />
                <input className={styles.Input} type="text" name="street" placeholder="Your street" />
                <input className={styles.Input} type="text" name="postalCode" placeholder="Your Postal code" />
                <Button
                    btnType="Success"
                    clicked={this.orderHandler}
                >
                    ORDER
                </Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));