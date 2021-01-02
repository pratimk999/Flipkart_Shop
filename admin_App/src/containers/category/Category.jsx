import React, { useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getAllCategories, updateCategories } from "../../actions";
import { Col, Container, Row, Button } from "react-bootstrap";
import Input from "../../components/Input";
import NewModal from "../../components/NewModal";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import CheckboxTree from "react-checkbox-tree";
import {
  IoMdCheckmarkCircle,
  IoMdRadioButtonOff,
  IoMdCheckmarkCircleOutline,
  IoMdArrowDropright,
  IoMdArrowDropdown,
} from "react-icons/io";

function Category() {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [categoryParentId, setCategoryParentId] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);

  const handleClose = () => {
    const form = new FormData();

    form.append("name", categoryName);
    form.append("categoryImage", categoryImage);
    form.append("parentId", categoryParentId);

    setCategoryImage("");
    setCategoryName("");
    setCategoryParentId("");

    dispatch(addCategory(form));
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const hideModal = () => {
    setCategoryImage("");
    setCategoryName("");
    setCategoryParentId("");
    setShow(false);
  };
  const renderCategories = (categories) => {
    let displayCategories = [];
    for (let category of categories) {
      displayCategories.push({
        value: category._id,
        label: category.name,
        children:
          category.children.length && renderCategories(category.children),
      });
    }
    return displayCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
      });
      if (category.children.length) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const hideUpdateCategoryModal = () => {
    setUpdateCategoryModal(false);
  };

  //!NOTE CATEGOTY UPDATE MODAL
  const updateCategoryModalOpen = () => {
    setUpdateCategoryModal(true);
    const categoriesAsList = createCategoryList(category.categories);
    const checkedCategories = [];
    const expandedCategories = [];
    //NOTE FOR CHECKED ONES
    if (checked) {
      checked.forEach((categoryId, index) => {
        const category = categoriesAsList.find((category, _index) => {
          return categoryId === category.value;
        });
        if (category) {
          checkedCategories.push(category);
        }
      });
    }

    //NOTE FOR EXPANDED ONES
    if (expanded) {
      expanded.forEach((categoryId, index) => {
        const category = categoriesAsList.find((category, _index) => {
          return categoryId === category.value;
        });
        if (category) {
          expandedCategories.push(category);
        }
      });
    }
    console.log({
      expanded,
      checked,
      categoriesAsList,
      checkedCategories,
      expandedCategories,
    });
    setExpandedArray(expandedCategories);
    setCheckedArray(checkedCategories);
    console.log(expandedArray);
  };

  //!NOTE CATEGORY UPDATE ONCHANGE FUNC

  const handleCategoryUpdate = (key, value, index, type) => {
    if (type === "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : { ...item }
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type === "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : { ...item }
      );
      setExpandedArray(updatedExpandedArray);
    }
  };

  //!NOTE CATEGORY UPDATE FUNC
  const updateCategory = () => {
    const form = new FormData();

    if (checkedArray) {
      checkedArray.forEach((category) => {
        form.append("name", category.name);
        form.append("parentId", category.parentId ? category.parentId : "");
        form.append("type", category.type);
        form.append("_id", category.value);
      });
    }

    if (expandedArray) {
      expandedArray.forEach((category) => {
        form.append("name", category.name);
        form.append("parentId", category.parentId ? category.parentId : "");
        form.append("type", category.type);
        form.append("_id", category.value);
      });
    }

    dispatch(updateCategories(form)).then((res) => {
      if (res) {
        dispatch(getAllCategories());
      }
    });

    setUpdateCategoryModal(false);
  };

  return (
    <Layout sidebar={true}>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <Button variant="primary" onClick={handleShow}>
                Add
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {/* <ul>{renderCategories(category.categories)}</ul> */}
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoMdCheckmarkCircle />,
                uncheck: <IoMdRadioButtonOff />,
                halfCheck: <IoMdCheckmarkCircleOutline />,
                expandClose: <IoMdArrowDropright />,
                expandOpen: <IoMdArrowDropdown />,
                // expandAll: <span className="rct-icon rct-icon-expand-all" />,
                // collapseAll: (
                //   <span className="rct-icon rct-icon-collapse-all" />
                // ),
                // parentClose: (
                //   <span className="rct-icon rct-icon-parent-close" />
                // ),
                // parentOpen: <span className="rct-icon rct-icon-parent-open" />,
                // leaf: <span className="rct-icon rct-icon-leaf" />,
              }}
            />

            <NewModal
              hideModal={hideModal}
              handleClose={handleClose}
              show={show}
              modalTitle="Add New Category"
            >
              <Input
                type="text"
                placeholder="Category Name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
              <select
                className="form-control"
                value={categoryParentId}
                onChange={(e) => setCategoryParentId(e.target.value)}
              >
                <option>Select category</option>
                {createCategoryList(category.categories).map((option) => {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  );
                })}
              </select>
              <Input
                type="file"
                name={categoryImage}
                onChange={(e) => setCategoryImage(e.target.files[0])}
                style={{ marginTop: "15px" }}
              />
            </NewModal>

            {/* NOTE CATEGORY UPDATE */}

            <NewModal
              hideModal={hideUpdateCategoryModal}
              handleClose={updateCategory}
              show={updateCategoryModal}
              modalTitle="Update Categories"
              size="lg"
            >
              <h5>Expanded</h5>
              {expandedArray.length ? (
                expandedArray.map((item, index) => {
                  return (
                    <Row key={index}>
                      <Col>
                        <Input
                          type="text"
                          placeholder="Category Name"
                          value={item.name}
                          onChange={(e) =>
                            handleCategoryUpdate(
                              "name",
                              e.target.value,
                              index,
                              "expanded"
                            )
                          }
                        />
                      </Col>
                      <Col>
                        <select
                          className="form-control"
                          value={item.parentId}
                          onChange={(e) =>
                            handleCategoryUpdate(
                              "parentId",
                              e.target.value,
                              index,
                              "expanded"
                            )
                          }
                        >
                          <option>Select category</option>
                          {createCategoryList(category.categories).map(
                            (option) => {
                              return (
                                <option key={option.value} value={option.value}>
                                  {option.name}
                                </option>
                              );
                            }
                          )}
                        </select>
                      </Col>
                      <Col>
                        <select
                          className="form-control"
                          onChange={(e) =>
                            handleCategoryUpdate(
                              "type",
                              e.target.value,
                              index,
                              "expanded"
                            )
                          }
                        >
                          <option value="">Select Type</option>
                          <option value="store">Store</option>
                          <option value="page">Page</option>
                          <option value="productList">Product List</option>
                        </select>
                      </Col>
                    </Row>
                  );
                })
              ) : (
                <h5>There is nothing expanded</h5>
              )}
              <h5>Checked</h5>
              {checkedArray.length ? (
                checkedArray.map((item, index) => {
                  return (
                    <Row key={index}>
                      <Col>
                        <Input
                          type="text"
                          placeholder="Category Name"
                          value={item.name}
                          onChange={(e) =>
                            handleCategoryUpdate(
                              "name",
                              e.target.value,
                              index,
                              "checked"
                            )
                          }
                        />
                      </Col>
                      <Col>
                        <select
                          className="form-control"
                          value={item.parentId}
                          onChange={(e) =>
                            handleCategoryUpdate(
                              "parentId",
                              e.target.value,
                              index,
                              "checked"
                            )
                          }
                        >
                          <option>Select category</option>
                          {createCategoryList(category.categories).map(
                            (option) => {
                              return (
                                <option key={option.value} value={option.value}>
                                  {option.name}
                                </option>
                              );
                            }
                          )}
                        </select>
                      </Col>
                      <Col>
                        <select
                          className="form-control"
                          onChange={(e) =>
                            handleCategoryUpdate(
                              "type",
                              e.target.value,
                              index,
                              "checked"
                            )
                          }
                        >
                          <option value="">Select Type</option>
                          <option value="store">Store</option>
                          <option value="page">Page</option>
                          <option value="productList">Product List</option>
                        </select>
                      </Col>
                    </Row>
                  );
                })
              ) : (
                <h5>There is nothing checked</h5>
              )}

              {/* <Row>
                <Col>
                  <Input
                    type="file"
                    name={categoryImage}
                    onChange={(e) => setCategoryImage(e.target.files[0])}
                  />
                </Col>
              </Row> */}
            </NewModal>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              variant="success"
              onClick={updateCategoryModalOpen}
              style={{ margin: "10px" }}
            >
              Edit
            </Button>
            <Button variant="danger">Delete</Button>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Category;
