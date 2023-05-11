import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

function ProductGridSingle({title,thumbnailUrl,price,price_symble,id}) {
    function checkCurrency(price_symble){
        if(price_symble == 'usd'){
            return '$';
        }
        if(price_symble == 'eur'){
            return '€';
        }
    }
  return (
    <Fragment>
      <div className="col-xl-3 col-md-6 col-lg-4 col-sm-6">
        <div className="product-wrap mb-25">
          <div className="product-img">
            <Link to={process.env.PUBLIC_URL + "/product/" +id}>
              <img
                className="default-img"
                src={thumbnailUrl}
                alt=""
              />
              <img
                className="hover-img"
                src={thumbnailUrl}
                alt=""
              />
            </Link>
            <div className="product-img-badges">
              <span className="purple">New</span>
            </div>
            <div className="product-action">
              <div className="pro-same-action pro-wishlist">
                <button className="" title="Add to wishlist">
                  <i className="pe-7s-like"></i>
                </button>
              </div>
              <div className="pro-same-action pro-cart">
              <Link to={process.env.PUBLIC_URL + "/product/" +id}>Select Option</Link>
              </div>
              <div className="pro-same-action pro-quickview">
                <button title="Quick View">
                  <i className="pe-7s-look"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="product-content text-center">
            <h3>
              <a href="/product/6">{title}</a>
            </h3>
            <div className="product-rating">
              <i className="fa fa-star-o yellow"></i>
              <i className="fa fa-star-o yellow"></i>
              <i className="fa fa-star-o yellow"></i>
              <i className="fa fa-star-o yellow"></i>
              <i className="fa fa-star-o yellow"></i>
            </div>
            <div className="product-price">
              <span>
                {checkCurrency(price_symble)}
                {price} 
            </span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ProductGridSingle;
