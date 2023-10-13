import React, { useEffect } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";

//백엔드에 상품 등록한 데이터 불러올땐
//1. productAction에서 백엔드 데이터 가져와야함
//2. useEffect 사용하고 각 제품은 product card에서 props해서 수정할것

const ProductAll = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) =>state.product.productList)
  const [query, serQuery] = useSearchParams();
  const name = query.get("name");

  useEffect(() => {
    dispatch(
      productActions.getProductList({
        name,
      })
    )
  },[query])

  // const error = useSelector((state) => state.product.error);

  // 처음 로딩하면 상품리스트 불러오기

  return (
    <Container>
      <Row>
        {productList.length > 0 ? (
            productList.map((item) => (
              <Col md={3} sm={12} key={item._id}>
                <ProductCard item={item} />
              </Col>
            ))
          ) : (
            <div className="text-align-center empty-bag">
              {name === "" ? (
                <h2>등록된 상품이 없습니다!</h2>
              ) : (
                <h2>{name}과 일치한 상품이 없습니다!`</h2>
              )}
            </div>
          )}
      </Row>
    </Container>
  );
};

export default ProductAll;
