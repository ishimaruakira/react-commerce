import React from "react"
import PropTypes from "prop-types"
import Currency from 'react-currency-formatter';

class Item extends React.Component {
  removeItem = (e) => {
    e.preventDefault()
    this.props.didRemoveItem(this.props.product)
  }

  increment = (e) => {
    e.preventDefault()
    this.props.didUpdateItem(this.props.product, this.props.quantity + 1)
  }

  decrement = (e) => {
    e.preventDefault()
    if (this.props.quantity > 1)
      this.props.didUpdateItem(this.props.product, this.props.quantity - 1)
    else
      this.props.didRemoveItem(this.props.product)
  }

  render () {
    return (
      <React.Fragment>
        <div className="list-group-item">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{this.props.product.name}</h5>
            <small><a href='#' onClick={this.removeItem} className='btn btn-danger'>Remove</a></small>
          </div>
          <p><Currency quantity={this.props.product.price} currency="GBP" /></p>
          <div className="mb-1 form-inline">
            <label className='mr-3'>Quantity:</label>
            <div className='input-group input-group-sm'>
              <div className="input-group-prepend">
                <button onClick={this.decrement} className='btn btn-secondary btn-number btn-sm'>-</button>
              </div>
              <input type='text' readOnly disabled value={this.props.quantity} className='text-center w-25' />
              <div className="input-group-append">
                <a href='#' onClick={this.increment} className='btn btn-secondary btn-sm'>+</a>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Item.propTypes = {
  product: PropTypes.object.isRequired,
  quantity: PropTypes.number.isRequired,
  didRemoveItem: PropTypes.func.isRequired,
  didUpdateItem: PropTypes.func.isRequired
};
export default Item
