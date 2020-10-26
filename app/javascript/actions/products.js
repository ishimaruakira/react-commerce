
export function getData() {
  return function(dispatch, getState) {
    const state = getState()
    console.log(state)
    let url = `/api/v1/products.json?search=${state.search}&page=${state.page}&category_id=${state.category_id || ''}`;
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "DATA_LOADED", payload: json });
      });
  };
}

export function selectCategory(id) {
  return function(dispatch) {
    dispatch({
      type: 'SELECT_CATEGORY',
      category_id: id
    })
    return dispatch(getData());
  }
}

export function doSearch(val) {
  return function(dispatch) {
    dispatch({
      type: 'PERFORM_SEARCH',
      search: val
    })
    return dispatch(getData());
  }
}

export function changePage(page) {
  return function(dispatch) {
    dispatch({
      type: 'CHANGE_PAGE',
      page: page
    })
    return dispatch(getData());
  }
}

export function isLoading(bool) {
  return {
    type: 'IS_LOADING',
    isLoading: bool
  }
}