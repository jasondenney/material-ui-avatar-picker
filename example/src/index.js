import React from "react";
import ReactDom from "react-dom";
import AvatarPicker from "../../lib";
import createReactClass from "create-react-class";
import { Button } from "@material-ui/core";

var App = createReactClass({
  getInitialState: function() {
    return {
      previewOpen: false,
      img: null,
      savedImg: "http://www.placekitten.com/400/400"
    };
  },
  handleFileChange: function(dataURI) {
    this.setState({
      img: dataURI,
      savedImg: this.state.savedImg,
      previewOpen: true
    });
  },
  handleSave: function(dataURI) {
    this.setState({
      previewOpen: false,
      img: null,
      savedImg: dataURI
    });
  },
  handleRequestHide: function() {
    this.setState({
      previewOpen: false
    });
  },
  render () {
    return (
      <div>
        <div className="avatar-photo">
          <FileUpload handleFileChange={this.handleFileChange} />
          <Button color="primary">Pick an Image</Button>
          <img src={this.state.savedImg} />          
        </div>
        {this.state.previewOpen &&
          <AvatarPicker
            onRequestHide={this.handleRequestHide}
            previewOpen={this.state.previewOpen}
            onSave={this.handleSave}
            image={this.state.img}
            width={400}
            height={400}
          />
        }
      </div>
    );
  }
});

var FileUpload = createReactClass({

  handleFile: function(e) {
    var reader = new FileReader();
    var file = e.target.files[0];

    if (!file) return;

    reader.onload = function(img) {
      ReactDom.findDOMNode(this.refs.in).value = '';
      this.props.handleFileChange(img.target.result);
    }.bind(this);
    reader.readAsDataURL(file);
  },

  render: function() {
    return (
      <input ref="in" type="file" accept="image/*" onChange={this.handleFile} />
    );
  }
});

ReactDom.render(<App />, document.getElementById("content"));
