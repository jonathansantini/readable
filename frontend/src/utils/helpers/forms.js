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

export function generateRandomPostId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 14);
}