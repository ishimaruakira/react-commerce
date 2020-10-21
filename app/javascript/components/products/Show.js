import React from "react"
import PropTypes from "prop-types"
import Currency from 'react-currency-formatter';
import { Link } from "react-router-dom";


class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    };
  }


  componentDidMount(){
    this.loadData()
  }

  loadData = (page) => {
    const { match: { params } } = this.props;
    fetch(`/api/v1/products/${params.product_id}.json`)
      .then(response => response.json())
      .then(data => this.setState( data ) );
  }

  addItem = (e) => {
    e.preventDefault()
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrf
      },
      body: JSON.stringify({ product_id: this.state.product.id })
    }
    fetch('/api/v1/basket', requestOptions)
      .then(response => response.json())
      .then(data => this.notifySuccess())
  }

  notifySuccess() {
    alert('added')
  }


  render () {
    return (
      <React.Fragment>
        <div className='row'>
          <div className='col-2'>
            <div className='border rounded d-flex flex-wrap align-items-center h-100'>
              <img src={this.state.product.image_url} className='img-fluid m-auto'/>
            </div>
          </div>
          <div className='col'>
            <h1>{this.state.product.name}</h1>
            <p>{this.state.product.description}</p>
            {this.state.product.price &&
              <p><Currency quantity={this.state.product.price} currency="GBP" /></p>
            }
            <a href='#' onClick={this.addItem}>Add to Basket</a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Show.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      product_id: PropTypes.string.isRequired
    })
  })
};
export default Show
