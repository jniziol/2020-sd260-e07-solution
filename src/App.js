import React from 'react';
import Header from './Header';
import Item from './Item';
import Cart from './Cart'
import {Switch, Route } from 'react-router-dom';

class App extends React.Component {

  state = {
    items: [],
    cartItems: [],
  }

  componentDidMount = () => {
    fetch('https://5ed0108416017c00165e327c.mockapi.io/api/v1/items')
      .then(resp => resp.json())
      .then(data => {
        this.setState({items: data});
      });
  }

  addItemToCart = item => {
    this.setState(prevState => ({
      cartItems: [...prevState.cartItems, {...item}]
    }))
  }

  removeFromCart = item => {
    this.setState(prevState => ({
      cartItems: prevState.cartItems.filter(ci => ci !== item)
    }))
  }

  render = () => {
    return (
      <>
        <Header numberOfItems={this.state.cartItems.length} totalPrice={this.state.cartItems.reduce((acc, ci) => acc + ci.price, 0)} />
        <main>
          <Switch>
            <Route exact path="/cart">
              <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart} />
            </Route>

            <Route exact path="/">
              <ul class="items">
                {this.state.items.map(item => (
                  <Item item={item} key={item.id} addItemToCart={this.addItemToCart}/>
                ))}
              </ul>
            </Route>
          </Switch>
        </main>
      </>
    )
  }
}

export default App;
