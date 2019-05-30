//import "./styles.css";
import { isNumeric } from './utils'
import _ from 'lodash';

import warning from "warning";

export var isNumber = (props, propName, componentName) => {
  warning(
    isNumeric(props[propName]),
    `Invalid ${propName} '${props.size}' sent to '${componentName}'. Requires an
    int or string capable of conversion to an int.
    Check the render method of == '${componentName}'. == `
  );
};

