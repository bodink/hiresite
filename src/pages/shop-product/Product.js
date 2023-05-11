import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";

// custom
import { useMedusa } from "../../context/medusa/MedusaContext";
import { useUser } from "../../context/User/UserContext";

const Product = () => {
  let { pathname } = useLocation();
  let { id } = useParams();
  const { products } = useSelector((state) => state.product);
  const product = products.find(product => product.id === id);

  // custom
  const { medusa } = useMedusa();
  const { region } = useUser();

  const [myProduct, setProduct] = useState(null);

  useEffect(() => {
    if (!medusa) return;

    medusa.products.list({
      id: id,
      region_id: region.id,
    })
    .then(({ products, limit, offset, count }) => {
      setProduct(products[0]);
    });
  }, [medusa, id]);

  useEffect(() => {
    console.log(myProduct);
  }, [myProduct]);

  return (
    <Fragment>
      <SEO
        titleTemplate="Product Page"
        description="Product Page of flone react minimalist eCommerce template."
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Shop Product", path: process.env.PUBLIC_URL + pathname }
          ]}
        />

        {/* product description with image */}
        <ProductImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          product={myProduct}
        />

        {/* product description tab */}
        <ProductDescriptionTab
          spaceBottomClass="pb-90"
          productFullDesc={myProduct?.description}
        />

        {/* related product slider */}
        {/* <RelatedProductSlider
          spaceBottomClass="pb-95"
          category={null}
          // category={product.category[0]}
        /> */}
      </LayoutOne>
    </Fragment>
  );
};

export default Product;
