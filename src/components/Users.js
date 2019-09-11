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
              <h5 className="card-title">{user.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                UserName: {user.username}<br/>
                Email: {user.email}<br/>
                ZipCode: {user.address.zipcode}
              </h6>
            </div>
          </div>
        ))}

        </div>
       </div>
    );
  }
}

export default Users;
