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
      .then((response) => {return response.json()})
      .then((data) => {this.setState( data ) });
  }

  render () {
    return (
      <React.Fragment>
        <h1><Link to="/">Product List</Link></h1>
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
