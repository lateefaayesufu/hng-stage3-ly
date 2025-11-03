HNG Stage 3 –  Audiophile E-commerce Website 

This is the React/Next.js implementation of the Audiophile E-commerce project for Frontend Stage 3.  
It focuses on building a full-featured, pixel-perfect e-commerce store with checkout, order management, and email confirmation.

✦ Overview  
The app includes:

- **Landing & Product Pages** – Hero section, featured products, and product listing.
- **Checkout Form** – Collects user details, shipping info, and payment method with validation.
- **Order Management** – Orders stored in Convex backend; unique order IDs for tracking.
- **Email Confirmation** – Sends order confirmation emails via Resend API.
- **Responsive Design** – Mobile, tablet, and desktop layouts match Figma designs.
- **Accessible HTML** – Semantic tags, alt text, focus states, and screen-reader friendly.

✦ Features

**Landing & Product Pages**  
- Hero implemented with SVG and styled components.  
- Product cards with images, prices, and quantity selection.  
- Fully responsive layout for all screen sizes.

**Checkout Form**  
- Fields: Name, Email, Phone, Address, ZIP, City, Country.  
- Payment options: e-Money or Cash on Delivery.  
- Inline validation with error messages.  
- Prevents duplicate or empty submissions.

**Order Management**  
- Stores orders in Convex backend with customer details, items, totals, and payment method.  
- Generates unique order IDs.  
- Redirects to Order Confirmation page after successful submission.

**Email Confirmation**  
- Sends transactional email with order summary, shipping info, and total amount.  
- Uses Resend API for HTML-based responsive emails.

✦ Data Validation & Error Handling

- All checkout fields are required.  
- Email and phone validated for proper format.  
- Inline error messages and alerts on invalid inputs.  
- Handles API/network errors gracefully.  

✦ Accessibility & Layout

- Semantic HTML: `<main>`, `<section>`, `<header>`, `<nav>`, `<form>`, `<label>`.  
- Alt text for all images.  
- Visible focus states for interactive elements.  
- Consistent layout max-width: 1440px.  

✦ Tech Stack

- React / Next.js  
- Convex (backend & database)  
- Resend API (email notifications)  
- Tailwind CSS for styling  
- Framer Motion (animations)  
- Formik & Yup (form handling and validation)  
- Context API (state management)

✦ Demo Credentials (if applicable)

- N/A – no authentication required for checkout.  

✦ Local Setup

```bash
git clone https://github.com/lateefaayesufu/hng-stage3-ly
cd audiophile-ecomm
npm install
npm run dev
