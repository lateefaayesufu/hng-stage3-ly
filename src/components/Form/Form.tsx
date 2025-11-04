"use client"

import React, { useState, useContext } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import ThankYouModal from "../Modal/ThankYouModal"
import { useMutation } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { CartContext } from "../../context/CartContext"
import { useRouter } from "next/navigation"

interface FormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
  zip: string;
  city: string;
  country: string;
  payment: "eMoney" | "cod";
}

  interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }

    interface OrderData {
      customerName: string;
      customerEmail: string;
      customerPhone: string;
      shippingAddress: string;
      city: string;
      country: string;
      zipCode: string;
      items: OrderItem[];
        subtotal: number;
        shipping: number;
        tax: number;
        grandTotal: number;
      paymentMethod: string;
    }

      const calculateOrderTotals = (items: OrderItem[]) => {
        const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
        const shipping = 50; // Fixed shipping cost
        const tax = Math.round(subtotal * 0.2); // 20% tax
        const grandTotal = subtotal + shipping + tax;
  
        return { subtotal, shipping, tax, grandTotal };
      };

export default function Form() {
  const context = useContext(CartContext)
  if (!context) throw new Error("Form must be used within CartContextProvider")
  
    const { cart } = context
  const createOrderMutation = useMutation(api.orders.createOrder)
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)

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
      try {
        setSubmitting(true)
        console.log("Submitting order...")
          const items = cart.map(item => ({
            productId: item.id.toString(),
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image
          }));
          const totals = calculateOrderTotals(items);

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
        setShowModal(true)
      } catch (error) {
        console.error("Error submitting order:", error)
      } finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white rounded-lg p-6 md:p-8 lg:p-12 w-full lg:w-2/3"
    >
      <h1 className="text-3xl font-bold uppercase mb-8">Checkout</h1>
      {/* rest of the form JSX */}
    </form>
  )
}