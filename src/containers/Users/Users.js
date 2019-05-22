import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {


    state={
        selectedUserId:null,
        users : null,
        userListData: [],
        error : false,
        userNotSelected: true,
        inputValue: null
    }

    setUserId=(id)=>{
        axios.get('http://localhost:8080/users/user/'+id)
            .then(response=>{
                console.log(response.data);
                this.setState({users: response.data, userNotSelected: false});
                // this.setState({userNotSelected: true});
            }).catch(error=>{
                this.setState({error:true});
            });
    }

    componentDidMount() {
        fetch('http://10.240.30.131:8080/users/allUsers/')
          .then(response => response.json())
          .then(userListData => this.setState({ userListData }));
      }

    updateInputValue(evt) {
        this.setState({
          inputValue: evt.target.value
        });
      }


      refreshPage=()=>{
          this.setState({
                users: null,  
                userNotSelected: true,
                inputValue: null,
                error: false
            });
      }

    render () {

        let userListData = this.state.userListData.map((user, index)=>{
            return(<tr key={user.id}>
                    <td>{index+1}</td>
                    <td><b>{user.id}</b></td>
                    <td>{user.name}</td>
                    <td><a href="/games">Yes</a> | <a href="/games">No</a></td>
                    </tr>);
        });

        let button = this.state.userNotSelected ?
        <div><input value={this.state.inputValue ? this.state.inputValue : ''} onChange={evt => this.updateInputValue(evt)}></input>
        <button onClick={()=>this.setUserId(this.state.inputValue)}>Select user</button></div>         
        :<button onClick={()=>this.refreshPage()}>Refresh</button>;

        let selectedUser = (this.state.error) ? <p>Player can't be loaded...<br/><b>Try using another ID</b></p> : <p>Nothing selected...<br/><u style={{color:'green'}}>Check you ID in the <b>Player List</b> below</u></p>;
        
        if (this.state.users) {
            selectedUser=(
                <div>
                    <h3>Username: {this.state.users.name}</h3>
                    <h3>Age: {this.state.users.age}</h3>
                </div>
            );
        }
        // console.log(selectedUser);

        return (
            <div>
                <h3>Select a Player:</h3>
                {button}
                {selectedUser}
                <div style={{display:'inline-block', border:'solid black'}}>
                <h2>Player list</h2>
                <table>
                {/* <span><h2>Users list</h2></span> */}
                <tbody>
                    <tr>
                    <th>No.</th>
                    <th>Id Number</th>
                    <th>Name</th>
                    <th>Available</th></tr>
                    {userListData}
                    </tbody>
                </table>

                </div>
                <div style={{display:'inline-block', border:'solid black', marginLeft:'3%'}}>
                <h2>Next Game:</h2>
                <table>
                <tbody>
                    <tr>
                    <td>Intrasoft International vs :</td>
                    <td><b>EN.AS.</b></td>
                    </tr>
                    <tr>
                    <td align='right'>Where :</td>
                    <td><b>Oaka Voithitiko 1</b></td>
                    </tr>
                    <tr>
                    <td align='right'>When :</td>
                    <td><b>March 26, 2019 - 20:15</b></td>
                    </tr>
                    </tbody>
                </table>
                </div>

                <a href='/users' style={{display:'block', marginLeft:'15%', marginRight:'15%', border:'solid green', fontSize:'1.6em'}}>Add a new user</a>
                <a href='/users' style={{display:'block', marginLeft:'15%', marginRight:'15%', border:'solid green', fontSize:'1.6em'}}>Add a new game</a>

            </div>
        );
    }
}

export default Users;