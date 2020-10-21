import React from "react"
import PropTypes from "prop-types"
import BasketItem from "./basket/Item"

class Basket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      basket: []
    };
  }

  componentDidMount(){
    this.loadData()
  }

  removeItem = (product) => {
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrf
      },
      body: JSON.stringify({ product_id: product.id })
    }
    fetch('/api/v1/basket', requestOptions)
      .then(response => response.json())
      .then(data => {
        var newItems = this.state.basket.filter((item) => {
          return item.product.id != product.id;
        });

        this.setState({ basket: newItems });
      })
  }

  updateItem = (product, quantity) => {
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrf
      },
      body: JSON.stringify({ product_id: product.id, quantity: quantity })
    }
    fetch('/api/v1/basket', requestOptions)
      .then(response => response.json())
      .then(data => {
        let items = this.state.basket
        const itemIndex = items.findIndex((item) => item.product.id == product.id)
        items[itemIndex].quantity = data.quantity
        console.log(items[itemIndex])
        this.setState({ basket: items});
      })
  }

  loadData = (page) => {
    fetch(`/api/v1/basket.json`)
      .then((response) => {return response.json()})
      .then((data) => {this.setState( data ) });
  }


  render () {
    return (
      <React.Fragment>
        <div className='list-group'>
          {this.state.basket.map(item => (
            <BasketItem 
              product={item.product}
              quantity={item.quantity}
              didRemoveItem={this.removeItem}
              didUpdateItem={this.updateItem}
              key={item.product.id} />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Basket
