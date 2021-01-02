import React, { useEffect } from "react";
import "../styling/menuHeader.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "../actions";
function MenuHeader() {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
  const renderCategories = (categories) => {
    let displayCategories = [];
    for (let category of categories) {
      displayCategories.push(
        <li key={category.name}>
          {category.parentId ? (
            <a href={category.slug}>{category.name}</a>
          ) : (
            <span>{category.name}</span>
          )}

          {category.children.length ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return displayCategories;
  };

  return (
    <div className="menuHeader">
      <ul>
        {category.categories ? renderCategories(category.categories) : null}
      </ul>
    </div>
  );
}

export default MenuHeader;
