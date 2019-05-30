import React from "react";
import ReactDom from "react-dom";
import AvatarPicker from "../../lib";
import createReactClass from "create-react-class";
import { Avatar, Grid } from "@material-ui/core";

var App = createReactClass({
  getInitialState: function() {
    return {
      noImg: null,
      img: "http://placekitten.com/40/40",
      img2: "http://placekitten.com/80/80",
      img3: "http://placekitten.com/160/160",
    };
  },
  handleSave: function(dataURI) {
    this.setState({
      noImg: dataURI
    });
  },
  handleSave1: function(dataURI) {
    this.setState({
      img: dataURI
    });
  },
  handleSave2: function(dataURI) {
    this.setState({
      img2: dataURI
    });
  },
  handleSave3: function(dataURI) {
    this.setState({
      img3: dataURI
    });
  },
  handleCancel: function() {
    console.log('AvatarPicker::onCancel() called!');
  },
  render () {
    const hasNoImage = !!this.state.noImg;
    const hasImage = !!this.state.img;
    const hasImage2 = !!this.state.img2;
    const hasImage3 = !!this.state.img3;
    return (
      <div>
        <Grid className={'gridishere'}>
        <AvatarPicker
          onSave={this.handleSave}
          onCancel={this.handleCancel}
          image={this.state.noImg}
          previewWidth={160}
          previewHeight={160}
          previewBorderRadius={'50%'}
          avatar={
            <Avatar                
              alt={'alt2 text goes here'}
              aria-label={'aria-label2 goes here'}
              //className={ classnames(classes.avatar, !hasHeadshot ? classes.avatarText : '' ) }
              src={ this.state.noImg }
              className={'initialsAvatar'}
            >
              { !hasNoImage
                ? 'NI'
                : '' }
            </Avatar>
          }
        />  
        </Grid>      
        <p/>        
        <AvatarPicker
          onSave={this.handleSave1}
          onCancel={this.handleCancel}
          image={this.state.img}
          previewWidth={80}
          previewHeight={80}
          previewBorderRadius={5}
          avatar={
            <Avatar                
              alt={'alt2 text goes here'}
              aria-label={'aria-label2 goes here'}
              //className={ classnames(classes.avatar, !hasHeadshot ? classes.avatarText : '' ) }
              src={ this.state.img }
              className={'smallAvatar'}
            >
              { !hasImage
                ? 'CD'
                : '' }
            </Avatar>
          }
        />        
        <p/>        
        <AvatarPicker
          onSave={this.handleSave2}
          onCancel={this.handleCancel}
          image={this.state.img2}
          previewWidth={160}
          previewHeight={160}
          previewBorderRadius={5}
          avatar={
            <Avatar                
              alt={'alt text goes here'}
              aria-label={'aria-label goes here'}
              //className={ classnames(classes.avatar, !hasHeadshot ? classes.avatarText : '' ) }
              src={ this.state.img2 }
              className={'bigAvatar'}
            >
              { !hasImage2
                ? 'AB'
                : '' }
            </Avatar>
          }
        />
        <p/>
        <AvatarPicker
          onSave={this.handleSave3}
          onCancel={this.handleCancel}
          image={this.state.img3}
          previewWidth={320}
          previewHeight={320}
          previewBorderRadius={'25%'}
          avatar={
            <Avatar                
              alt={'alt text goes here'}
              aria-label={'aria-label goes here'}
              //className={ classnames(classes.avatar, !hasHeadshot ? classes.avatarText : '' ) }
              src={ this.state.img3 }
              className={'biggerAvatar'}
            >
              { !hasImage3
                ? 'AB'
                : '' }
            </Avatar>
          }
        />
      </div>   
    );
  }
});

ReactDom.render(<App />, document.getElementById("content"));
