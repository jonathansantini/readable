export function formatComment (id, comments) {
  return comments.byId && id && comments.byId[id] ? comments.byId[id] : {};
}

export function formatComments (comments) {
  return comments.allIds ? comments.allIds.reduce((c, id) => {
    c.push(comments.byId[id]);
    return c;
  }, []) : [];
}