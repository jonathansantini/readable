export function formatComments (comments) {
  return comments.allIds ? comments.allIds.reduce((c, id) => {
    c.push(comments.byId[id]);
    return c;
  }, []) : [];
}