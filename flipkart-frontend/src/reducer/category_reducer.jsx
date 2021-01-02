import { categoryConstants } from "../actions/actionConstants";

const initState = {
  categories: [],
  newlyCreatedCategory: [],
  loading: false,
  error: null,
};

const updatedCategory = (parentId, categories, createdCategory) => {
  let newlyUpdatedCategory = [];

  if (parentId === undefined) {
    return [
      ...categories,
      {
        _id: createdCategory._id,
        name: createdCategory.name,
        slug: createdCategory.slug,
        parentId: createdCategory.parentId,
        categoryImage: createdCategory.categoryImage,
        children: [],
      },
    ];
  }

  for (let category of categories) {
    if (category._id === parentId) {
      newlyUpdatedCategory.push({
        ...category,
        children: category.children
          ? updatedCategory(
              parentId,
              [
                ...category.children,
                {
                  _id: createdCategory._id,
                  name: createdCategory.name,
                  slug: createdCategory.slug,
                  parentId: createdCategory.parentId,
                  categoryImage: createdCategory.categoryImage,
                  children: createdCategory.children,
                },
              ],
              createdCategory
            )
          : [],
      });
    } else {
      newlyUpdatedCategory.push({
        ...category,
        children: category.children
          ? updatedCategory(parentId, category.children, createdCategory)
          : [],
      });
    }
  }
  return newlyUpdatedCategory;
};

const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
      state = {
        ...state,
        categories: action.payload.allCategories,
        loading: false,
      };
      break;
    case categoryConstants.GET_ALL_CATEGORIES_FAILURE:
      state = {
        ...initState,
        error: action.payload.error,
      };
      break;
    case categoryConstants.CREATE_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.CREATE_CATEGORY_SUCCESS:
      const _updatedCategory = updatedCategory(
        action.payload.createdCategory.parentId,
        state.categories,
        action.payload.createdCategory
      );
      // console.log("update -", _updatedCategory);
      state = {
        ...state,
        newlyCreatedCategory: action.payload.createdCategory,
        categories: _updatedCategory,
        loading: false,
      };
      break;
    case categoryConstants.CREATE_CATEGORY_FAILURE:
      state = {
        ...initState,
        error: action.payload.error,
      };
      break;
    default:
      break;
  }

  return state;
};

export default categoryReducer;
