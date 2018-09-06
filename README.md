# material-ui-avatar-picker

material-ui-avatar-picker is a image previewer with crop capabilities based on DropsOfSerenity/react-avatar-cropper.  I created this port to use @material-ui/core components and also update to a newer version of React (16.3.0).

> #### Credit: react-avatar-cropper 
> https://github.com/DropsOfSerenity/react-avatar-cropper

## Installation

In your project

```shell
npm install --save material-ui-avatar-picker

# install dependancies
npm install --save react
npm install --save @material-ui/core
```

## Usage

```js
// require the component...
var AvatarPicker = require("material-ui-avatar-picker");

// and in the render function of wherever you please...
render: function() {
  return (
    <AvatarPicker
      onRequestHide={this.handleRequestHide}
      previewBackgroundColor={this.previewBackgroundColor}
      onSave={this.handleSave}
      image={this.state.img}
      width={400}
      height={400}
    />
  );
}
```

## Example

A very simple example of the usage is in the exmple folder.  

To run the example.
```shell
npm install
npm start
```

This will webpack-server-dev on port 9021.  Once it is running navigate to http://localhost:9021/webpack-dev-server/


## Contributing

If you want to contribute to this package please submit issues to be tracked or even submit pull-requests if you would like to take on the enhancement yourself.

Thanks!

-----------------------
