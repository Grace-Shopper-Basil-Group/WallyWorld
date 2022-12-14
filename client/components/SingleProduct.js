import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../store/product.js';
import { addItemToCart } from '../store/cart.js';
import history from '../history'

export class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const productId = this.props.match.params.id;
    this.props.loadProduct(productId);
  }

  handleClick() {
    const token = window.localStorage.getItem('token');
    if (token) {
      const cartId = this.props.cart.id
      this.props.addToCart(token, this.props.product, cartId)
    } else {
      let cart = JSON.parse(window.localStorage.getItem('cart'));
      let inCart = false;
      let productToAdd = this.props.product
      cart.products.forEach((productInStorage) => {
        if (productToAdd.id === productInStorage.id) {
          productInStorage.quantity++;
          inCart = true;
        }
      })
      if (!inCart) {
        productToAdd.quantity = 1;
        cart.products.push(productToAdd)
      }
      window.localStorage.setItem('cart', JSON.stringify(cart))
      history.push('/cart')
    }
  }

  render() {
    return (
      <div>
        <h1>{this.props.product.name}</h1>
        <h2>{this.props.product.price}</h2>
        <h3>{this.props.product.description}</h3>
        <img src={this.props.product.imageUrl} />
        <button onClick={this.handleClick}>Add to Cart</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadProduct: (id) => {
      dispatch(fetchProduct(id));
    },
    addToCart: (token, item, cartId) => {
      dispatch(addItemToCart(token, item, cartId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
