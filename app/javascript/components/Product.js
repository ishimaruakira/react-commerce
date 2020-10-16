import React from "react"
import PropTypes from "prop-types"
class Product extends React.Component {
  render () {
    return (
      <React.Fragment>
        Id: {this.props.id}
        Name: {this.props.name}
        Description: {this.props.description}
        Price: {this.props.price}
      </React.Fragment>
    );
  }
}

Product.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number
};
export default Product
