"use client"

import React, { useState, useContext } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import ThankYouModal from "../Modal/ThankYouModal"
import { useMutation } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { CartContext } from "@/context/CartContext"
import { useRouter } from "next/navigation"

export default function Form() {
  const { cart, clearCart, totalPriceCalc } = useContext(CartContext)
  const createOrderMutation = useMutation(api.orders.createOrder)
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/

  const formik = useFormik({
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
    validationSchema: Yup.object({
      name: Yup.string().required("Your name is required"),
      email: Yup.string()
        .email("Wrong format")
        .required("Your email is required"),
      phone: Yup.string()
        .matches(phoneRegExp, "Wrong format")
        .required("Your phone number is required"),
      address: Yup.string().required("Your address is required"),
      zip: Yup.string().required("Zip code is required"),
      city: Yup.string().required("Your city is required"),
      country: Yup.string().required("Your country is required"),
      payment: Yup.string()
        .required("Select a payment method")
        .oneOf(["eMoney", "cod"]),
    }),
    onSubmit: async (values) => {
      console.log("Submitting order...")

      if (!cart.length) return alert("Cart is empty")
      setSubmitting(true)

      const orderData = {
        customerName: values.name,
        customerEmail: values.email,
        customerPhone: values.phone,
        shippingAddress: values.address,
        city: values.city,
        country: values.country,
        zipCode: values.zip,
        items: cart.map((item) => ({
          productId: String(item.id),
          name: item.name,
          price: Number(item.price),
          quantity: Number(item.quantity),
          image: item.image,
        })),
        subtotal: totalPriceCalc(),
        shipping: 50,
        tax: totalPriceCalc() * 0.1,
        grandTotal: totalPriceCalc() + 50 + totalPriceCalc() * 0.1,
        paymentMethod: values.payment,
      }

      try {
        console.log("Step 1: creating order...")
        const orderId = await createOrderMutation(orderData)
        console.log("Step 2: order created", orderId)

        console.log("Step 3: sending email...")
        await fetch("/api/sendConfirmation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId,
            customer: { name: values.name, email: values.email },
            items: cart,
            total: orderData.grandTotal,
          }),
        })

        console.log("Step 4: clearing cart + showing modal")
        clearCart()
        setShowModal(true)
        document.body.style.overflow = "hidden"
      } catch (err) {
        console.error("Order submission failed:", err)
        alert("Something went wrong. Please try again.")
      } finally {
        setSubmitting(false)
      }
    },
  })

  const modalShow = () => {
    setShowModal(false)
    router.push("/order-confirmation")
  }

  return (
    <form
      id="checkout-form"
      onSubmit={(e) => {
        e.preventDefault() // prevent reload
        formik.handleSubmit()
      }}
    >
      {showModal && (
        <ThankYouModal showModal={showModal} modelState={modalShow} />
      )}

      {/* BILLING DETAILS */}
      <div className="pb-[53px]">
        <p className="sub-title text-dark-salmon pb-3">Billing Details</p>
        <div className="flex flex-wrap w-full justify-between gap-y-6">
          {[
            {
              label: "Name",
              name: "name",
              type: "text",
              placeholder: "Your Name",
            },
            {
              label: "Email Address",
              name: "email",
              type: "email",
              placeholder: "Your Email",
            },
            {
              label: "Phone Number",
              name: "phone",
              type: "text",
              placeholder: "Your Phone Number",
            },
          ].map((field) => (
            <div key={field.name} className="w-[309px]">
              <label
                className={`text-xs font-bold block mb-2 ${
                  formik.touched[field.name] && formik.errors[field.name]
                    ? "text-red-700"
                    : "text-black"
                }`}
              >
                {field.label}
                <p className="text-xs text-red-700">
                  {formik.touched[field.name] && formik.errors[field.name]}
                </p>
              </label>
              <input
                {...field}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[field.name]}
                className={`block rounded-md w-full h-[56px] text-black font-bold text-[14px] px-[24px] placeholder:text-black/40 ${
                  formik.touched[field.name] && formik.errors[field.name]
                    ? "border-red-700 border-2"
                    : "border-grey border"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* SHIPPING INFO */}
      <div className="pb-[53px]">
        <p className="sub-title text-dark-salmon pb-3">Shipping Info</p>
        <div className="flex flex-wrap w-full justify-between gap-y-6">
          {[
            {
              label: "Address",
              name: "address",
              placeholder: "1137 Williams Avenue",
              full: true,
            },
            { label: "ZIP Code", name: "zip", placeholder: "10001" },
            { label: "City", name: "city", placeholder: "New York" },
            { label: "Country", name: "country", placeholder: "United States" },
          ].map((field) => (
            <div
              key={field.name}
              className={field.full ? "w-full" : "w-[309px]"}
            >
              <label
                className={`text-xs font-bold block mb-2 ${
                  formik.touched[field.name] && formik.errors[field.name]
                    ? "text-red-700"
                    : "text-black"
                }`}
              >
                {field.label}
                <p className="text-xs text-red-700">
                  {formik.touched[field.name] && formik.errors[field.name]}
                </p>
              </label>
              <input
                name={field.name}
                type="text"
                placeholder={field.placeholder}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[field.name]}
                className={`block rounded-md w-full h-[56px] text-black font-bold text-[14px] px-[24px] placeholder:text-black/40 ${
                  formik.touched[field.name] && formik.errors[field.name]
                    ? "border-red-700 border-2"
                    : "border-grey border"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* PAYMENT */}
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
            <label className="text-xs font-bold block mb-2 rounded-md border w-full h-[56px] border-grey bg-white items-center px-4 gap-x-3 hover:border-dark-salmon">
              <input
                name="payment"
                value="eMoney"
                type="radio"
                onChange={formik.handleChange}
              />{" "}
              e-Money
            </label>
            <label className="text-xs font-bold block mb-2 rounded-md border w-full h-[56px] border-grey bg-white items-center px-4 gap-x-3 hover:border-dark-salmon">
              <input
                name="payment"
                value="cod"
                type="radio"
                onChange={formik.handleChange}
              />{" "}
              Cash on Delivery
            </label>
          </div>
        </div>

        {formik.values.payment === "eMoney" && (
          <div className="flex flex-wrap sm:pt-8 w-full justify-between gap-y-6">
            <div className="w-[309px]">
              <label className="text-xs font-bold block mb-2">
                e-Money Number
              </label>
              <input
                className="block rounded-md border w-full h-[56px] border-grey text-black font-bold text-[14px] px-[24px]"
                placeholder="238521993"
                type="text"
              />
            </div>
            <div className="w-[309px]">
              <label className="text-xs font-bold block mb-2">
                e-Money PIN
              </label>
              <input
                className="block rounded-md border w-full h-[56px] border-grey text-black font-bold text-[14px] px-[24px]"
                placeholder="6891"
                type="text"
              />
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-dark-salmon text-white py-3 px-6 rounded-md font-bold"
      >
        {submitting ? "Processing..." : "Confirm Order"}
      </button>
    </form>
  )
}
