import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as messageActions from '../actions/messageActions';

class TweetInputBox extends Component {
  constructor() {
    super();

    this.state = {
      tweet: ''
    };
  }

  handleChange = (e) => {
    this.setState({ tweet: e.currentTarget.value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { tweetInputBox } = this.state;
    this.setState({ tweet: tweetInputBox || '' });

    if(this.props.user.id !== undefined){
      this.props.messageActions.postMessage(this.props.user.id, this.state.tweet);
      this.setState({ tweet: '' });
    }
    // HTTP POST TO API: tweet
  }

  tweetBox(){
    if(this.props.user.id !== undefined){
      return(
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} maxLength="144" name="tweetInputBox" placeholder="What's on your mind?" />
          <input type="submit" value="Submit" />
        </form>
      );
    }

    return <p>Login to React Boulder Twitter to post your thoughts!</p>;
  }

  render() {
    return (
      <div>
        { this.tweetBox() }
      </div>
    );
  }
}

function mapStateToProps(state, props){
  return {
    app: state.app,
    user: state.user
  }
}

function mapDispatchToProps(dispatch){
  return {
    messageActions: bindActionCreators(messageActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TweetInputBox);
