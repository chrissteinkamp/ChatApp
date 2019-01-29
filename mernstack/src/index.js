//index.js
import React from 'react';
import ReactDOM from 'react-dom';
import CommentPage from './components/chat/CommentBox';
import HomePage from './components/HomePage';
import AboutPage from './components/About';
import Shell from './components/Shell';
import ContactPage from './components/Contact';
import ProfilePage from './components/Profile';
import FriendsPage from './components/Friends';
import { requireAuth } from './utils/AuthService';
// using ES6 modules 
import {Router, Route, browserHistory, IndexRoute} from 'react-router'


var Chat = React.createClass({
  render: function() {
    return (<div>
              <CommentPage url='http://chat-steinkampc.c9users.io:8080/api/rooms'
                pollInterval={750}/>
            </div>);
  }
});

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Shell} >
      <IndexRoute component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/profile" component={ProfilePage} onEnter={requireAuth}/>
      <Route path="/friends" component={FriendsPage} onEnter={requireAuth}/>
      <Route path="/rooms/:roomId" component={Chat} onEnter={requireAuth}/>
    </Route>
  </Router>,
  document.getElementById('root')
);

