export function isValidFormType (type) {
  const validTypes = ['post', 'comment'];
  return validTypes.includes(type);
}

export function isPostForm (type) {
  return type === 'post' ? true : false;
}

export function isCommentForm (type) {
  return type === 'comment' ? true : false
}