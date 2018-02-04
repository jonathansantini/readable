import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const style = {
  marginLeft: '50%',
  container: {
    position: 'relative',
  },
};

/**
 * Functional component used to display the loading icon.
 * @extends React
 */
const Loading = () => (
  <RefreshIndicator
    size={50}
    left={-25}
    top={175}
    status="loading"
    style={style}
  />
)

export default Loading;