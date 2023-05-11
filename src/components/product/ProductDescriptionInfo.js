import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductCartQuantity } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";

// custom
import { useUser } from "../../context/User/UserContext";

const ProductDescriptionInfo = ({
  product,
  discountedPrice,
  currency,
  finalDiscountedPrice,
  finalProductPrice,
  cartItems,
  wishlistItem,
  compareItem,
}) => {
  const dispatch = useDispatch();
  // const [selectedProductColor, setSelectedProductColor] = useState(
  //   product.variation ? product.variation[0].color : ""
  // );
  // const [selectedProductSize, setSelectedProductSize] = useState(
  //   product.variants ? product?.variants[0]?.title : ""
  // );
  // const [productStock, setProductStock] = useState(
  //   product.variants ? product?.variants[0]?.inventory_quantity : 0
  // );
  const [quantityCount, setQuantityCount] = useState(1);

  // const productCartQty = getProductCartQuantity(
  //   cartItems,
  //   product,
  //   selectedProductColor,
  //   selectedProductSize
  // );


  // custom
  const { region } = useUser();
  const [selectedProductColor, setSelectedProductColor] = useState(null);
  const [selectedProductSize, setSelectedProductSize] = useState();
  const [productStock, setProductStock] = useState();
  const [filteredSizesAvailable, setFilteredSizesAvailable] = useState([]);

  const [selectedVariant, setSelectedVariant] = useState(null);

  const productOptionIdForColor = product?.options?.find((op) => op.title === "Color");
  const productOptionIdForSize = product?.options?.find((op) => op.title === "Size");

  console.log(productOptionIdForColor, productOptionIdForSize);

  useEffect(() => {
    if (selectedProductColor == null) return;
    // console.log(selectedProductColor);
    updateFilteredSizes();
  }, [selectedProductColor]);

  const updateFilteredSizes = () => {
    const variantsArr = [];
    product?.variants?.forEach(variant => {
      const hasColor = variant?.options.find(op => op.value === selectedProductColor.value);
      if (hasColor) {
        let availableSize = variant?.options.find(op => op.option_id === productOptionIdForSize.id);
        variantsArr.push(availableSize);
      }
    })
    setFilteredSizesAvailable(variantsArr);
  }

  console.log(product);

  useEffect(() => {
    // console.log(filteredSizesAvailable);
  }, [filteredSizesAvailable]);

  return (
    <div className="product-details-content ml-70">
      <h2>{product?.title}</h2>
      <div className="product-details-price">
        {product?.discountable ? (
          <Fragment>
            <span>{region?.currency_code + product?.variants[0]?.calculated_price}</span>{" "}
            <span className="old">
              {region?.currency_code + product?.variants[0]?.original_price}
            </span>
          </Fragment>
        ) : (
          <span>{region?.currency_code + product?.variants[0]?.calculated_price_incl_tax} </span>
        )}
      </div>
      {product?.rating && product?.rating > 0 ? (
        <div className="pro-details-rating-wrap">
          <div className="pro-details-rating">
            <Rating ratingValue={product.rating} />
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="pro-details-list">
        <p>{product?.description}</p>
      </div>

      {/* {product.variation ? (
        <div className="pro-details-size-color">
          <div className="pro-details-color-wrap">
            <span>Color</span>
            <div className="pro-details-color-content">
              {product.variation.map((single, key) => {
                return (
                  <label
                    className={`pro-details-color-content--single ${single.color}`}
                    key={key}
                  >
                    <input
                      type="radio"
                      value={single.color}
                      name="product-color"
                      checked={
                        single.color === selectedProductColor ? "checked" : ""
                      }
                      onChange={() => {
                        setSelectedProductColor(single.color);
                        setSelectedProductSize(single.size[0].name);
                        setProductStock(single.size[0].stock);
                        setQuantityCount(1);
                      }}
                    />
                    <span className="checkmark"></span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="pro-details-size">
            <span>Size</span>
            <div className="pro-details-size-content">
              {product.variation &&
                product.variation.map(single => {
                  return single.color === selectedProductColor
                    ? single.size.map((singleSize, key) => {
                        return (
                          <label
                            className={`pro-details-size-content--single`}
                            key={key}
                          >
                            <input
                              type="radio"
                              value={singleSize.name}
                              checked={
                                singleSize.name === selectedProductSize
                                  ? "checked"
                                  : ""
                              }
                              onChange={() => {
                                setSelectedProductSize(singleSize.name);
                                setProductStock(singleSize.stock);
                                setQuantityCount(1);
                              }}
                            />
                            <span className="size-name">{singleSize.name}</span>
                          </label>
                        );
                      })
                    : "";
                })}
            </div>
          </div>
        </div>
      ) : (
        ""
      )} */}

      {/* If there are both options Size and Color available */}
      {product?.variants?.length > 1 &&
        product?.options?.find(op => op?.title === "Color") && (
          <div className="pro-details-size-color">
            <div className="pro-details-color-wrap">
              <span>Color</span>
              <div className="pro-details-color-content">
                {product?.options?.find(op => op?.title === "Color")?.values?.map((val, key) => {
                  return (
                    <label
                      className={`pro-details-color-content--single ${val?.value.toLowerCase()}`}
                      key={key}
                    >
                      <input
                        type="radio"
                        value={val?.value}
                        name="product-color"
                        checked={
                          // work on checked
                          val?.value === selectedProductColor?.val ? "checked" : ""
                        }
                        onChange={() => {
                          setSelectedProductColor(val);
                          setSelectedProductSize();
                          setProductStock();
                          setQuantityCount(1);
                        }}
                      />
                      <span className="checkmark"></span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="pro-details-size">
              <span> Size </span>
              <div className="pro-details-size-content">
                {filteredSizesAvailable.length >= 1 && filteredSizesAvailable.map((size, key) => (
                  <label
                    className={`pro-details-size-content--single`}
                    key={key}
                  >
                    <input
                      type="radio"
                      value={size?.value}
                      checked={
                        size?.value === selectedProductSize
                          ? "checked"
                          : ""
                      }
                      onChange={() => {
                        setSelectedProductSize();
                        setProductStock();
                        setQuantityCount(1);
                      }}
                    />
                    <span className="size-name">{size?.value}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>
        )}

      {/* If there is only 1 option available  */}
      {product?.variants.length > 1 &&
        product?.options?.length == 1 &&
        product?.options[0]?.title === "Size" &&
        <div className="pro-details-size">
          <span> Size </span>
          <div className="pro-details-size-content">
            {product?.variants?.map((variant, key) => (
              <label
                className={`pro-details-size-content--single`}
                key={key}
              >
                <input
                  type="radio"
                  value={variant?.title}
                  checked={
                    variant?.title === selectedProductSize
                      ? "checked"
                      : ""
                  }
                  onChange={() => {
                    setSelectedProductSize();
                    setProductStock();
                    setQuantityCount(1);
                  }}
                />
                <span className="size-name">{variant?.title}</span>
              </label>
            ))}
          </div>
        </div>}

      {product?.affiliateLink ? (
        <div className="pro-details-quality">
          <div className="pro-details-cart btn-hover ml-0">
            <a
              href={product?.affiliateLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              Buy Now
            </a>
          </div>
        </div>
      ) : (
        <div className="pro-details-quality">
          <div className="cart-plus-minus">
            <button
              onClick={() =>
                setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
              }
              className="dec qtybutton"
            >
              -
            </button>
            <input
              className="cart-plus-minus-box"
              type="text"
              value={quantityCount}
              readOnly
            />
            <button
              // onClick={() =>
              // setQuantityCount(
              //   quantityCount < productStock - productCartQty
              //     ? quantityCount + 1
              //     : quantityCount
              // )
              // }
              className="inc qtybutton"
            >
              +
            </button>
          </div>
          <div className="pro-details-cart btn-hover">
            {product?.variants[0]?.inventory_quantity ? (
              <button
                // onClick={() =>
                //   dispatch(addToCart({
                //     ...product,
                //     quantity: quantityCount,
                //     selectedProductColor: selectedProductColor ? selectedProductColor : product.selectedProductColor ? product.selectedProductColor : null,
                //     selectedProductSize: selectedProductSize ? selectedProductSize : product.selectedProductSize ? product.selectedProductSize : null
                //   }))
                // }
                disabled={false}
              >
                {" "}
                Add To Cart{" "}
              </button>
            ) : (
              <button disabled>Out of Stock</button>
            )}
          </div>
          <div className="pro-details-wishlist">
            <button
              className={wishlistItem !== undefined ? "active" : ""}
              disabled={wishlistItem !== undefined}
              title={
                wishlistItem !== undefined
                  ? "Added to wishlist"
                  : "Add to wishlist"
              }
              onClick={() => dispatch(addToWishlist(product))}
            >
              <i className="pe-7s-like" />
            </button>
          </div>
          <div className="pro-details-compare">
            <button
              className={compareItem !== undefined ? "active" : ""}
              disabled={compareItem !== undefined}
              title={
                compareItem !== undefined
                  ? "Added to compare"
                  : "Add to compare"
              }
              onClick={() => dispatch(addToCompare(product))}
            >
              <i className="pe-7s-shuffle" />
            </button>
          </div>
        </div>
      )}
      {product?.category ? (
        <div className="pro-details-meta">
          <span>Categories :</span>
          <ul>
            {product?.category?.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    {single}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}
      {product?.tag ? (
        <div className="pro-details-meta">
          <span>Tags :</span>
          <ul>
            {product?.tag.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    {single}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}

      <div className="pro-details-social">
        <ul>
          <li>
            <a href="//facebook.com">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a href="//dribbble.com">
              <i className="fa fa-dribbble" />
            </a>
          </li>
          <li>
            <a href="//pinterest.com">
              <i className="fa fa-pinterest-p" />
            </a>
          </li>
          <li>
            <a href="//twitter.com">
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a href="//linkedin.com">
              <i className="fa fa-linkedin" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  cartItems: PropTypes.array,
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.shape({}),
  wishlistItem: PropTypes.shape({})
};

export default ProductDescriptionInfo;
