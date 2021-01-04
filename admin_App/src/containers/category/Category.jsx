import React, { useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, updateCategories, deleteCategories } from "../../actions";
import { Col, Container, Row } from "react-bootstrap";
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
  IoIosAirplane,
  IoIosArrowDown,
  IoIosBody,
  IoIosAnalytics,
  IoIosLeaf,
  IoIosTrash,
  IoIosSync,
  IoMdAdd,
} from "react-icons/io";
import "./category.css";

function Category() {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const [show, setShow] = useState(false);
  const [modalButtonVisibility, setModalButtonVisibility] = useState(true);
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

    if (categoryName === "") {
      alert("Category Name can't be empty");
      setShow(false);
      return;
    }

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
        type: category.type,
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
    updateAndDeleteCategoryReusableFunc();
    if (checked.length || expanded.length) {
      setModalButtonVisibility(true);
    } else if (checked.length === 0 && expanded.length === 0) {
      setModalButtonVisibility(false);
    }
    setUpdateCategoryModal(true);
  };

  const updateAndDeleteCategoryReusableFunc = () => {
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

    dispatch(updateCategories(form));

    setUpdateCategoryModal(false);
  };

  //!NOTE RENDER ADD CATEGORY MODAL
  const renderAddCategoryModal = () => {
    return (
      <NewModal
        hideModal={hideModal}
        handleClose={handleClose}
        show={show}
        buttonLabel="Add"
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
    );
  };

  //!NOTE RENDER UPDATE CATEGORY MODAL

  const renderUpdateCategoryModal = () => {
    return (
      <NewModal
        hideModal={hideUpdateCategoryModal}
        handleClose={updateCategory}
        show={updateCategoryModal}
        modalTitle="Update Categories"
        size="lg"
        visibility={modalButtonVisibility}
        buttonLabel="Update"
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
                    {createCategoryList(category.categories).map((option) => {
                      return (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      );
                    })}
                  </select>
                </Col>
                <Col>
                  <select
                    className="form-control"
                    value={item.type}
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
          <h6>There is nothing expanded</h6>
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
                    {createCategoryList(category.categories).map((option) => {
                      return (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      );
                    })}
                  </select>
                </Col>
                <Col>
                  <select
                    className="form-control"
                    value={item.type}
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
          <h6>There is nothing checked</h6>
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
    );
  };

  //!NOTE RENDER DELETE CATEGORY MODAL

  const hideDeleteCategoryModal = () => {
    setDeleteCategoryModal(false);
  };
  const renderDeleteCategoryModal = () => {
    return (
      <NewModal
        hideModal={hideDeleteCategoryModal}
        handleClose={(e) => setDeleteCategoryModal(false)}
        show={deleteCategoryModal}
        display="false"
        modalTitle="Are you sure!"
        visibility={modalButtonVisibility}
        buttons={[
          {
            label: "No",
            color: "primary",
            onClick: hideDeleteCategoryModal,
          },
          {
            label: "Yes",
            color: "danger",
            onClick: deleteCategory,
          },
        ]}
      >
        {/* {expandedArray.length > 0 ? (
          <>
            <h6>Expanded items</h6>
            <p>
              {expandedArray.map((item, index) => {
                return <span key={index}>{item.name}&nbsp;</span>;
              })}
            </p>
          </>
        ) : (
          <h6>Nothing expanded</h6>
        )} */}

        {checkedArray.length > 0 ? (
          <>
            <h6>The items you want to delete</h6>
            <p>
              {checkedArray.map((item, index) => {
                return <span key={index}>{item.name}&nbsp;</span>;
              })}
            </p>
          </>
        ) : (
          <h6>Nothing selected</h6>
        )}
      </NewModal>
    );
  };

  //!NOTE DELETE CATEGORY FUNC

  const deleteCategory = () => {
    const deletedCheckedArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));

    if (deletedCheckedArray.length > 0) {
      dispatch(deleteCategories(deletedCheckedArray));
    }

    setDeleteCategoryModal(false);
  };

  const deleteCategoryConfirmation = () => {
    // console.log("checkedA", checkedArray);
    // console.log("expandedA", expandedArray);

    updateAndDeleteCategoryReusableFunc();

    if (checked.length) {
      setModalButtonVisibility(true);
    } else {
      setModalButtonVisibility(false);
    }
    setDeleteCategoryModal(true);
  };

  return (
    <Layout sidebar={true}>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <div className="actionButtonContainer">
                <span>Admin actions</span>
                <button className="btn btn-primary" onClick={handleShow}>
                  <IoMdAdd />
                  <span>Add</span>
                </button>
                <button
                  className="btn btn-success"
                  onClick={updateCategoryModalOpen}
                >
                  <IoIosSync />
                  <span>Edit</span>
                </button>
                <button
                  className="btn btn-danger"
                  onClick={deleteCategoryConfirmation}
                >
                  <IoIosTrash />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
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
                expandAll: <IoIosAirplane />,
                collapseAll: <IoIosArrowDown />,
                parentClose: <IoIosBody />,
                parentOpen: <IoIosAnalytics />,
                leaf: <IoIosLeaf />,
              }}
            />

            {renderAddCategoryModal()}
            {renderUpdateCategoryModal()}
            {renderDeleteCategoryModal()}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Category;
