export function isValidCategory (category, categories) {
  let isValidCat = true;
  if (category && categories.loaded) {
    if (categories.allIds.indexOf(category) < 0) {
      isValidCat = false;
    }
  }
  return isValidCat;
}

export function getAllCategories (categories) {
  return categories.allIds ? categories.allIds.reduce((cats, id) => {
    cats.push(categories.byId[id]);
    return cats;
  }, []) : [];
}