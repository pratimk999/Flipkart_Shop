import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Layout from "../../components/Layout";
import NewModal from "../../components/NewModal";
import Input from "../../components/Input";
import { useSelector, useDispatch } from "react-redux";
import linearCategoriesList from "../../helpers/linearCategoriesList";
import { createPage } from "../../actions";

function NewPage() {
  const [hideCreatePageModal, setHideCreatePageModal] = useState(false);
  const [title, setTitle] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [pageDesc, setPageDesc] = useState("");
  const [type, setType] = useState("");
  const [banners, setBanners] = useState([]);
  const [productImg, setProductImg] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const category = useSelector((state) => state.category);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    setAllCategories(linearCategoriesList(category.categories));
  }, [category]);

  const onCategoryChange = (e) => {
    const category = allCategories.find(
      (category) => category._id === e.target.value
    );
    setCategoryId(e.target.value);
    setType(category.type);
  };

  //!NOTE HANDLECLOSE OF BUTTON
  const handleClose = () => {
    const form = new FormData();

    if (title === "") {
      alert("Title can't be empty");
      setHideCreatePageModal(false);
      return;
    }
    if (pageDesc === "") {
      alert(
        "Page Description can't be empty,if you don't have description write NA"
      );
      setHideCreatePageModal(false);
      return;
    }
    form.append("title", title);
    form.append("description", pageDesc);
    form.append("type", type);
    form.append("category", categoryId);
    if (auth.authenticate) {
      form.append("createdBy", auth.user._id);
    }
    banners.forEach((banner, index) => {
      form.append("banners", banner);
    });
    productImg.forEach((product, index) => {
      form.append("products", product);
    });
    setHideCreatePageModal(false);
    dispatch(createPage(form));
    // console.log({ title, pageDesc, type, banners, productImg });
  };

  const showCreatePageModal = () => {
    setHideCreatePageModal(true);
  };

  const hideModal = () => {
    setHideCreatePageModal(false);
  };

  const handleBanners = (e) => {
    setBanners([...banners, e.target.files[0]]);
  };

  const handleProductImg = (e) => {
    setProductImg([...productImg, e.target.files[0]]);
  };

  const renderCreatePageModal = () => {
    return (
      <NewModal
        hideModal={hideModal}
        handleClose={handleClose}
        show={hideCreatePageModal}
        buttonLabel="Add"
        modalTitle="Create New Page"
      >
        <Row>
          <Col>
            <select
              name="select category"
              className="form-control"
              onChange={onCategoryChange}
              value={categoryId}
            >
              <option value="">Select Category</option>
              {allCategories.map((item, index) => {
                return (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              type="text"
              placeholder="Page Name"
              value={title}
              style={{ marginTop: "15px" }}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              type="text"
              placeholder="Page Description"
              value={pageDesc}
              onChange={(e) => setPageDesc(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              type="file"
              name={banners}
              onChange={handleBanners}
              placeholder="Banner pic"
            />
          </Col>
        </Row>
        {banners.length
          ? banners.map((banner, index) => {
              return (
                <Row
                  key={index}
                  style={{ marginBottom: "5px", marginTop: "5px" }}
                >
                  <Col>{banner.name}</Col>
                </Row>
              );
            })
          : null}

        <Row>
          <Col>
            <Input type="file" name={productImg} onChange={handleProductImg} />
          </Col>
        </Row>
        {productImg.length
          ? productImg.map((product, index) => {
              return (
                <Row
                  key={index}
                  style={{ marginBottom: "5px", marginTop: "5px" }}
                >
                  <Col>{product.name}</Col>
                </Row>
              );
            })
          : null}
      </NewModal>
    );
  };

  return (
    <Layout sidebar>
      <button onClick={showCreatePageModal}>click</button>

      {renderCreatePageModal()}
    </Layout>
  );
}

export default NewPage;
