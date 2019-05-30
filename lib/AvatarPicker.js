//import "./styles.css";
import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import _ from 'lodash';

import { Button,  Modal } from '@material-ui/core';

import AvatarPreview from './AvatarPreview';
import { isNumber } from './PropTypes';
import AvatarFileUpload from './AvatarFileUpload';

export const styles = theme => ({
  root: {
    display: 'inline-block',
    position: 'relative',
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: 0,
    zIndex: 3,

    '& input[type=file]': {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      height: '100%',
      cursor: 'pointer',
      '-moz-opacity': 0,
      filter: 'alpha(opacity: 0)',
      opacity: 0,
      display: 'none',
    },

    '&:hover': {
      cursor: 'pointer'
    }
  },
  
  buttonContainer: {
    position: 'absolute',
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 7,
    opacity: 0,
    overflow: 'hidden',

    '&:hover': {
      opacity: 1,
    },   
  },

  button: {
    position: 'absolute',
    backgroundColor: 'black',
    color: 'white',
    opacity: .65,
    width: '100%',
    left: 0,
    right: 0,
    bottom: 0,  
    height: '50%',
    maxHeight: 48,
    minHeight: 'initial',
    padding: 0,
    minWidth: 'initial',
    borderRadius: 0,

    '&:hover': {
      backgroundColor: 'black',
      color: 'white',
      opacity: .65,  
    }
  },     
});

class AvatarPicker extends React.Component {

  constructor (props) {
    super();
    this.state = { open: false, savedImg: props.image || {} };
    this.avatarFileUploadRef = React.createRef();

    this.FileUpload__onFileChange = this.FileUpload__onFileChange.bind(this);
    this.onContainerClick = this.onContainerClick.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.componentOnCancel = this.componentOnCancel.bind(this);
    this.componentOnSave = this.componentOnSave.bind(this);
  }

  componentOnCancel() {
    this.setState({ open: false });
  }

  componentOnSave(data) {
    this.setState({ open: false, savedImg: data });
    if (this.props.onSave) {
      this.props.onSave(data);
    }
  }

  FileUpload__onFileChange(dataURI) {
    this.setState({
      selectedImg: dataURI,
      open: true
    });
  }

  onContainerClick(e) {
    if (!e)
    e = window.event;

    //IE9 & Other Browsers
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    //IE8 and Lower
    else {
      e.cancelBubble = true;
    }

    this.avatarFileUploadRef.current.click(e);
  }

  onButtonClick(e) {
    if (!e)
      e = window.event;

    //IE9 & Other Browsers
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    //IE8 and Lower
    else {
      e.cancelBubble = true;
    }

    this.avatarFileUploadRef.current.click(e);
  }

  render () {
    const {
      avatar,
      component: Component,
      classes,
      className: classNameProp,
      previewBackgroundColor,
      previewBorderRadius,
      image,
      onSave,
      onCancel,
      editButtonText,
      saveButtonText,
      cancelButtonText,
      previewWidth,
      previewHeight,
      ...other
    } = this.props;

    const { componentOnCancel, componentOnSave } = this;
    const avatarClassName = null; //avatar.props.className;

    return (
      <Component className={classNames(classes.root, classNameProp, avatarClassName)} {...other}>
        <div>
          <AvatarFileUpload ref={this.avatarFileUploadRef} onFileChange={this.FileUpload__onFileChange} />
          <div className={classes.buttonContainer}
            style={{ borderBottomLeftRadius: previewBorderRadius, borderBottomRightRadius: previewBorderRadius }}
           onClick={this.onContainerClick.bind(this)}>
            <Button type='button' className={classes.button} disableRipple={true} onClick={this.onButtonClick}>{editButtonText}</Button>
          </div>
          {avatar && <div className={classes.avatar}>{avatar}</div>}
        </div>
        <Modal
          open={this.state.open}
          onClose={componentOnCancel}
          show={this.state.open.toString()}>
            <div>
              <AvatarPreview
                previewBackgroundColor={previewBackgroundColor}
                previewBorderRadius={previewBorderRadius}
                image={this.state.selectedImg}
                width={previewWidth}
                height={previewHeight}
                saveButtonText={saveButtonText}
                cancelButtonText={cancelButtonText}
                onSave={componentOnSave}
                onCancel={componentOnCancel}
              />
            </div>
        </Modal>
      </Component>
    );
  }
}

AvatarPicker.propTypes = {
  avatar: PropTypes.node,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  previewBackgroundColor: PropTypes.string,
  previewBorderRadius: PropTypes.oneOfType([PropTypes.string, isNumber]),
  image: PropTypes.string,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  editButtonText: PropTypes.string,
  saveButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  previewWidth: isNumber,
  previewHeight: isNumber,
};
AvatarPicker.defaultProps = { 
  component: 'div',
  previewBackgroundColor: "white",
  previewBorderRadius: '50%',
  height: 400,
  width: 400, 
  editButtonText: "EDIT",
  saveButtonText: "Save", 
  cancelButtonText: "Cancel"
};

export default withStyles(styles, { name: 'MuiAvatarPicker' })(AvatarPicker);