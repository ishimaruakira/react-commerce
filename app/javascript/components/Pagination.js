import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

class Pagination extends React.Component {

  minPage() {
    return Math.max(1, this.props.currentPage - 5);
  }

  maxPage() {
    return Math.min(this.minPage()+9, this.props.totalPages);
  }

  pageRange() {
    let i = this.minPage();
    const range = [];

    while (i <= this.maxPage()) {
      range.push(i);
      i += 1;
    }
    return range;
  }

  onPageChange(page, e) {
    e.preventDefault();
    this.props.onPageChange(page);
  }

  render () {
    if (this.props.totalPages == 1)
      return (<React.Fragment />)

    return (
      <React.Fragment>
      <nav aria-label="Page navigation">
        <ul className="pagination">
          {this.props.currentPage > 1 &&
            <li className="page-item"><a className="page-link" href="#" onClick={this.onPageChange.bind(this, this.props.currentPage - 1)}>Previous</a></li>
          }
          {this.pageRange().map(pageNo => (
            <li className={classNames('page-item', {'active': pageNo == this.props.currentPage})} key={pageNo}><a className="page-link" href="#" onClick={this.onPageChange.bind(this, pageNo)}>{pageNo}</a></li>
          ))}
          {this.props.currentPage < this.props.totalPages &&
            <li className="page-item"><a className="page-link" href="#" onClick={this.onPageChange.bind(this, this.props.currentPage + 1)}>Next</a></li>
          }
        </ul>
      </nav>
      </React.Fragment>
    );
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func
};


export default Pagination
