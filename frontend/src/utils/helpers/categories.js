export function getAllCategories (categories) {
  return categories.allIds ? categories.allIds.reduce((cats, id) => {
    cats.push(categories.byId[id]);
    return cats;
  }, []) : [];
}