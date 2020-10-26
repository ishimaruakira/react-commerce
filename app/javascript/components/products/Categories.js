import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { connect } from "react-redux";
import { selectCategory } from "../../actions/products";

class Categories extends React.Component {

  selectCategory(id, e) {
    e.preventDefault();
    this.props.selectCategory(id);
  }

  render () {
    return (
      <React.Fragment>
        <ul className='nav flex-column'>
          <li className={classNames('nav-item d-flex justify-content-between align-items-center', {'active': this.props.current_category == null})}>
            <a className='nav-link' href='#' onClick={this.selectCategory.bind(this, null)}>All</a>
            <span className='badge badge-pill badge-primary'>{this.props.total_records}</span>
          </li>

          {this.props.categories.map(category => (
            <li className={classNames('nav-item d-flex justify-content-between align-items-center', {'active': category.id == this.props.current_category})} key={category.id}>
              <a className='nav-link' href='#' onClick={this.selectCategory.bind(this, category.id)}>{category.name}</a>
              <span className='badge badge-pill badge-primary'>{category.product_count}</span>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    total_records: state.total_records,
    current_category: state.category_id
  };
}

Categories.propTypes = {
  // categories: PropTypes.array,
  // current_category: PropTypes.number,
  // total_records: PropTypes.number,
  // onCategorySelect: PropTypes.func
};
export default connect(
  mapStateToProps,
  { selectCategory }
)(Categories);
