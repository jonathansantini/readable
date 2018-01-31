import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentMinus from 'material-ui/svg-icons/content/remove';

const btnStyle = {
  minWidth: 36,
  lineHeight: `26px`,
  height: 30,
};

const iconStyle = {
  width: 18,
};

/**
 * Functional component used to display the category list.
 * @extends React
 */
function VoteScore (props) {
  const { id, handleVote } = props;

  return (
    <div className="voteScore">
      <FlatButton secondary={true}
        style={btnStyle}
        icon={<ContentAdd style={iconStyle} />}
        href="#"
        onClick={(e) => { e.preventDefault(); handleVote({ id, option: 'upVote' }); }}
      />
      <span className="voteScore__txt">VOTE</span>
      <FlatButton secondary={true}
        style={btnStyle}
        icon={<ContentMinus style={iconStyle} />}
        href="#"
        onClick={(e) => { e.preventDefault(); handleVote({ id, option: 'downVote' }); }}
      />
    </div>
  )
}

VoteScore.propTypes = {
  id: PropTypes.string.isRequired,
  handleVote: PropTypes.func.isRequired
}

export default VoteScore;