"use client"

import React, { useState, useContext } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import ThankYouModal from "../Modal/ThankYouModal"
import orderConfirmationEmail from "@/hooks/orderConfirmationEmail"
import { useMutation } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { CartContext } from "../../context/CartContext"
import { useRouter } from "next/navigation"

interface FormValues {
  name: string
  email: string
  phone: string
  address: string
  zip: string
  city: string
  country: string
  payment: "eMoney" | "cod"
}

interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

interface OrderData {
  customerName: string
  customerEmail: string
  customerPhone: string
  shippingAddress: string
  city: string
  country: string
  zipCode: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  grandTotal: number
  paymentMethod: string
}

const calculateOrderTotals = (items: OrderItem[]) => {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )
  const shipping = 50
  const tax = Math.round(subtotal * 0.2)
  const grandTotal = subtotal + shipping + tax
  return { subtotal, shipping, tax, grandTotal }
}

export default function Form() {
  const context = useContext(CartContext)
  if (!context) throw new Error("Form must be used within CartContextProvider")

  const { cart, clearCart } = context
  const createOrderMutation = useMutation(api.orders.createOrder)
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [orderId, setOrderId] = useState("")

  const handleModalClose = () => {
    setShowModal(false)
    router.push("/")
  }

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/

  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      zip: "",
      city: "",
      country: "",
      payment: "eMoney",
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
      setError(null)
      setSubmitting(true)
      try {
        console.log("Submitting order...")
        const items = cart.map((item) => ({
          productId: item.id.toString(),
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        }))
        const totals = calculateOrderTotals(items)

        const order = await createOrderMutation({
          customerName: values.name,
          customerEmail: values.email,
          customerPhone: values.phone,
          shippingAddress: values.address,
          city: values.city,
          country: values.country,
          zipCode: values.zip,
          paymentMethod: values.payment,
          items,
          ...totals,
        })

        if (order) {
          setOrderId(order)
          setShowModal(true)
          clearCart()

          const emailContent = orderConfirmationEmail({
            orderId: order,
            customer: values,
            items: cart,
            total: totals.grandTotal,
            shipping: totals.shipping,
            tax: totals.tax,
          })

          fetch("/api/send-email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to: values.email,
              subject: emailContent.subject,
              html: emailContent.html,
            }),
          }).catch((emailError) => {
            console.error("Failed to send confirmation email:", emailError)
          })
        }
      } catch (error) {
        console.error("Error submitting order:", error)
        setError("There was an issue submitting your order. Please try again.")
      } finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <>
      <form
        id="checkout-form"
        onSubmit={(e) => {
          e.preventDefault()
          console.log("Form submit clicked")
          formik.handleSubmit()
        }}
        className="bg-white rounded-lg p-6 md:p-8 lg:p-12 w-full lg:w-2/3"
      >
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
                    formik.touched[field.name as keyof FormValues] &&
                    formik.errors[field.name as keyof FormValues]
                      ? "text-red-700"
                      : "text-black"
                  }`}
                >
                  {field.label}
                  <p className="text-xs text-red-700">
                    {formik.touched[field.name as keyof FormValues] &&
                      (formik.errors[field.name as keyof FormValues] as string)}
                  </p>
                </label>
                <input
                  {...field}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[field.name as keyof FormValues] || ""}
                  className={`block rounded-md w-full h-[56px] text-black font-bold text-[14px] px-[24px] placeholder:text-black/40 ${
                    formik.touched[field.name as keyof FormValues] &&
                    formik.errors[field.name as keyof FormValues]
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
              {
                label: "Country",
                name: "country",
                placeholder: "United States",
              },
            ].map((field) => (
              <div
                key={field.name}
                className={field.full ? "w-full" : "w-[309px]"}
              >
                <label
                  className={`text-xs font-bold block mb-2 ${
                    formik.touched[field.name as keyof FormValues] &&
                    formik.errors[field.name as keyof FormValues]
                      ? "text-red-700"
                      : "text-black"
                  }`}
                >
                  {field.label}
                  <p className="text-xs text-red-700">
                    {formik.touched[field.name as keyof FormValues] &&
                      (formik.errors[field.name as keyof FormValues] as string)}
                  </p>
                </label>
                <input
                  name={field.name}
                  type="text"
                  placeholder={field.placeholder}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[field.name as keyof FormValues] || ""}
                  className={`block rounded-md w-full h-[56px] text-black font-bold text-[14px] px-[24px] placeholder:text-black/40 ${
                    formik.touched[field.name as keyof FormValues] &&
                    formik.errors[field.name as keyof FormValues]
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
              {["eMoney", "cod"].map((method) => (
                <label
                  key={method}
                  className="text-xs font-bold block mb-2 rounded-md border w-full h-[56px] border-grey bg-white items-center px-4 gap-x-3 hover:border-dark-salmon"
                >
                  <input
                    name="payment"
                    value={method}
                    type="radio"
                    checked={formik.values.payment === method}
                    onChange={formik.handleChange}
                  />{" "}
                  {method === "eMoney" ? "e-Money" : "Cash on Delivery"}
                </label>
              ))}
            </div>
          </div>
        </div>

        {error && <div className="text-red-700 my-4">{error}</div>}

        <button
          type="submit"
          disabled={submitting}
          className="bg-dark-salmon text-white py-3 px-6 rounded-md font-bold"
        >
          {submitting ? "Processing..." : "Confirm Order"}
        </button>
      </form>

      {/* ✅ Modal always rendered */}
      <ThankYouModal
        showModal={showModal}
        modelState={handleModalClose}
        orderId={orderId}
      />
    </>
  )
}
