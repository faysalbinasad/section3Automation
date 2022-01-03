import categories from 'testData/categories';

function convertDataToDropdownOptions() {
  return categories.map((category, index) => ({
    key: index,
    text: category.name,
    value: category.name,
  }));
};

function convertCategoriesForSubmission(categoryList) {
  return categoryList.map(cl => categories.find(c => c.name === cl));
}

export { convertDataToDropdownOptions, convertCategoriesForSubmission };
