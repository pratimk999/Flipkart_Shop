import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Col, Container, Row, Button, Table } from "react-bootstrap";
import Input from "../../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions";
import NewModal from "../../components/NewModal";
import "./product.css";
import { productImageBaseUrl } from "../../urlConfig";

function Product() {
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getInitialData());
  // }, [dispatch]);

  const [productModal, setProductModal] = useState(false);
  const [productModalItem, setProductModalItem] = useState({});
  const [productModaItemCategory, setProductModaItemCategory] = useState("");
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [productPicture, setProductPicture] = useState([]);

  const handleShow = () => setShow(true);
  const hideModal = () => {
    setCategoryName("");
    setDescription("");
    setName("");
    setPrice("");
    setQuantity("");
    setProductPicture([]);
    setShow(false);
  };
  const handleClose = () => {
    const form = new FormData();

    form.append("name", name);
    form.append("price", price);
    form.append("quantity", quantity);
    form.append("description", description);
    form.append("category", categoryName);

    for (let pic of productPicture) {
      form.append("productPicture", pic);
    }
    dispatch(addProduct(form));
    // dispatch(getInitialData());
    setCategoryName("");
    setDescription("");
    setName("");
    setPrice("");
    setQuantity("");
    setProductPicture([]);
    const data = {
      name,
      price,
      description,
      productPicture,
    };

    console.log(data);

    setShow(false);
  };

  //!NOTE RENDER CATEGORY NAMES IN SELECT TAG
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleFileChange = (e) => {
    setProductPicture([...productPicture, e.target.files[0]]);
  };

  const renderProducts = () => {
    return (
      <Table style={{ fontSize: 13 }} responsive="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {product.products
            ? product.products.map((item) => {
                return (
                  <tr key={item._id} onClick={() => showDetailsModal(item)}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.category.name}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
    );
  };

  const handleCloseDetailsModal = () => {
    setProductModal(false);
  };

  const showDetailsModal = (product) => {
    setProductModal(true);
    setProductModalItem({ ...productModalItem, ...product });
    setProductModaItemCategory(product.category.name);
  };
  const renderProductDetailsModal = () => {
    return (
      <NewModal
        hideModal={handleCloseDetailsModal}
        handleClose={handleCloseDetailsModal}
        show={productModal}
        modalTitle="Product Details"
        size="lg"
        display="false"
      >
        <Row>
          <Col md={6}>
            <label className="key">Name</label>
            <p className="value">{productModalItem.name}</p>
          </Col>
          <Col md={6}>
            <label className="key">Price</label>
            <p className="value">{productModalItem.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <label className="key">Quantity</label>
            <p>{productModalItem.quantity}</p>
          </Col>
          <Col md={6}>
            <label className="key">Category</label>
            <p className="value">{productModaItemCategory}</p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <label className="key">Description</label>
            <p className="value">{productModalItem.description}</p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <label className="key">Product Picture</label>
            <div style={{ display: "flex" }}>
              {productModalItem.productPictures
                ? productModalItem.productPictures.map((pic) => {
                    return (
                      <div key={pic.img} className="productImageContainer">
                        <img
                          src={productImageBaseUrl(pic.img)}
                          alt="can't load"
                        />
                      </div>
                    );
                  })
                : null}
            </div>
          </Col>
        </Row>
      </NewModal>
    );
  };

  const renderAddProductModal = () => {
    return (
      <NewModal
        hideModal={hideModal}
        handleClose={handleClose}
        show={show}
        modalTitle="Add New Product"
      >
        <Input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <select
          className="form-control"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
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
          name={productPicture}
          onChange={handleFileChange}
          style={{ marginTop: "15px" }}
        />
        <hr />
        {productPicture.length > 0
          ? productPicture.map((pic, index) => {
              return <div key={index}>{pic.name}</div>;
            })
          : null}
      </NewModal>
    );
  };
  return (
    <Layout sidebar={true}>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Products</h3>
              <Button variant="primary" onClick={handleShow}>
                Add
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProducts()}</Col>
        </Row>
        {renderAddProductModal()}
        {renderProductDetailsModal()}
      </Container>
    </Layout>
  );
}

export default Product;
