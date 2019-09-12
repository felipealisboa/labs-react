import React, { Component, useState } from 'react';
import Datasort from 'react-data-sort';
import PropTypes from 'prop-types';
import Paginacion from './Pagination';


  const propTypes = {
      items: PropTypes.array.isRequired,
      onChangePage: PropTypes.func.isRequired,
      initialPage: PropTypes.number,
      pageSize: PropTypes.number
  }

  const defaultProps = {
      initialPage: 1,
      pageSize: 5
  }

class Users extends Component {

      state = {
      users: [],
      pager: {},
      pageOfItems: []
      }

      componentDidMount() {
        const url = 'http://localhost:3000/users';

        if(url.length > 0){
        fetch(url)
          .then(res => res.json())
          .then((data) => {
            this.setState({
              users: data,

            })
            this.setPage(this.props.initialPage);
            console.log(this.state.users)
          })
          .catch(console.log)
      } else{
        alert("Dont have date to fetch" )
        return;
      }
    }

      componentWillUnmount() {
        console.log('component will unmount');
      }

      componentDidUpdate(prevProps, prevState) {
          // reset page if items array has changed
          if (this.props.items !== prevProps.items) {
              this.setPage(this.props.initialPage);
          }
      }

      onChangePage(pageOfItems) {
          // update state with new page of items
          this.setState({ pageOfItems: pageOfItems });
      }

      getPager(totalItems, currentPage, pageSize) {
          // default to first page
          currentPage = currentPage || 1;

          // default page size is 5
          pageSize = pageSize || 5;

          // calculate total pages
          var totalPages = Math.ceil(totalItems / pageSize);

          var startPage, endPage;
          if (totalPages <= 5) {
              // less than 5 total pages so show all
              startPage = 1;
              endPage = totalPages;
          }
          // calculate start and end item indexes
          var startIndex = (currentPage - 1) * pageSize;
          var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

          // create an array of pages to ng-repeat in the pager control
          var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

          // return object with all pager properties required by the view
          return {
              totalItems: totalItems,
              currentPage: currentPage,
              pageSize: pageSize,
              totalPages: totalPages,
              startPage: startPage,
              endPage: endPage,
              startIndex: startIndex,
              endIndex: endIndex,
              pages: pages
          };
      }

      openDetail(user) {
        alert('Loading data of the user...')
      }

      renderTableData() {
        return this.state.users.map((user, index) => {
           const { id, name, username, email, address } = user //destructuring
           return (
              <tr key={id}>
                 <td>{user.id}</td>
                 <td>{user.name}</td>
                 <td>{user.username}</td>
                 <td>{user.email}</td>
                 <td>{user.address.zipcode}</td>
                 <td><button type="button" class="btn btn-success btn-sm" onClick={this.openDetail}>Detail</button></td>
              </tr>
               )
            })
         }


  render() {
    var pager = this.state.pager;

    return (

      <div className="container">
        <div className="col-md">
        <h1>Users</h1>

          <div className="card">
            <div className="card-body">
            <table id="selectedColumn" class="table table-hover table-striped table-bordered table-sm" cellspacing="0" width="100%">
                <thead>
                  <tr>
                    <th class="sorting" scope="col" onClick={this.state.users.sort}>#Id</th>
                    <th scope="col">Name</th>
                    <th class="sorting" scope="col" onClick={this.state.users.sort}>User Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Zip code</th>
                    <th scope="col">Open Detail</th>
                </tr>
                </thead>
                  <tbody>
                    {this.renderTableData()}
                  </tbody>
                </table>

                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Users;
