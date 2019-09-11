import React, { Component, useState } from 'react';

class Users extends Component {

  state = {
    users: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then((data) => {
        this.setState({
          users: data
        })
        console.log(this.state.users)
      })
      .catch(console.log)
  }




  render() {
    return (
      <div className="container">
        <div className="col-xs-12">
        <h1>Users</h1>
        {this.state.users.map((user) => (
          <div className="card">
            <div className="card-body">
            <table class="table table-hover">
                <thead display="block">
                  <tr>
                    <th scope="col">#Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Zip code</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.address.zipcode}</td>
                  </tr>
                </tbody>
                </table>
            </div>
          </div>
        ))}
        </div>
      </div>
    );
  }
}

export default Users;
