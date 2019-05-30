//import "./styles.css";
import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import _ from 'lodash';

import { Button,  Modal, Avatar } from '@material-ui/core';
import { isDataURL, isNumeric } from "./utils";
import warning from "warning";

import { isNumber } from './PropTypes';

export const styles = theme => ({

  root: {
    textAlign: 'center',
    backgroundColor: 'white',
    margin: 'auto',

    '& input[type=range]': {
      display: 'inline-block',

      '-webkit-appearance': 'none',
      // padding: '20px 0',
      border: '1px solid white',
      width: 400,

      '&::-webkit-slider-runnable-track': {
        width: 400,
        height: 5,
        background: '#ddd',
        border: 'none',
        borderRadius: 3,
      },

      '&::-webkit-slider-thumb': {
        '-webkit-appearance': 'none',
        border: 'none',
        height: 16,
        width: 16,
        borderRadius: '50%',
        background: '#454545',
        marginTop: -4
      },

      '&:focus': {
        outline: 'none',

        '&::-webkit-slider-runnable-track': {
          background: '#ccc'
        }
      },

      '&::-moz-range-track': {
        width: 400,
        height: 5,
        background: '#ddd',
        border: 'none',
        borderRadius: 3,
      },

      '&::-moz-range-thumb': {
        border: 'none',
        height: 16,
        width: 16,
        borderRadius: '50%',
        background: '#454545'
      },

      '&:-moz-focusring' : {
        outline: '1px solid white',
        outlineOffset: -1
      },

      '&::-ms-track': {
        width: 400,
        height: 5,
        background: 'transparent',
        borderColor: 'transparent',
        borderWidth: '6px 0',
        color: 'transparent'
      },

      '&::-ms-fill-lower': {
        background: '#777',
        borderRadius: 10,        
      },
  
      '&::-ms-fill-upper': {
        background: '#ddd',
        borderRadius: 10,
      },
      '&::-ms-thumb': {
        border: 'none',
        height: 16,
        width: 16,
        borderRadius: '50%',
        background: '#454545'
      },
      '&:focus::-ms-fill-lower': {
        background: '#888'
      },
      '&:focus::-ms-fill-upper': {
        background: '#ccc'
      }
    },

    '& .modal-footer': {
      background: 'white',
      margin: '0 auto 0 auto',  
    }      
  },

  cropContainer: {
    position: 'relative',
  },

  canvas: {
    cursor: 'move',
    marginTop: '4px',
  },

  cropOverlay: {
    position: 'absolute',
    pointerEvents: 'none',
    backgroundColor: 'transparent',
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: 'dashed',
    opacity: 0.2,
    height: 250,
    width: 250,
    margin: 'auto',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  footer: {
    display: 'inline-block',
  }
});

class AvatarPreview extends React.Component {

  constructor () {
    super();

    // getInitialState
    this.state = {
      dragging: false,
      image: {},
      mouse: {
        x: null,
        y: null
      },
      preview: null,
      zoom: 1
    };

    this.listeners = [];

    this.canvasRef = React.createRef();
    this.zoomRef = React.createRef();
  }

  fitImageToCanvas (width, height) {
    var scaledHeight, scaledWidth;

    var canvasAspectRatio = this.props.height / this.props.width;
    var imageAspectRatio = height / width;

    if (canvasAspectRatio > imageAspectRatio) {
      scaledHeight = this.props.height;
      let scaleRatio = scaledHeight / height;
      scaledWidth = width * scaleRatio;
    } else {
      scaledWidth = this.props.width;
      let scaleRatio = scaledWidth / width;
      scaledHeight = height * scaleRatio;
    }

    return { width: scaledWidth, height: scaledHeight };
  }

  prepareImage (imageUri) {
    var img = new Image();
    if (!isDataURL(imageUri)) img.crossOrigin = 'anonymous';
    img.onload = () => {
      var scaledImage = this.fitImageToCanvas(img.width, img.height);
      scaledImage.resource = img;
      scaledImage.x = 0;
      scaledImage.y = 0;
      this.setState({dragging: false, image: scaledImage, preview: this.toDataURL()});
    };
    img.src = imageUri;
  }

  mouseDownListener (e) {
    this.setState({
      image: this.state.image,
      dragging: true,
      mouse: {
        x: null,
        y: null
      }
    });
  }

  preventSelection (e) {
    if (this.state.dragging) {
      e.preventDefault();
      return false;
    }
  }

  mouseUpListener (e) {
    this.setState({ dragging: false, preview: this.toDataURL() });
  }

  mouseMoveListener (e) {
    if (!this.state.dragging) return;

    var mouseX = e.clientX;
    var mouseY = e.clientY;
    var imageX = this.state.image.x;
    var imageY = this.state.image.y;

    var newImage = this.state.image;

    if (this.state.mouse.x && this.state.mouse.y) {
      var dx = this.state.mouse.x - mouseX;
      var dy = this.state.mouse.y - mouseY;

      var bounded = this.boundedCoords(imageX, imageY, dx, dy);

      newImage.x = bounded.x;
      newImage.y = bounded.y;
    }

    this.setState({
      image: this.state.image,
      mouse: {
        x: mouseX,
        y: mouseY
      }
    });
  }

  boundedCoords (x, y, dx, dy) {
    var newX = x - dx;
    var newY = y - dy;

    var scaledWidth = this.state.image.width * this.state.zoom;
    var dw = (scaledWidth - this.state.image.width) / 2;
    var imageLeftEdge = this.state.image.x - dw;
    var imageRightEdge = (imageLeftEdge + scaledWidth);

    var rightEdge = this.props.width;
    var leftEdge = 0;

    if (newX - dw > 0) { x = dw; }
    else if (newX < (-scaledWidth + rightEdge)) { x = rightEdge - scaledWidth; }
    else {
      x = newX;
    }

    var scaledHeight = this.state.image.height * this.state.zoom;
    var dh = (scaledHeight - this.state.image.height) / 2;
    var imageTopEdge = this.state.image.y - dh;
    var imageBottomEdge = imageTopEdge + scaledHeight;

    var bottomEdge = this.props.height;
    var topEdge = 0;
    if (newY - dh > 0) { y = dh; }
    else if (newY < (-scaledHeight + bottomEdge)) { y = bottomEdge - scaledHeight; }
    else {
      y = newY;
    }

    return { x: x, y: y };
  }

  componentDidMount () {
    var context = this.canvasRef.current.getContext("2d");
    this.prepareImage(this.props.image);

    this.listeners = {
      mousemove: e => this.mouseMoveListener(e),
      mouseup: e => this.mouseUpListener(e),
      mousedown: e => this.mouseDownListener(e)
    };

    window.addEventListener("mousemove", this.listeners.mousemove, false);
    window.addEventListener("mouseup", this.listeners.mouseup, false);
    this.canvasRef.current.addEventListener("mousedown", this.listeners.mousedown, false);
    document.onselectstart = e => this.preventSelection(e);
  }

  componentWillUnmount () {
    window.removeEventListener("mousemove", this.listeners.mousemove);
    window.removeEventListener("mouseup", this.listeners.mouseup);
    this.canvasRef.current.removeEventListener("mousedown", this.listeners.mousedown);
  }

  componentDidUpdate () {
    var context = this.canvasRef.current.getContext("2d");
    context.clearRect(0, 0, this.props.width, this.props.height);
    this.addImageToCanvas(context, this.state.image);
  }

  addImageToCanvas (context, image) {
    if (!image.resource) return;
    context.save();
    context.globalCompositeOperation = "destination-over";
    var scaledWidth = this.state.image.width * this.state.zoom;
    var scaledHeight = this.state.image.height * this.state.zoom;

    var x = image.x - (scaledWidth - this.state.image.width) / 2;
    var y = image.y - (scaledHeight - this.state.image.height) / 2;

    // need to make sure we aren't going out of bounds here...
    x = Math.min(x, 0);
    y = Math.min(y, 0);
    y = scaledHeight + y >= this.props.height ? y : (y + (this.props.height - (scaledHeight + y)));
    x = scaledWidth + x >= this.props.width ? x : (x + (this.props.width - (scaledWidth + x)));

    context.drawImage( image.resource, x, y, image.width * this.state.zoom, image.height * this.state.zoom);
    context.restore();
  }

  toDataURL () {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");

    canvas.width = this.props.width;
    canvas.height = this.props.height;

    this.addImageToCanvas(context, {
      resource: this.state.image.resource,
      x: this.state.image.x,
      y: this.state.image.y,
      height: this.state.image.height,
      width: this.state.image.width
    });

    return canvas.toDataURL();
  }

  onSave () {
    var data = this.toDataURL();
    this.props.onSave(data);
  }

  onCancel() {
    this.props.onCancel();
  }

  handleZoomUpdate () {
    var newstate = this.state;
    newstate.zoom = this.zoomRef.current.value;
    this.setState({newstate});
  }

  render () {
    const { classes } = this.props;

    var borderRadius = this.props.previewBorderRadius;
    if (!borderRadius.toString().endsWith('%')) {
      borderRadius = parseInt(borderRadius)+'px';
    }    

    return (
      <div className={classes.root} style={{background: this.props.previewBackgroundColor, width: this.props.width + 8}}>
        <div className={classes.cropContainer}>
          <div className={classes.cropOverlay} style={{width: this.props.width, height: this.props.height, borderRadius: borderRadius}}></div>
          <canvas
            className={classes.canvas}
            ref={this.canvasRef}
            width={this.props.width}
            height={this.props.height}
            style={{borderRadius: borderRadius}}>
          </canvas>
        </div>
        <div>
          <input            
            type="range"
            name="zoom"
            ref={this.zoomRef}
            onChange={this.handleZoomUpdate.bind(this)}
            style={{width: this.props.width}}
            min="1"
            max="3"
            step="0.01"
            defaultValue="1"
          />
        </div>
        <div >
          <div className={classes.footer} style={{width: this.props.width}}>
            <Button onClick={this.onCancel.bind(this)}>{this.props.cancelButtonText}</Button>
            <Button color='primary' onClick={this.onSave.bind(this)}>{this.props.saveButtonText}</Button>
          </div>
        </div>

      </div>
    );
  }
}
AvatarPreview.propTypes = {
    image: PropTypes.string.isRequired,
    previewBackgroundColor: PropTypes.string,
    previewBorderRadius: PropTypes.oneOfType([PropTypes.string, isNumber]),
    width: isNumber,
    height: isNumber,
    zoom: isNumber,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};
AvatarPreview.defaultProps = {
  previewBackgroundColor: 'white', 
  previewBorderRadius: '50%',
  width: 400, 
  height: 400, 
  zoom: 1 
};

// export default AvatarPreview
export default withStyles(styles, { name: 'MuiAvatarPreview' })(AvatarPreview);