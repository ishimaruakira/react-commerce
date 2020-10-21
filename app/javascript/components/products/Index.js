import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import Currency from 'react-currency-formatter';
import { Link } from "react-router-dom";

import Pagination from "../Pagination"
import Categories from "./Categories"

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      categories: [],
      current_page: 1,
      total_pages: 1,
      search: '',
      category_id: null
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
    fetch(`/api/v1/products.json?search=${this.state.search}&page=${page}&category_id=${this.state.category_id || ''}`)
      .then((response) => {return response.json()})
      .then((data) => {this.setState( data ) });
  }

  pageChanged = (page) => {
    this.loadData(page);
  }

  selectCategory = (id) => {
    this.setState({category_id: id}, this.loadData);
  }

  render () {
    return (
      <React.Fragment>
        <div className='row'>
          <div className='col-md-3 d-none d-md-block'>
            <Categories categories={this.state.categories} total_records={this.state.total_records} current_category={this.state.category_id} onCategorySelect={this.selectCategory} />
          </div>
          <div className='col-12 col-md-9'>
            <div className='input-group mb-3'>
              <input type='text' className='form-control' placeholder='Search' onChange={this.doSearch} />
            </div>
            <div className='row'>
              {this.state.products.map(product => (
                <div className='col-6 col-lg-4 col-xl-3 mb-3' key={product.id}>
                  <div className='card h-100'>
                    <div className="embed-responsive embed-responsive-16by9">
                     <img alt="Card image cap" className="card-img-top embed-responsive-item" src={product.image_url} />
                    </div>
                    <div className='card-body d-flex flex-column'>
                      <h5 className='card-title'>{product.name}</h5>
                      <p className='card-text'><Currency quantity={product.price} currency="GBP" /></p>
                      <Link
                        to={`/products/${product.id}`}
                        className="btn btn-primary mt-auto"
                        role="button"
                      >
                        View Details
                      </Link>
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

Index.propTypes = {
  products: PropTypes.array,
  categories: PropTypes.array,
  search: PropTypes.string,
  category_id: PropTypes.number
};
export default Index
