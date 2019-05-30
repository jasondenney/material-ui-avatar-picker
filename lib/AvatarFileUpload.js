
import React from 'react';
import PropTypes from 'prop-types';

class AvatarFileUpload extends React.Component {
    constructor(props) {
        super(props);
        this.inRef = React.createRef();
        this.handleFile = this.handleFile.bind(this);
    }

    handleFile(e) {
      var reader = new FileReader();
      var file = e.target.files[0];
      var { onFileChange } = this.props;
  
      if (!file) return;
  
      reader.onload = function(img) {
        this.inRef.current.value = '';
        onFileChange(img.target.result);
      }.bind(this);
      reader.readAsDataURL(file);
    }

    click() {
      this.inRef.current.click();
    }
  
    render() {
      return (
        <input ref={this.inRef} type="file" accept={this.props.acceptType} onChange={this.handleFile} />
      );
    }
  }

  AvatarFileUpload.propTypes = {
    onFileChange: PropTypes.func.isRequired,
    acceptType: PropTypes.string.isRequired
  };

  AvatarFileUpload.defaultProps = { acceptType: "image/*" };

  export default AvatarFileUpload