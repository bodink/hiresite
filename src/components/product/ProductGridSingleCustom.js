import { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Rating from "./sub-components/ProductRating";
import { getDiscountPrice } from "../../helpers/product";
import ProductModal from "./ProductModal";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";

// custom
import { isNewProduct } from "../../helpers/isNewProduct.js";
import { useUser } from "../../context/User/UserContext";

const ProductGridSingleCustom = ({
  product,
  currency,
  cartItem,
  wishlistItem,
  compareItem,
  spaceBottomClass
}) => {
  const [modalShow, setModalShow] = useState(false);
  //   const discountedPrice = getDiscountPrice(product.price, product.discount);
  //   const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
  //   const finalDiscountedPrice = +(
  //     discountedPrice * currency.currencyRate
  //   ).toFixed(2);
  const dispatch = useDispatch();

  // custom
  let discountedPrice = null;
  let finalDiscountedPrice = null;
  let finalProductPrice = null;
  
  const { user } = useUser();

  return (
    <Fragment>
      <div className={clsx("product-wrap", spaceBottomClass)}>
        <div className="product-img">
          <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
            <img
              className="default-img"
              src={product?.images[0]?.url}
              alt={product.title}
            />
            {product.images.length > 1 ? (
              <img
                className="hover-img"
                src={product?.images[1]?.url}
                alt={product.title}
              />
            ) : (
              ""
            )}
          </Link>

          {product?.discountable || isNewProduct(product) ? (
            <div className="product-img-badges">
              {product?.discountable && product?.variants?.length > 1 ? (
                <span className="pink">
                  -{product.variants[0].metadata.discount_value}{product.variants[0].metadata.discount_type === "percentage" ? "%" : "EUR"}
                </span>
              ) : (
                <span className="pink">
                  -{product?.variants[0]?.metadata.discount_value}{product?.variants[0]?.metadata.discount_type === "percentage" ? "%" : "EUR"}
                </span>
              )}
              {isNewProduct(product) ? <span className="purple">New</span> : ""}
            </div>
          ) : (
            ""
          )}

          <div className="product-action">
            <div className="pro-same-action pro-wishlist">
              <button
                className={wishlistItem !== undefined ? "active" : ""}
                disabled={wishlistItem !== undefined}
                title={
                  wishlistItem !== undefined
                    ? "Added to wishlist"
                    : "Add to wishlist"
                }
                // onClick={() => dispatch(addToWishlist(product))}
              >
                <i className="pe-7s-like" />
              </button>
            </div>
            <div className="pro-same-action pro-cart">
              
              {product?.variants && product?.variants?.length > 1 ?
                (
                  <Link to={`${process.env.PUBLIC_URL}/product/${product.id}`} >
                    Select Option
                  </Link>
                )
                :
                product?.variants[0]?.inventory_quantity > 0 ? (
                  <button
                    // onClick={() => dispatch(addToCart(product))}
                    className={
                      cartItem !== undefined && cartItem.variants[0].inventory_quantity > 0
                        ? "active"
                        : ""
                    }
                    disabled={cartItem !== undefined && cartItem.variants[0].inventory_quantity > 0}
                    title={
                      cartItem !== undefined ? "Added to cart" : "Add to cart"
                    }
                  >
                    {" "}
                    <i className="pe-7s-cart"></i>{" "}
                    {cartItem !== undefined && cartItem.variants[0].inventory_quantity > 0
                      ? "Added"
                      : "Add to cart"}
                  </button>
                )
                :
                (
                  <button disabled className="active">
                    Out of Stock
                  </button>
                )
              }
            </div>
            <div className="pro-same-action pro-quickview">
              <button title="Quick View" onClick={() => setModalShow(true)}>
                <i className="pe-7s-look" />
              </button>
            </div>
          </div>
        </div>
        <div className="product-content text-center">
          <h3>
            <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
              {product.title}
            </Link>
          </h3>
          {product.rating && product.rating > 0 ? (
            <div className="product-rating">
              <Rating ratingValue={product.rating} />
            </div>
          ) : (
            ""
          )}

          {/* Add price of the product functionality */}
          <div className="product-price">
            {/* {discountedPrice !== null ? (
              <Fragment>
                <span>{currency.currencySymbol + finalDiscountedPrice}</span>{" "}
                <span className="old">
                  {currency.currencySymbol + finalProductPrice}
                </span>
              </Fragment>
            ) : (
              <span>{currency.currencySymbol + finalProductPrice} </span>
            )} */}
            {product.variants.prices <= 1 ? 
              <span>
                {product?.variants[0]?.prices[0]?.currency_code 
                + " " + 
                product?.variants[0]?.calculated_price_incl_tax} 
              </span>
              :
              <span>
                {product?.variants[0]?.prices[0]?.currency_code 
                + " " + 
                product?.variants[0]?.calculated_price_incl_tax}
              </span>
            }
          </div>

        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
        discountedPrice={discountedPrice}
        finalProductPrice={finalProductPrice}
        finalDiscountedPrice={finalDiscountedPrice}
        wishlistItem={wishlistItem}
        compareItem={compareItem}
      />
    </Fragment>
  );
};

ProductGridSingleCustom.propTypes = {
  cartItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({}),
  wishlistItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  product: PropTypes.shape({}),
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default ProductGridSingleCustom;
