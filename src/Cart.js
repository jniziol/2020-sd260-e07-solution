import React from "react";
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

class Cart extends React.Component {
  render = () => {
    return (
      <aside className="cart">
        <h2>Your Cart</h2>
        {
          this.props.cartItems.length > 0 ?
          <>
            <ul>
              {this.props.cartItems.map(cartItem => (
                <CartItem cartItem={cartItem} removeFromCart={this.props.removeFromCart}/>
              ))}
            </ul>
            <div className="total">Total: ${this.props.cartItems.reduce((acc, ci) => acc + ci.price, 0).toFixed(2)}</div>
          </>
          :
          <div>
            Your cart is Empty
          </div>
        }

        <Link className="keep-shopping" to="/">
          <i className="fas fa-chevron-left"></i>
          Keep Shopping
        </Link>
      </aside>
    );
  }
}

export default Cart;