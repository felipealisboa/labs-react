import React, { Component } from 'react';

class Data extends Component {


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


        renderTableData() {
        return this.state.users.map((user, index) => {
           const { id, name, username, email } = user //destructuring
           return (
              <tr key={id}>
                 <td>{user.id}</td>
                 <td>{user.name}</td>
                 <td>{user.username}</td>
                 <td>{user.email}</td>

                 <td><button type="button" class="btn btn-success btn-sm" onClick={this.handleClick}>Detail</button></td>
              </tr>
               )
            })
         }

   render(){

     return (

       <div>
          {this.renderTableData()}

       </div>
     )
   }
 }

export default Data;
