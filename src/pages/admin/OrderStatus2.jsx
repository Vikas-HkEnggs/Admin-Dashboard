// import OrderDetails from "@/components/Elements/Tracking Elements/OrderDetails";
import { Minus, Plus, X } from "lucide-react";
import React from "react";

const OrderStatus = () => {
  return (
    <div className="bg-white mx-auto max-w-7xl pb-4">
      <section className="py-10 ">
        <div className="w-full max-w-6xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className="w-full flex-col justify-start items-center gap-10 inline-flex">
            <div className="w-full flex-col justify-start items-center gap-4 flex">
              <h2 className="w-full text-center text-black text-3xl font-bold font-manrope leading-normal">
                Order Tracking
              </h2>
              {/* <p className="max-w-4xl text-center text-gray-500 text-base font-normal leading-relaxed">
                Order tracking is a service provided by companies.
              </p> */}
            </div>
            <div className="w-full flex-col justify-start items-start gap-10 flex">
              <div className="w-full justify-between items-center flex sm:flex-row flex-col gap-3">
                <h3 className="text-gray-900 text-2xl font-semibold font-manrope leading-9">
                  Order Details
                </h3>
                <button className="sm:w-fit w-full px-5 py-2.5 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
                  <span className="px-2 py-px text-center text-white text-base font-semibold leading-relaxed">
                    Download Invoice
                  </span>
                </button>
              </div>
              <div className="w-full py-6 border-t border-b border-gray-100 md:justify-between justify-center md:items-start items-center md:gap-8 gap-10 flex flex-wrap">
                <div className="flex-col justify-start items-start gap-3 inline-flex">
                  <h6 className="text-gray-500 text-base font-normal leading-relaxed">
                    Order Number
                  </h6>
                  <h4 className="text-black text-xl font-semibold leading-8">
                    #2315482546
                  </h4>
                </div>
                <div className="flex-col justify-start items-start gap-3 inline-flex">
                  <h6 className="text-gray-500 text-base font-normal leading-relaxed">
                    Order Placed
                  </h6>
                  <h4 className="text-black text-xl font-semibold leading-8">
                    Feb 20, 2024
                  </h4>
                </div>
                <div className="flex-col justify-start items-start gap-3 inline-flex">
                  <h6 className="text-gray-500 text-base font-normal leading-relaxed">
                    Order Delivared
                  </h6>
                  <h4 className="text-black text-xl font-semibold leading-8">
                    Feb 20, 2024
                  </h4>
                </div>
                <div className="flex-col justify-start items-start gap-3 inline-flex">
                  <h6 className="text-gray-500 text-base font-normal leading-relaxed">
                    No of Items
                  </h6>
                  <h4 className="text-black text-xl font-semibold leading-8">
                    2 items
                  </h4>
                </div>
                <div className="flex-col justify-start items-start gap-3 inline-flex">
                  <h6 className="text-gray-500 text-base font-normal leading-relaxed">
                    Status
                  </h6>
                  <h4 className="text-black text-xl font-semibold leading-8">
                    Delivered
                  </h4>
                </div>
              </div>
            </div>
            <div className="w-full flex-col justify-start items-start gap-10 flex">
              <div className="w-full justify-between items-start flex sm:flex-row flex-col gap-3">
                <h3 className="text-gray-900 text-2xl font-semibold font-manrope leading-9">
                  Order Tracking
                </h3>
                <h3 className="text-right text-gray-600 text-2xl font-semibold font-manrope leading-9">
                  Order ID: #1025400025
                </h3>
              </div>
              <div className="w-full py-9 rounded-xl border border-gray-200 flex-col justify-start items-start flex">
                <div className="w-full flex-col justify-center sm:items-center items-start gap-8 flex">
                  <ol className="flex sm:items-center items-start w-full sm:gap-0 gap-5">
                    <li className="flex w-full relative justify-center text-indigo-600 text-base font-semibold after:content-['']  after:w-full after:h-0.5 after:bg-indigo-600 after:inline-block after:absolute lg:after:top-4 after:top-3 xl:after:left-40 lg:after:left-36 md:after:left-28 sm:after:left-20 after:left-16">
                      <div className=" sm:whitespace-nowrap z-10 flex flex-col items-center text-center">
                        <span className="w-6 h-6 bg-indigo-600 text-center border-2 border-transparent rounded-full flex justify-center items-center mx-auto mb-1 text-base font-bold text-white lg:w-8 lg:h-8">
                          1
                        </span>{" "}
                        Order Placed
                        <span className="text-indigo-600 text-base font-normal text-center">
                          Feb 20th, 2024
                        </span>
                      </div>
                    </li>
                    <li className="flex w-full relative justify-center text-indigo-600 text-base font-semibold after:content-['']  after:w-full after:h-0.5 after:bg-indigo-600 after:inline-block after:absolute lg:after:top-4 after:top-3 xl:after:left-40 lg:after:left-36 md:after:left-28 sm:after:left-20 after:left-16">
                      <div className=" sm:whitespace-nowrap z-10 flex flex-col items-center text-center">
                        <span className="w-6 h-6 bg-indigo-600 rounded-full flex justify-center items-center mx-auto mb-1 text-white text-base font-bold lg:w-8 lg:h-8">
                          2
                        </span>{" "}
                        Order Packed
                        <span className="text-indigo-600 text-base font-normal text-center">
                          Feb 20th, 2024
                        </span>
                      </div>
                    </li>
                    <li className="flex w-full relative justify-center text-indigo-600 text-base font-semibold after:content-['']  after:w-full after:h-0.5 after:bg-gray-300 after:inline-block after:absolute lg:after:top-4 after:top-3 xl:after:left-40 lg:after:left-36 md:after:left-28 sm:after:left-20 after:left-16">
                      <div className=" sm:whitespace-nowrap z-10 flex flex-col items-center text-center">
                        <span className="w-6 h-6 bg-indigo-600 rounded-full flex justify-center items-center mx-auto mb-1 text-white text-base font-bold lg:w-8 lg:h-8">
                          3
                        </span>{" "}
                        In Translt
                        <span className="text-indigo-600 text-base font-normal text-center">
                          Feb 20th, 2024
                        </span>
                      </div>
                    </li>
                    <li className="flex w-full relative justify-center text-gray-500 text-base font-semibold">
                      <div className=" sm:whitespace-nowrap z-10 flex flex-col items-center text-center">
                        <span className="w-6 h-6 text-indigo-600 mr-4 border-2 bg-transparent border-indigo-600 rounded-full flex justify-center items-center mx-auto mb-1 text-sm lg:w-8 lg:h-8">
                          4
                        </span>
                        Out for Delivery
                        <span className="text-gray-500 text-base font-normal text-center">
                          Feb 20th, 2024
                        </span>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            <div className="w-full flex-col justify-start items-start gap-10 flex">
              <h3 className="text-gray-900 text-2xl font-semibold font-manrope leading-9">
                Items from the order
              </h3>
              <div className="w-full justify-center items-start ">
                <div className="w-full hidden md:grid grid-cols-2 p-4 bg-gray-50">
                  <span className="text-gray-500 text-base font-normal leading-relaxed">
                    Product
                  </span>
                  <p className="flex items-center justify-between">
                    {/* <span className="w-full max-w-[200px] text-center px-8 text-gray-500 text-base font-normal leading-relaxed ">
                      Size
                    </span> */}
                    <span className="w-full max-w-[200px] text-center px-8 text-gray-500 text-base font-normal leading-relaxed ">
                      Quantity
                    </span>
                    <span className="w-full max-w-[120px] text-center px-8 text-gray-500 text-base font-normal leading-relaxed ">
                      Price
                    </span>
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 min-[550px]:gap-6 py-3 border-b border-gray-200 max-sm:max-w-xl max-xl:mx-auto">
                  <div className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-4 w-full max-sm:justify-center max-sm:max-w-xl max-xl:mx-auto">
                    <div className="w-[120px] h-[120px] img-box bg-gray-50 rounded-xl justify-center items-center inline-flex">
                      {/* <img src="https://pagedone.io/asset/uploads/1713334568.png" alt="Denim Shirt image" className="xl:w-[75px] object-cover"> */}
                    </div>
                    <div className="pro-data w-full max-w-sm flex-col justify-start items-start gap-2 inline-flex">
                      <h4 className="w-full text-black text-lg font-medium leading-8 max-[550px]:text-center">
                        Pellet Machine
                      </h4>
                      <h5 className="w-full text-gray-500 text-base font-normal leading-relaxed min-[550px]:my-0 my-2 max-[550px]:text-center">
                        Product ID: 4553458120
                      </h5>
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-between flex-col min-[550px]:flex-row w-full max-sm:max-w-xl max-xl:mx-auto gap-2">
                    <button className="max-w-[160px] flex items-center w-full mx-0 justify-center gap-5">
                      <h5 className="w-12 h-12 focus:outline-none text-gray-900 placeholder-gray-900 text-lg font-medium leading-relaxed px-2.5 bg-white rounded-full border border-gray-200 justify-center items-center flex">
                        02
                      </h5>
                    </button>
                    <h5 className="max-w-[142px] w-full text-center text-black text-lg font-medium leading-relaxed pl-5">
                      $00.00
                    </h5>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 min-[550px]:gap-6 py-3 border-b border-gray-200 max-sm:max-w-xl max-xl:mx-auto">
                  <div className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-4 w-full max-sm:justify-center max-sm:max-w-xl max-xl:mx-auto">
                    <div className="w-[120px] h-[120px] img-box bg-gray-50 rounded-xl justify-center items-center inline-flex">
                      {/* <img
                        src="https://pagedone.io/asset/uploads/1713334581.png"
                        alt="Blue T-shirt for Men image"
                        className="xl:w-[75px] object-cover"
                      /> */}
                    </div>
                    <div className="pro-data w-full max-w-sm flex-col justify-start items-start gap-2 inline-flex">
                      <h4 className="w-full text-black text-lg font-medium leading-8 max-[550px]:text-center">
                        Diaplate
                      </h4>
                      <h5 className="w-full text-gray-500 text-base font-normal leading-relaxed min-[550px]:my-0 my-2 max-[550px]:text-center">
                        Product ID: 8953458747
                      </h5>
                    </div>
                  </div>
                  <div className="flex items-center justify-between flex-col min-[550px]:flex-row w-full max-sm:max-w-xl max-xl:mx-auto gap-2">
                    <button className="max-w-[160px] flex items-center w-full mx-0 justify-center gap-5">
                      <h5 className="w-12 h-12 focus:outline-none text-gray-900  text-lg font-medium leading-relaxed px-2.5 bg-white rounded-full border border-gray-200 justify-center items-center flex">
                        02
                      </h5>
                    </button>
                    <h5 className="max-w-[142px] w-full text-center text-black text-lg font-medium leading-relaxed pl-5">
                      $00.00
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full justify-start items-start gap-8 grid sm:grid-cols-2 grid-cols-1">
              <div className="w-full p-6 rounded-xl border border-gray-200 flex-col justify-start items-start gap-4 inline-flex">
                <div className="w-full justify-between items-start gap-2.5 inline-flex">
                  <h4 className="text-gray-600 text-xl font-medium leading-8">
                    Discount
                  </h4>
                  <h4 className="text-right text-black text-xl font-medium leading-8">
                    $0.00
                  </h4>
                </div>
                <div className="w-full justify-between items-start gap-2.5 inline-flex">
                  <h4 className="text-gray-600 text-xl font-medium leading-8">
                    Delivery
                  </h4>
                  <h4 className="text-right text-black text-xl font-medium leading-8">
                    $0.00
                  </h4>
                </div>
              </div>
              <div className="w-full p-6 rounded-xl border border-gray-200 flex-col justify-start items-start gap-4 inline-flex">
                <div className="w-full justify-between items-start gap-2.5 inline-flex">
                  <h4 className="text-gray-600 text-xl font-medium leading-8">
                    Subtotal
                  </h4>
                  <h4 className="text-right text-black text-xl font-medium leading-8">
                    $0.00
                  </h4>
                </div>
                <div className="w-full justify-between items-start gap-2.5 inline-flex">
                  <h4 className="text-gray-600 text-xl font-medium leading-8">
                    Total
                  </h4>
                  <h4 className="text-right text-black text-xl font-medium leading-8">
                    $0.00
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderStatus;
