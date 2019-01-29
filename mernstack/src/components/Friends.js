/* eslint-disable */

import React, {
  Component
}
from 'react';
import '../css/Profile.css';
import {
  getIdToken
}
from '../utils/AuthService';
import axios from 'axios';
import '../css/Friends.css';

class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      users: []
    };

    /*var request = axios.post('http://chat-steinkampc.c9users.io:8080/api/rooms', {
          name: 'Chris',
          comments: [
            {
              author: 'steinkampc',
              text: 'comment'
            },
            {
              author: 'riin',
              text: 'hello'
            },
            {
              author: 'steinkampc',
              text: 'newest comment'
            }
          ],
        });
        request.then(function(response) {
            if (response.data.message) {
              alert(response.data.message);
            }
          })
          .catch(function(error) {
            console.log(error);
          });*/
    //side navbar functions

    //authorization token
    this.authCheck = {
      headers: {
        Authorization: `Bearer ${getIdToken()}`
      }
    };
    this.loadFriendsFromServer = this.loadFriendsFromServer.bind(this);
    this.addFriends = this.addFriends.bind(this);
    this.loadUsers = this.loadUsers.bind(this);
  }



  loadFriendsFromServer() {
    debugger;
    var that = this
    var user = JSON.parse(localStorage.getItem('User'));
    axios.get('http://chat-steinkampc.c9users.io:8080/api/friends/' + user.user_id, this.authCheck)
      .then(res => {
        this.setState({
          data: res.data
        });
      });
  }
  
  loadUsers(){
    this.users = [];
    var that = this;
    axios.get('http://chat-steinkampc.c9users.io:8080/api/users')
      .then(res => {
        this.setState({
          users: res.data
        });
      });
  }
  componentWillMount() {
    this.loadFriendsFromServer();
    this.loadUsers();
  }

  addFriends(e) {
        debugger;
        var that = this;        
        var user = JSON.parse(localStorage.getItem('User'));
        var newFriend = {
          user_id: user.user_id,
          email: this.state.users[e.target.id].email,
          nickname: this.state.users[e.target.id].nickname
        }
        axios.post('http://chat-steinkampc.c9users.io:8080/api/friends', newFriend, this.authCheck)
            .then(res => {
                that.loadFriendsFromServer();
            })
            .catch(err => {
                that.loadFriendsFromServer();
                console.error(err);
            });
    }

  handleFriendDelete(e) {
    debugger;
    var that = this;
    var user = JSON.parse(localStorage.getItem('User'));
    var deleteFriend = {
      user_id: user.user_id,
      email: this.state.data[e.target.id].email,
      nickname: this.state.data[e.target.id].nickname
    }
    
    
    var request = axios.post('http://chat-steinkampc.c9users.io:8080/api/friends', deleteFriend, this.authCheck);
    request.then(function(res) {
        that.loadFriendsFromServer();
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    var that = this;
    
    let friendNodes = this.state.data.map(friend => {
      var i = 0;
      i++;
      var id = "friendDelete" + i;
      return (
        <tr>
          <td>{friend.email}</td>
          <td>{friend.nickname}</td>
          <td><p data-placement="top" data-toggle="tooltip" title="Delete"><button className="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete" id={id} onClick={that.handleFriendDelete}><span className="glyphicon glyphicon-trash"></span></button></p></td>
        </tr>
      );
    });
    
    var i = -1;
    let userList = this.state.users.map(user => {
      i++;
      return (
        <tr>
          <td className="vcenter">
            <p data-placement="top" data-toggle="tooltip" title="Add Friend">
              <button type="button" className="btn btn-success">
                <span className="glyphicon glyphicon-plus" onClick={ that.addFriends } id={i} ></span>
              </button>
            </p>
          </td>
          <td>{user.email}</td>
          <td>{user.nickname}</td>
        </tr>
      );
    });
    

    return (


      <div className="container tableBG table-padded">
            
            <div className="modal fade" id="addFriendModal" role="dialog">
              <div className="modal-dialog">
              
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title">Find Friends</h4>
                  </div>
                  <div className="modal-body">
                    <form className="navbar-form" role="search">
                      <div className="input-group add-on">
                        <input className="form-control" placeholder="Search" name="srch-term" id="srch-term" type="text" />
                        <div className="input-group-btn">
                          <button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
                        </div>
                      </div>
                    </form>
                    
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Email</th>
                          <th>Username</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userList}
                      </tbody>
                    </table>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
            
            <table className="table table-hover"
                   data-toggle="table"
                   data-height="300"
                   data-url="https://api.github.com/users/wenzhixin/repos?type=owner&sort=full_name&direction=asc&per_page=100&page=1"
                   data-pagination="true"
                   data-search="true"
                   data-show-refresh="true"
                   data-show-toggle="true"
                   data-show-columns="true"
                   data-toolbar="#toolbar">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Username</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {friendNodes}
              </tbody>
            </table>
            <p data-placement="top" data-toggle="tooltip" title="Add Friend">
              <button type="button" className="btn btn-success" data-toggle="modal" data-target="#addFriendModal">
                <span className="glyphicon glyphicon-plus"></span> Add Friends</button>
            </p>
        </div>
    );
  }
}

export default Friends;