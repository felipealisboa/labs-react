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

        var people,
            asc1 = 1,
            asc2 = 1,
            asc3 = 1;
        window.onload = function () {
            people = document.getElementById("people");
        }

        function sort_table(tbody, col, asc) {
            var rows = tbody.rows,
                rlen = rows.length,
                arr = new Array(),
                i, j, cells, clen;
            // fill the array with values from the table
            for (i = 0; i < rlen; i++) {
                cells = rows[i].cells;
                clen = cells.length;
                arr[i] = new Array();
                for (j = 0; j < clen; j++) {
                    arr[i][j] = cells[j].innerHTML;
                }
            }
            // sort the array by the specified column number (col) and order (asc)
            arr.sort(function (a, b) {
                return (a[col] == b[col]) ? 0 : ((a[col] > b[col]) ? asc : -1 * asc);
            });
            // replace existing rows with new rows created from the sorted array
            for (i = 0; i < rlen; i++) {
                rows[i].innerHTML = "<td>" + arr[i].join("</td><td>") + "</td>";
            }


  render() {
    return (
      <div className="container">
        <div className="col-md">
        <h1>Users</h1>

          <div className="card">
            <div className="card-body">
            <table class="table table-hover">
                <thead>
                  <tr>
                    <th id="idSort" scope="col">#Id</th>
                    <th scope="col">Name</th>
                    <th id="username" scope="col">User Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Zip code</th>
                    <th scope="col">Open Detail</th>
                </tr>
                </thead>
                <tbody>
                {this.state.users.map((user) => (
                  <tr>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.address.zipcode}</td>
                    <td><button type="button" class="btn btn-success btn-sm">Detail</button></td>
                  </tr>
                ))}
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
