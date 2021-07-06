import React, { useState } from "react";
import PropTypes from "prop-types";
import ManagerProductAPI from "api/manager-product-api";
import { useEffect } from "react";
import YLButton from "components/custom-field/YLButton";
import { setIsBack } from "redux/back-action/back-action";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import "./scss/manager-product-detail.scss";
import ErrorLoad from "components/error-notify/ErrorLoad";
import Loading from "components/Loading";

ManagerProductDetail.propTypes = {};

function ManagerProductDetail(props) {
  const canBack = props.location.canBack;
  const dispatch = useDispatch();
  const history = useHistory();
  const productId = props.match.params.id;
  const [productDetail, setProductDetail] = useState({
    list: null,
    loading: false,
    success: true,
  });
  const fetchProduct = async () => {
    try {
      const response = await ManagerProductAPI.getProductByID(productId);
      if (response.error) {
        throw new Error(response.error);
      } else {
        setProductDetail({
          list: response,
          loading: false,
          success: true,
        });
      }
    } catch (error) {
      setProductDetail({
        ...productDetail,
        success: false,
      });
      console.log("fail to fetch customer list");
    }
  };
  const location = useLocation();
  const setBack = {
    canBack: true,
    path: location,
    label: "Chi tiết sản phẩm",
  };
  useEffect(() => {
    if (canBack) {
      const action = setIsBack({
        canBack: canBack.canBack,
        path: canBack.path,
        label: canBack.label,
      });
      dispatch(action);
    }
  }, [canBack]);
  useEffect(() => {
    fetchProduct();
  }, [productId]);
  if (productDetail.loading) {
    return <Loading />;
  } else if (!productDetail.success) {
    return <ErrorLoad message={'Id sản phẩm không hợp lệ'}/>;
  } else
  return (
    <div className="bg-white bg-shadow manager-product-detail p-3">
        {console.log(productDetail?.list)}
      <div className="manager-product-edit mb-3 mb-md-5 float-end">
        <YLButton
          variant="warning"
          value="Chính sửa"
          to={{ pathname: "/manager/product/edit/"+productId, canBack: setBack }}
        />
      </div>

      <div className="manager-product-info">
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <td>{productDetail?.list?.productId}</td>
            </tr>
            <tr>
              <th>Tên sản phẩm</th>
              <td>{productDetail?.list?.productName}</td>
              <th>Danh mục</th>
              <td>{productDetail?.list?.categoryId?productDetail?.list?.categoryId:'-'}</td>
            </tr>
            <tr>
              <th>Giá</th>
              <td>
                {!productDetail?.list?.defaultPrice
                  ? "N/A"
                  : Number(productDetail.list.defaultPrice).toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      }
                    )}
              </td>
              <th>Trạng thái</th>
              <td>
                {productDetail?.list?.visibleInStorefront
                  ? productDetail?.list?.visibleInStorefront?'Đang kinh doanh':'Ngừng kinh doanh'
                  : "NaN"}
              </td>
            </tr>
            
            <tr>
              <th>Số móc</th>
              <td>{productDetail?.list?.hookSize}</td>
              <th>Độ dài mặc định</th>
              <td>{productDetail?.list?.defaultWeight} (g)</td>
            </tr>
            <tr>
              <th>Chiều dài</th>
              <td>{productDetail?.list?.length} (cm)</td>
              <th>Nhãn hiệu</th>
              <td>{productDetail?.list?.brand?productDetail?.list?.brand:'-'}</td>
            </tr>
            <tr>
              <th>Lặn sâu</th>
              <td>{productDetail?.list?.deepDiving}</td>
              <th>Chất liệu</th>
              <td>{productDetail?.list?.material}</td>
            </tr>
            <tr>
              <th>Có thể tùy biến</th>
              <td>{productDetail?.list?.customizable?'Có':'Không'}</td>
              <th>Giới hạn độ nặng</th>
              <td>{productDetail?.list?.minWeight} (cm) - {productDetail?.list?.maxWeight} (cm)</td>
            </tr>
            <tr>
              <th>Loại cá</th>
              <td>-</td>
            </tr>
            <tr>
              <th>Hình ảnh</th>
              <td className="product-detail-image">
                {productDetail?.list?.imageCollection.map((images, i) => (
                  <img src={images.linkImage} key={"img" + i}  />
                ))}
              </td>
              <td colSpan="2">
                <caption>Variant</caption>
                <table>
                  <tbody>
                    <tr>
                      <th>Màu</th>
                      <th>Số lượng</th>
                      <th>Giá</th>
                      <th>Hình ảnh</th>
                    </tr>
                    {productDetail?.list?.variantCollection.map(
                      (variant, i) => (
                        <tr key={"variant" + i} className="border-bottom-0">
                          <td>{variant.backgroundColor}</td>
                          <td>{variant.quantity}</td>
                          <td>
                            {variant.newPrice
                              ? variant.newPrice
                              : productDetail.list.defaultPrice}
                          </td>
                          <td><img src={variant.imageUrl} width={50} /> </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <th>Mô tả</th>
              <td colSpan="3">
                <div className={`${productDetail?.list?.description?'detail-description m-2 p-1':''}`}>
                  
                  {productDetail?.list?.description}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManagerProductDetail;
