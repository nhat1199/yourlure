import CircularProgress from "@material-ui/core/CircularProgress";
import ManagerOrderAPI from "api/manager-order-api";
import ConfirmPopupV2 from "components/confirm-popup/ConfirmPopupV2";
import YLButton from "components/custom-field/YLButton";
import ErrorLoad from "components/error-notify/ErrorLoad";
import Loading from "components/Loading";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { setIsBack } from "redux/back-action/back-action";
import DEFINELINK from "routes/define-link";
import { convertToVND, getShipping } from "utils/format-string";
import { copyToClipboard } from "../../../utils/common";
import "./scss/manager-order-detail.scss";

function ManagerOrderDetail(props) {
  console.log(props);
  const canBack = props.location.canBack;
  const orderId = props.match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();
  const [order, setOrder] = useState({
    data: null,
    isLoading: false,
    isSuccess: true,
  });
  const [loading, setLoading] = useState(false);
  const [cancel, setCancel] = useState(false);

  const { register, handleSubmit, setValue } = useForm();
  const handleSetValueStatus = () => {
    let stt = order?.data?.activities[0];
    if (stt.activityName === options[0].value) {
      return options[1].lable;
    } else if (stt.activityName === options[1].value) {
      return options[4].lable;
    } else {
      let option = options.find((o) => o.value === stt.activityName);
      return option.lable;
    }
  };
  const handleSubmitStatus = async (data) => {
    let option = options.find((o) => o.lable === data);
    setLoading(option.value === "ACCEPT");
    setCancel(option.value === "STAFF_REJECT");
    try {
      const response = await ManagerOrderAPI.changeStatusOrder(
        option.value,
        orderId
      );
      toast.success("Thay đổi trạng thái thành công");
      fetchOrder();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.success(error.response.data);
      console.log("fail to fetch address");
    }
  };

  const options = [
    { value: "PENDING", lable: "Đang chờ xác nhận" },
    { value: "ACCEPT", lable: "Xong" },
    { value: "STAFF_REJECT", lable: "Đã hủy bởi cửa hàng" },
    { value: "CUSTOMER_REJECT", lable: "Đã hủy bởi khách hàng" },
    { value: "DONE", lable: "Đã xác nhận" },
    { value: "DONED", lable: "Đã hoàn tất" },
  ];

  function totalPrice(list) {
    let total = list.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);
    return total;
  }

  const fetchOrder = async () => {
    setOrder((prevState) => {
      return { ...prevState, isLoading: true };
    });
    try {
      const response = await ManagerOrderAPI.getOrderById(orderId);
      setOrder({ data: response, isLoading: false, isSuccess: true });
    } catch (error) {
      setOrder({ data: null, isLoading: false, isSuccess: false });
      console.log("fail to fetch order");
    }
  };

  useEffect(() => {
    fetchOrder();
    let stt = options.find(
      (o) => o.value === order?.data?.activities[0]?.activityName
    );
    setValue("status", stt?.lable);
  }, [orderId]);
  // const location = useLocation();
  // const setBack = {
  //   canBack: true,
  //   path: location,
  //   label: "Chi tiết đơn hàng",
  // };
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
  if (order.isLoading) {
    return <Loading />;
  } else if (!order.isSuccess) {
    return <ErrorLoad />;
  } else
    return (
      <div className="manager-order-detail">
        <div className="d-flex row">
          <div className="col-12 col-lg-9 p-2">
            <div className="bg-box bg-shadow">
              <div className="manager-order-show">
                <span>Sẳn phẩm</span>
                <hr />
                {/* <ManagerSort /> */}
                {order?.data?.items?.length <= 0 && <p>Không có sản phẩm </p>}
                <table className="table">
                  <tbody>
                    <tr className={"primary-color"}>
                      <th>#</th>
                      <th>Tên sản phẩm</th>
                      <th>Tùy biến</th>
                      <th>Biến thể</th>
                      <th>Danh mục</th>
                      <th>Số lượng</th>
                      <th>Trạng thái</th>
                      <th className="text-center">Giá</th>
                      <th className="text-center">Tổng</th>
                      <th className="text-center">Sao chép đường dẫn</th>
                      <th className="text-center">Xem tuỳ biến</th>
                    </tr>
                    {order?.data?.items?.map((item, i) => (
                      <tr
                        className="pointer hover-background align-middle"
                        onClick={() => {
                          history.push({
                            pathname:
                              "/manager/product/detail/" + item.productId,
                          });
                        }}
                        key={"product-" + i}
                      >
                        <td>{i + 1}</td>
                        <td>{item.productName}</td>
                        <td>{item.customModelId ? "Có" : "Không"}</td>
                        <td className="text-center">{item?.variantName}</td>
                        <td>{item.categoryName}</td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-center">
                          {item.visibleInStorefront
                            ? "Đang kinh doanh"
                            : "Ngừng kinh doanh"}
                        </td>
                        <td className="text-end">
                          {!item ? "N/A" : convertToVND(item.price)}
                        </td>
                        <td className="text-end">
                          {!item
                            ? "N/A"
                            : convertToVND(item.price * item.quantity)}
                        </td>
                        <td
                          className="text-center"
                          onClick={(event) => {
                            event.stopPropagation();
                            copyToClipboard(
                              `${
                                window.location.host +
                                DEFINELINK.viewCustomizeOrder
                              }?customizeId=${item.customModelId}`
                            );
                          }}
                        >
                          <i className="fad fa-copy text-success" />
                        </td>
                        <td
                          className="text-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {item.customModelId && (
                            <Link
                              to={`${DEFINELINK.viewCustomizeOrder}?customizeId=${item.customModelId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fad fa-eye text-success" />
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))}
                    {/* <tr>
                      <td className="text-end" colSpan="7">
                        <div className="float-end">
                        <ComfirmPopup
                        btnText="Hủy Đơn"
                        height="30px"
                        title="Hủy đơn"
                        disabled={order?.data?.items?.activities[0]?.activityName!=="PENDING"}
                        content="Bạn chắc chắn hủy đơn hàng?"
                        onConfirm={() => onConfirm()}
                      />
                        </div>
                      </td>
                    </tr> */}
                  </tbody>
                </table>
                <div className="d-flex justify-content-end">
                  {order?.data?.activities[0]?.activityName && (
                    <>
                      {order?.data?.activities[0].activityName ===
                        options[0].value && (
                        <ConfirmPopupV2
                          children={
                            <YLButton
                              variant="warning"
                              type="button"
                              disabled={cancel || loading}
                            >
                              Hủy
                              {cancel && (
                                <CircularProgress
                                  size={15}
                                  className="circle-progress"
                                />
                              )}
                            </YLButton>
                          }
                          title="Bạn có chắc chắn muốn hủy đơn?"
                          onConfirm={() => handleSubmitStatus(options[2].lable)}
                        />
                      )}
                      <div className="ms-2">
                        <YLButton
                          variant={
                            handleSetValueStatus() === options[4].lable ||
                            handleSetValueStatus() === options[2].lable ||
                            handleSetValueStatus() === options[3].lable ||
                            handleSetValueStatus() === options[5].lable
                              ? "warning"
                              : "primary"
                          }
                          type="button"
                          onClick={() =>
                            handleSubmitStatus(handleSetValueStatus())
                          }
                          disabled={
                            handleSetValueStatus() === options[4].lable ||
                            handleSetValueStatus() === options[2].lable ||
                            handleSetValueStatus() === options[3].lable ||
                            handleSetValueStatus() === options[5].lable ||
                            cancel ||
                            loading
                          }
                        >
                          {handleSetValueStatus()}
                          {loading && (
                            <CircularProgress
                              size={15}
                              className="circle-progress"
                            />
                          )}
                        </YLButton>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-3 p-2">
            <div className="bg-box bg-shadow">
              <div className="order-head-row d-flex justify-content-between align-items-end">
                <h6>Khách hàng</h6>
                {order?.data?.userId && (
                  <div className="order-customer">
                    <YLButton
                      variant="link"
                      value="Xem hồ sơ"
                      to={`/manager/user/detail/${order?.data?.userId}`}
                    />
                  </div>
                )}
              </div>
              <div className="manager-customer-show">
                <hr />
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <b>Họ tên: </b>
                        {order?.data?.receiverName
                          ? order.data.receiverName
                          : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Số điện thoại: </b>
                        {order?.data?.phone ? order.data.phone : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Địa chỉ: </b>{" "}
                        {order?.data?.address ? order.data.address : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Chú ý: </b>
                        {order?.data?.note ? order.data.note : "-"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-box bg-shadow mt-5 py-3">
              <table>
                <tbody>
                  <tr>
                    <th>Tổng tiền hàng:</th>
                    <td className="text-end">
                      {order?.data?.items &&
                        convertToVND(totalPrice(order?.data?.items))}
                    </td>
                  </tr>
                  <tr>
                    <th>Được giảm giá:</th>
                    <td className="text-end">
                      {order?.data?.items &&
                        convertToVND(order?.data?.discount)}
                    </td>
                  </tr>
                  <tr>
                    <th>Phí vận chuyển:</th>
                    <td className="text-end">{convertToVND(getShipping())}</td>
                  </tr>
                  <tr>
                    <th>Tổng thanh toán:</th>
                    <td className="text-end">
                      {order?.data?.items &&
                        convertToVND(
                          totalPrice(order?.data?.items) +
                            getShipping() -
                            order?.data?.discount
                        )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ManagerOrderDetail;
