export function isFormLoaded (id, loaded) {
  return id && !loaded ? false : true;
}

export function generateRandomPostId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 14);
}