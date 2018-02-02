import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentMinus from 'material-ui/svg-icons/content/remove';
import Badge from 'material-ui/Badge';

const btnStyle = {
  minWidth: 36,
  lineHeight: `26px`,
  height: 30,
};

const iconStyle = {
  width: 18,
};

const badge = {
  top: 0,
  right: 15
}

/**
 * Functional component used to display the category list.
 * @extends React
 */
function VoteScore (props) {
  const { id, handleVote, score } = props;

  return (
    <div className="voteScore">
      <FlatButton secondary={true}
        style={btnStyle}
        icon={<ContentAdd style={iconStyle} />}
        href="#"
        onClick={(e) => { e.preventDefault(); handleVote({ id, option: 'upVote' }); }}
      />
      <Badge
        badgeContent={score}
        primary={true}
        badgeStyle={badge}
      >
        <span className="voteScore__txt">VOTE</span>
      </Badge>
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
  score: PropTypes.number.isRequired,
  handleVote: PropTypes.func.isRequired
}

export default VoteScore;