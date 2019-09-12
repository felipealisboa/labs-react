import React, { Component, useState } from 'react';
import Datasort from 'react-data-sort';

class Users extends Component {

      state = {
      users: [],
      sortBy: [
          "id",
          "name"
        ],
      direction: "asc",
      activePage: 0,
    };

      componentDidMount() {
        const url = 'http://localhost:3000/users';
        fetch(url)
          .then(res => res.json())
          .then((data) => {
            this.setState({
              users: data
            })
            console.log(this.state.users)
          })
          .catch(console.log)
      }

      componentWillUnmount() {
        console.log('component will unmount');
      }

      openDetail(user) {
        console.log(user);
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
               <td><button type="button" class="btn btn-success btn-sm" onClick={this.handleClick}>Detail</button></td>
            </tr>
             )
          })
       }

      setSortBy = sortBy => {
        this.setState({ sortBy });
      }

      toggleDirection = () => {
        this.setState({
      direction: this.state.direction === "asc" ? "desc" : "asc"
          });
      };

       goToPage = activePage => {
          this.setState({ activePage });
        };

       prevPage = () => {
          this.setState(({ activePage }) => ({
            activePage: activePage - 1
          }));
        };

        nextPage = () => {
          this.setState(({ activePage }) => ({
            activePage: activePage + 1
          }));
        };

  render() {
    const { sortBy, direction, activePage, searchQuery } = this.state;
    return (
      <Datasort
        data = {this.state.users}
        sortBy={sortBy.id, sortBy.name}
    )
    return (

      <div className="container">
        <div className="col-md">
        <h1>Users</h1>

          <div className="card">
            <div className="card-body">
            <table id="selectedColumn" class="table table-hover table-striped table-bordered table-sm" cellspacing="0" width="100%">
                <thead>
                  <tr>
                    <th class="sorting" scope="col">#Id</th>
                    <th scope="col">Name</th>
                    <th class="sorting" scope="col" >User Name</th>
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
        <div class="row">
          <div class="col-sm-12 col-md-7">
            <div class="dataTables_paginate paging_simple_numbers" id="example_paginate">
              <ul class="pagination">
                <li class="paginate_button page-intem pevious disabled" id="example_previous">
                  <a tabindex="0" class="page-link" aria-controls="example" href="#" data-dt-idx="0">Previous</a>
                </li>
                <li class="paginate_button page-intem active">
                  <a tabindex="0" class="page-link" aria-controls="example" href="#" data-dt-idx="1">1</a>
                </li>
                <li class="paginate_button page-intem">
                  <a tabindex="0" class="page-link" aria-controls="example" href="#" data-dt-idx="2">2</a>
                </li>
                <li class="paginate_button page-intem">
                  <a tabindex="0" class="page-link" aria-controls="example" href="#" data-dt-idx="3">3</a>
                </li>
                <li class="paginate_button page-intem">
                  <a tabindex="0" class="page-link" aria-controls="example" href="#" data-dt-idx="4">4</a>
                </li>
                <li class="paginate_button page-intem">
                  <a tabindex="0" class="page-link" aria-controls="example" href="#" data-dt-idx="5">5</a>
                </li>
                <li class="paginate_button page-intem next" id="example_next">
                  <a tabindex="0" class="page-link" aria-controls="example" href="#" data-dt-idx="6">Next</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Users;
