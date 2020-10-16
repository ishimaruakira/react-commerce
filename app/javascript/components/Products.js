import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import Pagination from "./Pagination"

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      categories: [],
      current_page: 1,
      total_pages: 1,
      search: '',
      category_id: ''
    };
  }

  componentDidMount(){
    this.loadData(1)
  }

  doSearch = (e) => {
    var val = e.target.value;
    this.setState({search: val}, this.loadData);
  }

  loadData = (page) => {
    fetch('/api/v1/products.json?search=' + this.state.search + '&page=' + page + '&category_id=' + this.state.category_id)
      .then((response) => {return response.json()})
      .then((data) => {this.setState( data ) });
  }

  pageChanged = (page) => {
    this.loadData(page);
  }

  selectCategory(id, e) {
    e.preventDefault();
    this.setState({category_id: id}, this.loadData);
  }

  render () {
    return (
      <React.Fragment>
        <h1>Product List</h1>
        <div className='input-group mb-3'>
          <input type='text' className='form-control' placeholder='Search' onChange={this.doSearch} />
        </div>
        <div className='row'>
          <div className='col-md-3 d-none d-md-block'>
            <ul className='nav flex-column'>
              <li className={classNames('nav-item d-flex justify-content-between align-items-center', {'active': this.state.category_id == ''})}>
                <a className='nav-link' href='#' onClick={this.selectCategory.bind(this, '')}>All</a>
                <span className='badge badge-pill badge-primary'>{this.state.total_records}</span>
              </li>

              {this.state.categories.map(category => (
                <li className={classNames('nav-item d-flex justify-content-between align-items-center', {'active': category.id == this.state.category_id})} key={category.id}>
                  <a className='nav-link' href='#' onClick={this.selectCategory.bind(this, category.id)}>{category.name}</a>
                  <span className='badge badge-pill badge-primary'>{category.product_count}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className='col-12 col-md-9'>
            <div className='row'>
              {this.state.products.map(product => (
                <div className='col-6 col-lg-4 col-xl-3 mb-3' key={product.id}>
                  <div className='card h-100'>
                    <img src={product.image_url} className='card-img-top' />
                    <div className='card-body'>
                      <h5 className='card-title'>{product.name}</h5>
                      <p className='card-text'>{product.description}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className='col-12'>
                <Pagination currentPage={this.state.current_page} totalPages={this.state.total_pages} onPageChange={this.pageChanged} />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Products.propTypes = {
  products: PropTypes.array,
  categories: PropTypes.array,
  search: PropTypes.string,
  category_id: PropTypes.number
};
export default Products
