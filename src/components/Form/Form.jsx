"use client"

import React, { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import ThankYouModal from "../Modal/ThankYouModal"

export default function Form() {
  const [showModal, setShowModal] = useState(false)

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const formik = useFormik({
    //Field initial Values
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      zip: "",
      city: "",
      country: "",
      payment: "",
    },

    //Validate form

    validationSchema: Yup.object({
      name: Yup.string().required("Your name is required"),
      email: Yup.string()
        .email("Wront format")
        .required("Your email is required"),
      phone: Yup.string()
        .matches(phoneRegExp, "Wrong format")
        .required("Your phone number is required"),
      address: Yup.string().required("Your address is required"),
      zip: Yup.string()
        .max(5, "Enter a valid zip address")
        .required("Zip code is required"),
      city: Yup.string().required("Your city is required"),
      country: Yup.string().required("Your country is required"),
      payment: Yup.string()
        .required("Select any one of the payment methods")
        .oneOf(["eMoney", "cod"]),
    }),

    // Submit form
    onSubmit: () => {
      setShowModal(true)
      document.body.style.overflow = "hidden"
    },
  })

  const modalShow = () => {
    setShowModal(false)
  }

  return (
    <form id="checkout-form" onSubmit={formik.handleSubmit}>
      {showModal && (
        <ThankYouModal showModal={showModal} modelState={modalShow} />
      )}
      <div className="pb-[53px]">
        <p className="sub-title text-dark-salmon pb-3">Billing Details</p>
        <div className="flex flex-wrap w-full justify-between gap-y-6">
          <div className="w-[309px]">
            <label
              className={`text-xs font-bold block mb-2 flex items-center justify-between ${
                formik.touched.name && formik.errors.name
                  ? "text-red-700"
                  : "text-black"
              }`}
            >
              Name
              <p className="text-xs text-red-700">
                {formik.touched.name && formik.errors.name}
              </p>
            </label>
            <input
              className={`block rounded-md w-full h-[56px] text-black font-bold text-[14px] focus:outline-none focus:border-dark-salmon placeholder:text-[14px] placeholder:font-bold px-[24px] placeholder:text-black/40 ${
                formik.touched.name && formik.errors.name
                  ? "border-red-700 border-2"
                  : "border-grey border"
              }`}
              placeholder="Your Name"
              name="name"
              id="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            ></input>
          </div>
          <div className="w-[309px]">
            <label
              className={`text-xs font-bold block mb-2 flex items-center justify-between ${
                formik.touched.email && formik.errors.email
                  ? "text-red-700"
                  : "text-black"
              }`}
            >
              Email Address
              <p className="text-xs text-red-700">
                {formik.touched.email && formik.errors.email}
              </p>
            </label>
            <input
              className={`block rounded-md w-full h-[56px] text-black font-bold text-[14px] focus:outline-none focus:border-dark-salmon placeholder:text-[14px] placeholder:font-bold px-[24px] placeholder:text-black/40 ${
                formik.touched.email && formik.errors.email
                  ? "border-red-700 border-2"
                  : "border-grey border"
              }`}
              placeholder="Your Email"
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>
          </div>
          <div className="w-[309px]">
            <label
              className={`text-xs font-bold block mb-2 flex items-center justify-between ${
                formik.touched.phone && formik.errors.phone
                  ? "text-red-700"
                  : "text-black"
              }`}
            >
              Phone Number
              <p className="text-xs text-red-700">
                {formik.touched.phone && formik.errors.phone}
              </p>
            </label>
            <input
              className={`block rounded-md w-full h-[56px] text-black font-bold text-[14px] focus:outline-none focus:border-dark-salmon placeholder:text-[14px] placeholder:font-bold px-[24px] placeholder:text-black/40 ${
                formik.touched.phone && formik.errors.phone
                  ? "border-red-700 border-2"
                  : "border-grey border"
              }`}
              placeholder="Your Phone Number"
              id="phone"
              name="phone"
              type="text"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>
          </div>
        </div>
      </div>
      <div className="pb-[53px]">
        <p className="sub-title text-dark-salmon pb-3">Shipping Info</p>
        <div className="flex flex-wrap w-full justify-between gap-y-6">
          <div className="w-full">
            <label
              htmlFor="name"
              className={`text-xs font-bold block mb-2 flex items-center justify-between ${
                formik.touched.address && formik.errors.address
                  ? "text-red-700"
                  : "text-black"
              }`}
            >
              Address
              <p className="text-xs text-red-700">
                {formik.touched.address && formik.errors.address}
              </p>
            </label>
            <input
              className={`block rounded-md w-full h-[56px] text-black font-bold text-[14px] focus:outline-none focus:border-dark-salmon placeholder:text-[14px] placeholder:font-bold px-[24px] placeholder:text-black/40 ${
                formik.touched.address && formik.errors.address
                  ? "border-red-700 border-2"
                  : "border-grey border"
              }`}
              placeholder="1137 Williams Avenue"
              name="address"
              id="address"
              type="text"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>
          </div>
          <div className="w-[309px]">
            <label
              className={`text-xs font-bold block mb-2 flex items-center justify-between ${
                formik.touched.zip && formik.errors.zip
                  ? "text-red-700"
                  : "text-black"
              }`}
            >
              ZIP Code
              <p className="text-xs text-red-700">
                {formik.touched.zip && formik.errors.zip}
              </p>
            </label>
            <input
              className={`block rounded-md w-full h-[56px] text-black font-bold text-[14px] focus:outline-none focus:border-dark-salmon placeholder:text-[14px] placeholder:font-bold px-[24px] placeholder:text-black/40 ${
                formik.touched.zip && formik.errors.zip
                  ? "border-red-700 border-2"
                  : "border-grey border"
              }`}
              placeholder="10001"
              name="zip"
              id="zip"
              type="text"
              value={formik.values.zip}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>
          </div>
          <div className="w-[309px]">
            <label
              className={`text-xs font-bold block mb-2 flex items-center justify-between ${
                formik.touched.city && formik.errors.city
                  ? "text-red-700"
                  : "text-black"
              }`}
            >
              City
              <p className="text-xs text-red-700">
                {formik.touched.city && formik.errors.city}
              </p>
            </label>
            <input
              className={`block rounded-md w-full h-[56px] text-black font-bold text-[14px] focus:outline-none focus:border-dark-salmon placeholder:text-[14px] placeholder:font-bold px-[24px] placeholder:text-black/40 ${
                formik.touched.city && formik.errors.city
                  ? "border-red-700 border-2"
                  : "border-grey border"
              }`}
              placeholder="New York"
              id="city"
              name="city"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
            ></input>
          </div>
          <div className="w-[309px]">
            <label
              className={`text-xs font-bold block mb-2 flex items-center justify-between ${
                formik.touched.country && formik.errors.country
                  ? "text-red-700"
                  : "text-black"
              }`}
            >
              Country
              <p className="text-xs text-red-700">
                {formik.touched.country && formik.errors.country}
              </p>
            </label>
            <input
              className={`block rounded-md w-full h-[56px] text-black font-bold text-[14px] focus:outline-none focus:border-dark-salmon placeholder:text-[14px] placeholder:font-bold px-[24px] placeholder:text-black/40 ${
                formik.touched.country && formik.errors.country
                  ? "border-red-700 border-2"
                  : "border-grey border"
              }`}
              placeholder="United States"
              id="country"
              name="country"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.country}
            ></input>
          </div>
        </div>
      </div>
      <div className="pb-[53px] sm:w-full">
        <p className="sub-title text-dark-salmon pb-3">Payment Details</p>
        <div className="flex w-full h-[128px] mb-5 sm:flex-col">
          <div className="flex-1">
            <p
              className={`text-xs font-bold ${
                formik.touched.payment && formik.errors.payment
                  ? "text-red-700"
                  : "text-black"
              }`}
            >
              Payment Method
            </p>
            <p className="mt-2 text-xs text-red-700">
              {formik.touched.payment && formik.errors.payment}
            </p>
          </div>
          <div className="flex-1">
            <label
              className={`text-xs font-bold block mb-2 block rounded-md border w-full h-[56px] border-grey bg-white flex items-center px-4 gap-x-3 hover:border-dark-salmon ${
                formik.errors.payment &&
                formik.touched.payment &&
                `border-red-700 border-2`
              }`}
            >
              <input
                name="payment"
                id="eMoney"
                value="eMoney"
                type="radio"
                onChange={formik.handleChange}
              />
              e-Money
            </label>
            <label
              className={`text-xs font-bold block mb-2 block rounded-md border w-full h-[56px] border-grey bg-white flex items-center px-4 gap-x-3 hover:border-dark-salmon ${
                formik.errors.payment &&
                formik.touched.payment &&
                `border-red-700 border-2`
              }`}
            >
              <input
                name="payment"
                id="cod"
                type="radio"
                value="cod"
                onChange={formik.handleChange}
              />
              Cash on Delivery
            </label>
          </div>
        </div>
        {formik.values.payment == "eMoney" && (
          <div className="flex flex-wrap sm:pt-8 w-full justify-between gap-y-6">
            <div className="w-[309px]">
              <label className="text-xs font-bold block mb-2">
                e-Money Number
              </label>
              <input
                className="block rounded-md border w-full h-[56px] border-grey text-black font-bold text-[14px] focus:outline-none focus:border-dark-salmon placeholder:text-[14px] placeholder:font-bold px-[24px] placeholder:text-black/40"
                placeholder="238521993"
                name="name"
                id="name"
                type="text"
              ></input>
            </div>
            <div className="w-[309px]">
              <label className="text-xs font-bold block mb-2">
                e-Money PIN
              </label>
              <input
                className="block rounded-md border w-full h-[56px] border-grey text-black font-bold text-[14px] focus:outline-none focus:border-dark-salmon placeholder:text-[14px] placeholder:font-bold px-[24px] placeholder:text-black/40"
                placeholder="6891"
                id="name"
                type="text"
              ></input>
            </div>
          </div>
        )}
        {formik.values.payment == "cod" && (
          <div className="w-[309px] sm:w-[271px] sm:h-[250px] sm:flex-col flex justify-start items-center sm:justify-center sm:items-center gap-x-6 sm:gap-y-6">
            <div className="w-[20%] sm:w-[271px]">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M42.2812 8.4375H46.5938C47.3704 8.4375 48 9.06713 48 9.84375C48 10.6204 47.3704 11.25 46.5938 11.25H45.0938V23.9062C45.0938 24.6829 44.4641 25.3125 43.6875 25.3125H33.8438V40.9688C33.8438 41.7454 33.2141 42.375 32.4375 42.375H25.0773C24.4239 45.5805 21.5831 48 18.1875 48H1.40625C0.629625 48 0 47.3704 0 46.5938C0 45.8171 0.629625 45.1875 1.40625 45.1875H18.1875C20.021 45.1875 21.585 44.012 22.1653 42.375H8.4375C7.66087 42.375 7.03125 41.7454 7.03125 40.9688C7.03125 40.1921 7.66087 39.5625 8.4375 39.5625H12.5625C13.3379 39.5625 13.9688 38.9317 13.9688 38.1562C13.9688 37.3808 13.3379 36.75 12.5625 36.75H9.43444C6.87619 36.75 4.37297 37.6373 2.38575 39.2485C1.78247 39.7376 0.896906 39.6454 0.407719 39.0419C-0.0814688 38.4385 0.0110625 37.553 0.614344 37.0639C2.84203 35.2578 5.58806 34.1792 8.4375 33.9741V18.375C8.4375 17.5984 9.06713 16.9688 9.84375 16.9688H18.375V7.03125C18.375 6.25462 19.0046 5.625 19.7812 5.625H28.1223C31.9334 2.02078 36.9875 0 42.2641 0H46.5938C47.3704 0 48 0.629625 48 1.40625C48 2.18287 47.3704 2.8125 46.5938 2.8125H42.2642C38.805 2.8125 35.4975 3.79453 32.658 5.625H38.0625C38.8326 5.625 39.4688 6.25228 39.4688 7.03125C39.4688 7.52423 39.3372 7.69561 38.4891 8.80021C38.0648 9.3528 37.4613 10.1389 36.6052 11.3157C36.2039 11.8513 36.3433 12.6075 36.8974 12.9688C37.4088 13.3025 38.0923 13.1781 38.4534 12.6856L41.1473 9.01219C41.4121 8.65088 41.8333 8.4375 42.2812 8.4375ZM32.4375 16.9688C32.9273 16.9688 33.3582 17.2195 33.6099 17.5993C35.4415 15.9118 34.2652 12.7969 31.7344 12.7969C29.5943 12.7969 28.2687 15.1348 29.3533 16.9688H32.4375ZM21.1875 8.4375H35.2472C35.0152 8.75898 34.8251 9.00687 34.6644 9.21646C34.3106 9.67792 34.0992 9.95371 33.896 10.4204C29.6796 8.64131 25.1696 12.4771 26.337 16.9688H21.1875V8.4375ZM22.5938 25.4062V19.7812H19.7812V25.4062H22.5938ZM31.0312 39.5625H16.5403C17.5098 36.8283 15.4711 33.9375 12.5625 33.9375H11.25V19.7812H16.9688V26.8125C16.9688 27.5891 17.5984 28.2188 18.375 28.2188H24C24.7766 28.2188 25.4062 27.5891 25.4062 26.8125V19.7812H31.0312V39.5625ZM33.8438 20.7288V22.5H42.2812V12.2217L40.7213 14.3488C39.9301 15.4278 38.6519 16.0371 37.2972 15.9602C37.1467 18.1043 35.7894 19.9393 33.8438 20.7288Z"
                  fill="#D87D4A"
                />
              </svg>
            </div>
            <div className="w-[80%] sm:w-[271px]">
              <p className="w-[554px] sm:w-full text-black/50">
                The ‘Cash on Delivery’ option enables you to pay in cash when
                our delivery courier arrives at your residence. Just make sure
                your address is correct so that your order will not be
                cancelled.
              </p>
            </div>
          </div>
        )}
      </div>
    </form>
  )
}
