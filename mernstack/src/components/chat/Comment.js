//Comment.js
import React, {
    Component
}
from 'react';
import style from './style';
import marked from 'marked';

class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toBeUpdated: false,
            id: this.props.uniqueID,
            author: '',
            text: ''
        };
        //binding all our functions to this class
        this.deleteComment = this.deleteComment.bind(this);
        this.updateComment = this.updateComment.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
    }
    updateComment(e) {
        e.preventDefault();
        //brings up the edit field when we click on the edit link.
        this.setState({
            toBeUpdated: !this.state.toBeUpdated
        });
    }
    handleCommentUpdate(e) {
        e.preventDefault();
        let id = this.props.uniqueID;
        //if author or text changed, set it. if not, leave null and our PUT 
        //request will ignore it.
        let author = (this.state.author) ? this.state.author : null;
        let text = (this.state.text) ? this.state.text : null;
        let comment = {
            author: author,
            text: text
        };
        this.props.onCommentUpdate(id, comment);
        this.setState({
            toBeUpdated: !this.state.toBeUpdated,
            author: this.state.author,
            text: ''
        })
    }
    deleteComment(e) {
        e.preventDefault();
        let id = this.props.uniqueID;
        this.props.onCommentDelete(id);
        console.log('oops deleted');
    }
    handleTextChange(e) {
        this.setState({
            text: e.target.value
        });
    }
    handleAuthorChange(e) {
        this.setState({
            author: e.target.value
        });
    }
    rawMarkup() {
        let rawMarkup = marked(this.props.children.toString());
        return {
            __html: rawMarkup
        };
    }
    
    render() {
        var editL;  //var for the edit link
        var deleteL; //var for delete link
        
        //gets the user to compare comment authors with
        var user = JSON.parse(localStorage.getItem('User'));
        
        
        //will check and only display the edit and delete links for comments made by the logged in user.
        if(this.props.author === user.nickname){
            editL = <a style={ style.updateLink } href='#' onClick={ this.updateComment }>edit</a>
            deleteL = <a style={ style.deleteLink } href='#' onClick={ this.deleteComment }>delete</a>
        }
        return (
            <div style={ style.comment }>
                <h3>{this.props.author}</h3>
                    <span dangerouslySetInnerHTML={ this.rawMarkup() } />
                        {editL}
                        {deleteL}
                        { (this.state.toBeUpdated) ? (<form onSubmit={ this.handleCommentUpdate }>
                                                         <input
                                                             type='hidden'
                                                             disabled
                                                             placeholder='Update name…'
                                                             style={ style.commentFormAuthor }
                                                             value={ user.nickname } />
                                                         <input
                                                             type='text'
                                                             placeholder='Update your comment…'
                                                             style={ style.commentFormText }
                                                             value={ this.state.text }
                                                             onChange={ this.handleTextChange } />
                                                         <input
                                                             type='submit'
                                                             style={ style.commentFormPost }
                                                             value='Update' />
                                                    </form>) : null}
            </div>
        )
    }
}
export default Comment;

//onChange={ this.handleAuthorChange }