export function isValidComment (comment, commentId, loaded) {
  const hasKeys = Object.keys(comment).length > 0;
  return loaded && !hasKeys && commentId ? false : true;
}

export function formatComment (id, comments) {
  return comments.byId && id && comments.byId[id] ? comments.byId[id] : {};
}

export function formatComments (comments) {
  return comments.allIds ? comments.allIds.reduce((c, id) => {
    const comment = comments.byId[id];
    if (!comment.deleted) {
      c.push(comment);
    }
    return c;
  }, []) : [];
}