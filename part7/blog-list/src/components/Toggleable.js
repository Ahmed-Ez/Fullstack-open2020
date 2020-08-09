import React, { useState, useImperativeHandle } from 'react';
import propTypes from 'prop-types';

const Toggleable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => setVisible(!visible);
  const hideIfVisible = { display: visible ? 'none' : '' };
  const showIfVisible = { display: visible ? '' : 'none' };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideIfVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showIfVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

Toggleable.displayName = 'Togglable';
Toggleable.propTypes = {
  buttonLabel: propTypes.string.isRequired,
};

export default Toggleable;
