export function isValidComment (comment, loaded) {
  const hasKeys = Object.keys(comment).length > 0;
  return loaded && !hasKeys && comment.id ? false : true;
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