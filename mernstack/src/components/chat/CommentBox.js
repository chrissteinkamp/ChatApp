//CommentBox.js

import React, {
    Component
}
from 'react';
import axios from 'axios';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { isLoggedIn, getIdToken } from '../../utils/AuthService';
import style from './style';


class CommentBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                comments: []
            }
        };
        this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        this.handleCommentDelete = this.handleCommentDelete.bind(this);
        this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
        this.quickDeleteFunc= this.quickDeleteFunc.bind(this);
        this.filter = this.filter.bind(this);
        this.search = this.search.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
        
        this.specFilter = this.specFilter.bind(this);
        this.specSearch = this.specSearch.bind(this);
        this.clearSpecSearch = this.clearSpecSearch.bind(this);
        
        //authorization token
        this.authCheck = { headers: { Authorization: `Bearer ${getIdToken()}`}};
    }
    
    loadCommentsFromServer() {
        axios.get(this.props.url+window.location.href.split("rooms")[1], this.authCheck)
            .then(res => {
                this.setState({
                    data: {
                       comments: res.data.comments
                    }
                });
            });
            
        this.completeData = this.state.data.comments;
    }
    handleCommentSubmit(comment) {
        let comments = this.state.data.comments;
        comment.id = Date.now();
        let newComments = comments.concat([comment]);
        this.setState({
            data: {
                comments: newComments
            }
        });
        debugger;
        axios.post(this.props.url+window.location.href.split("rooms")[1], comment, this.authCheck)
            .catch(err => {
                console.error(err);
                this.setState({
                    data: {
                        comments: comments
                    }
                });
            });
    }
    handleCommentDelete(id) {
        
        axios.delete(this.props.url+window.location.href.split("rooms")[1]+"/"+id, this.authCheck)
            .then(res => {
                console.log('Comment deleted');
            })
            .catch(err => {
                console.error(err);
            });
        }
    handleCommentUpdate(id, comment) {
        debugger
        var serviceURL = this.props.url+window.location.href.split("rooms")[1]+"/"+id;
        var commentUpdate ={
            _id: id,
            author: comment.author,
            text: comment.text
        }
        
        //sends the comment id and new author/text to our api
        axios.put(serviceURL, commentUpdate, this.authCheck)
            .catch(err => {
                console.log(err);
            });
    }
    
    //function that searches and deletes all comments posted by an author
    quickDeleteFunc(evt){
        var searchVal = document.getElementById("mainSearchInput").value;
        if (searchVal.trim() ===""){
               alert("No search criteria inputted!");
        } else {
            var that = this;
            this.state.data.forEach(function(object, i){
                if (object.author.toUpperCase() === searchVal.toUpperCase()) {
                    axios.delete(`${that.props.url}/${that.state.data[i]._id}`)
                        .then(res => {
                            console.log('Comment deleted');
                        })
                        .catch(err => {
                            console.error(err);
                        });
                } else {
                    return;
                }
            });
        }
    }
    
    //searches Comment schema for authors that match search criteria and returns
    //matched values
    search(selection) {
        var mAuthorVal = document.getElementById("mainSearchInput").value;
        if (selection.author.toUpperCase().includes(mAuthorVal.toUpperCase())) {
            return selection;
        }
    }
    
    //filters database Comment Schema and updates state to display searched results
    filter() {
        var that = this;
        clearInterval(this.interval);
        
        
        setTimeout(function(){
            // eslint-disable-next-line
            that.state.data.comments = that.completeData;
                
            var mAuthorVal = document.getElementById("mainSearchInput").value;
            if (mAuthorVal.trim() === "") {
                alert("Enter A Value!");
                return;
            } else {
    
                // eslint-disable-next-line
                that.state.data.comments = that.state.data.comments.filter(that.search);
                if (that.state.data.comments.length === 0) {
                    alert("No Values Found!");
                } else {
                    that.setState(that.state.data.comments);
                }
            }
        }, 250);
    }
    
    //clears the search field and reloads all of the Comment values
    clearSearch() {
        document.getElementById("mainSearchInput").value = "";
        debugger;
        
        this.loadCommentsFromServer();
        this.interval = 0;
        this.interval = setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    }
    
    //searches Comment schema for authors that match search criteria and returns
    //matched values
    specSearch(selection) {
        var authorVal = document.getElementById("authorIN").value;
        var commentVal = document.getElementById("commentIN").value;
        
        if(authorVal.trim() === "" && commentVal.trim() === ""){
            this.setState(null);
            return;
        }
        if(authorVal.trim() !== "" && commentVal.trim() !== ""){
            if (selection.author.toUpperCase().includes(authorVal.toUpperCase()) && selection.text.toUpperCase().includes(commentVal.toUpperCase())) {
                return selection;
            }
        } else if(authorVal.trim() === "" && commentVal.trim() !== ""){
            if(selection.text.toUpperCase().includes(commentVal.toUpperCase())){
                return selection;
            }
        } else {
            if(selection.author.toUpperCase().includes(authorVal.toUpperCase())){
                return selection;
            }
        }
    }
    
    //filters database Comment Schema and updates state to display searched results
    specFilter() {
        clearInterval(this.interval);
        var that = this;
        
        setTimeout(function(){
            // eslint-disable-next-line
            that.state.data.comments = that.completeData;
            
            // eslint-disable-next-line
            that.state.data.comments = that.state.data.comments.filter(that.specSearch);
            if (that.state.data.comments.length === 0) {
                alert("No Values Found!");
            } else {
                that.setState(that.state.data.comments);
            }
        }, 250);
    }
    
    //clears the search field and reloads all of the Comment values
    clearSpecSearch() {
        /*document.getElementById("authorIN").value = "";
        document.getElementById("commentIN").value = "";*/
        this.loadCommentsFromServer();
        this.interval = 0;
        this.interval = setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    }
    
    componentWillMount() {
            //load comments
            this.loadCommentsFromServer();
            
            //sets interval to global variable to clear it with when searching
            this.interval = setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
        this.interval = false;
    }
    render() {
        var user = JSON.parse(localStorage.getItem('User'));
        return (
            <div>
                <div style={ style.commentBox }>
                    <h2 style={ style.title }>Welcome to the chat room, {user.nickname}</h2>
                    <div className="container">
                	<div className="row bottom-buffer">
                		<div className="col-md-3 col-md-offset-3">
                            <div className="input-group" id="adv-search">
                                <input type="text" id="mainSearchInput" className="form-control" placeholder="Search By Username..."/>
                                <div className="input-group-btn">
                                    <div className="btn-group" role="group">
                                        <div className="dropdown dropdown-lg">
                                            <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" title="Advanced Options" aria-expanded="false"><span className="caret"></span></button>
                                            <div className="dropdown-menu dropdown-menu-right" role="menu">
                                                <form className="form-horizontal" role="form">
                                                  <div className="form-group">
                                                    <label htmlFor="contain">Username:</label>
                                                    <input className="form-control" type="text" id="authorIN"/>
                                                  </div>
                                                  <div className="form-group">
                                                    <label htmlFor="contain">Comment:</label>
                                                    <input className="form-control" type="text" id="commentIN"/>
                                                  </div>
                                                  <button type="button" onClick={ this.specFilter } className="btn btn-primary"><span className="glyphicon glyphicon-search" aria-hidden="true"></span></button>
                                                  <button type="button" onClick={ this.clearSpecSearch } className="btn btn-primary"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
                                                </form>
                                            </div>
                                        </div>
                                        
                                        <button type="submit" onClick={ this.filter } className="btn btn-primary"><span className="glyphicon glyphicon-search" aria-hidden="true"></span></button>
                                        <button type="button" onClick={this.clearSearch} className="btn btn-primary"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
                                    </div>
                                </div>
                            </div>
                          </div>
                        </div>
                	</div>
                	{
                	(isLoggedIn()) ?
                    	<div>
                            <CommentList
                                 onCommentDelete={ this.handleCommentDelete }
                                 onCommentUpdate={ this.handleCommentUpdate }
                                 data={ this.state.data.comments }/>
                                 <CommentForm onCommentSubmit={ this.handleCommentSubmit }/>
                        </div>
                        : ''
                	}
                </div>
            </div>
        )
    }
}
export default CommentBox;