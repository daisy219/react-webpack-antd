import React from 'react';
import PropTypes from 'prop-types';

interface LinkPropsType {
  onClick: <T extends {}>() => {};
  active: any;
  children: any;
}

const Link: React.FunctionComponent<LinkPropsType>  = (props) => (
  <button
    onClick={props.onClick}
    disabled={props.active}
    style={{
      marginLeft: '4px',
    }}
  >
    {props.children}
  </button>
);

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Link;
