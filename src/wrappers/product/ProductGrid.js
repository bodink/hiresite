import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProducts } from "../../helpers/product";
import ProductGridSingle from "../../components/product/customProductGridSingle";

// custom
import { useMedusa } from "../../context/medusa/MedusaContext";
import ProductGridSingleCustom from "../../components/product/ProductGridSingleCustom";
import { website_region } from "../../environmentVariables/env";
import { useUser } from "../../context/User/UserContext";


const ProductGrid = ({
  spaceBottomClass,
  category,
  type,
  limit
}) => {
  const { products } = useSelector((state) => state.product);
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);
  const prods = getProducts(products, category, type, limit);
  
  // custom
  const { medusa } = useMedusa();
  const { region } = useUser();
  const [myProducts, setProducts] = useState([]);

  useEffect(() => {
    if (!medusa) return;
    medusa.products.list({
      region_id: region.id, 
      limit: limit
    })
    .then(({ products, limit, offset, count }) => {
      // show customer the products
      setProducts(products);
    });
  }, [medusa]);

  return (
    <Fragment>
      {myProducts?.map(product => {
        return (
          <div className="col-xl-3 col-md-6 col-lg-4 col-sm-6" key={product.id}>
            <ProductGridSingleCustom
              spaceBottomClass={spaceBottomClass}
              product={product}
              currency={currency}
              cartItem={
                cartItems.find((cartItem) => cartItem.id === product.id)
              }
              wishlistItem={
                wishlistItems.find(
                  (wishlistItem) => wishlistItem.id === product.id
                )
              }
              compareItem={
                compareItems.find(
                  (compareItem) => compareItem.id === product.id
                )
              }
            />
          </div>
        );
      })}
    </Fragment>
  );
};

ProductGrid.propTypes = {
  spaceBottomClass: PropTypes.string,
  category: PropTypes.string,
  type: PropTypes.string,
  limit: PropTypes.number
};



export default ProductGrid;
