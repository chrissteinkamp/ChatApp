import React from 'react';
import '../css/Shell.css';
import {
  Link
}
from 'react-router';
import axios from 'axios';
import {
  login,
  logout,
  isLoggedIn,
  getIdToken
}
from '../utils/AuthService';

class Shell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    
    /*var request = axios.post('http://chat-steinkampc.c9users.io:8080/api/friends, {
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
          
    /*var user = JSON.parse(localStorage.getItem('User'));
    var request = axios.post('http://chat-steinkampc.c9users.io:8080/api/friends', {
          user_id: user.user_id,
          email: 'testFriend@gmail.com',
          nickname: 'testFriend',
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
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);

    //dialog functions
    this.dialogClose = this.dialogClose.bind(this);
    this.dialog = this.dialog.bind(this);

    this.addChat = this.addChat.bind(this);

    this.onChange = this.onChange.bind(this);
    this.activePage = this.activePage.bind(this);

    //authorization token
    this.authCheck = {
      headers: {
        Authorization: `Bearer ${getIdToken()}`
      }
    };
  }



  loadChatRoomsFromServer() {
    axios.get('http://chat-steinkampc.c9users.io:8080/api/rooms', this.authCheck)
      .then(res => {
        this.setState({
          data: res.data
        });
      });
  }

  componentWillMount() {
    this.loadChatRoomsFromServer();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = false;
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  dialog() {
    // Get the modal
    var modal = document.getElementById('myModal');

    // When the user clicks on the button, open the modal 
    modal.style.display = "block";

  }

  dialogClose() {
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
  }

  addChat(refName) {
    var that = this;

    var newChatName = this.refs[refName].value;
    var newChatObj = {
      name: newChatName,
      comments: []
    };

    var request = axios.post('http://chat-steinkampc.c9users.io:8080/api/rooms', newChatObj, this.authCheck);
    request.then(function(res) {
        alert(res.data.message);
        that.loadChatRoomsFromServer();
      })
      .catch(function(error) {
        console.log(error);
      });


  }

  onChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  activePage(id) {
    //sets the active page css class
    document.getElementById(id).className += " location";
  }
  render() {
    var that = this;
    //var user = JSON.parse(localStorage.getItem('User'));
    let roomNodes = this.state.data.map(room => {
      var to = "/rooms/" + room._id;
      return (
        <li><Link to={to} key={room._id} className="sideNavOption">{room.name}</Link></li>
      );
    });


    return (
      <div>
            <div id="mySidenav" className="sidenav">
              <a className="closebtn" onClick={this.closeNav}>&times;</a>
              <Link to="/" onClick={function(){that.activePage("home")}} id="home" className="sideNavOption">Home</Link>
              <Link to="/about" onClick={function(){that.activePage("about")}} id="about" className="sideNavOption">About</Link>
              <Link to="/contact" onClick={function(){that.activePage("contact")}} id="contact" className="sideNavOption">Contact</Link>
              {
                (isLoggedIn()) ? (<div><a type="text" id="myBtn" className="sideNavOption" data-toggle="modal" data-target="#addChatRoomModal">Add Chat Room</a>
                                  <Link className="sideNavOption">Chat Rooms:</Link>
                                  <ul className="chatRooms">
                                    {roomNodes}
                                  </ul></div>) : null
              }
            </div>
            
            <div className="modal fade" id="addChatRoomModal" role="dialog">
              <div className="modal-dialog">
              
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title">Add Chat Room</h4>
                  </div>
                  <div className="modal-body">
                    
                    <form role="form">
                      <p>New Chat Room Name:</p>
  
                        <div className="input-group">
                          <input type="text" id="newChatName" defaultValue={ this.state.text } className="form-control" ref="chatName" />
                            <div className="input-group-addon inputGroupAlignment">
                            <button type="button" className="btn btn-success" onClick={ function(){ that.addChat("chatName") } }>
                              <span className="glyphicon glyphicon-plus"></span> Add Chat Room
                            </button>
                            </div>
                        </div>
		
                      <br />
                    </form>
                    
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>



            <nav className="navbar navbar-default navbar-inverse" role="navigation">
                <Link className="navbar-brand" onClick={this.openNav} >&#9776;</Link>
                <Link className="navbar-brand navBrand" to="/">Chat App</Link>
                  
                
                <ul className="nav navbar-nav navbar-right">
                    { 
                      (isLoggedIn()) ? (<li className="dropdown">
                                          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">My account <span className="caret"></span></a>
                                          <ul className="dropdown-menu" role="menu">
                                            <li><Link to="/friends">Friends</Link></li>
                                            <li><Link to="/profile">Profile</Link></li>
                                            <li className="divider"></li>
                                            <li><Link onClick={() => logout()}>Log out </Link></li>
                                          </ul>
                                        </li> ) : null
                    }
                  
                    { 
                      (!isLoggedIn()) ? (<li><Link onClick={() => login()}>Log In</Link></li> ) : null
                    }
                  
                </ul>
            </nav>
            
            <div id="main">
              {this.props.children}
            </div>
          </div>
    );
  }
}

export default Shell;