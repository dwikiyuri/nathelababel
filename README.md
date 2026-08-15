# NATHE LABEL — Modern E-Commerce

> A modern and responsive e-commerce web application built with **Next.js** and **JavaScript**, designed to deliver a clean shopping experience with a structured, scalable, and maintainable frontend architecture.

---

## Overview

**NATHE LABEL** is a modern e-commerce web application focused on creating a polished online shopping experience while keeping the codebase clean and maintainable.

The project is built with **Next.js** and **JavaScript**, using a component-based architecture that separates layouts, pages, reusable UI components, authentication, and shopping-cart state.

The application is designed to showcase a realistic e-commerce flow, including:

- Product discovery
- Category browsing
- Product details
- Search
- Shopping cart
- Checkout
- Authentication
- Account management
- Wishlist
- Journal / editorial content

This project is also intended as a **portfolio project**, demonstrating modern frontend development practices, responsive UI implementation, state management, routing, and e-commerce user flows.

---

## ✦ Highlights

- Modern and responsive e-commerce interface
- Built with **Next.js**
- Written in **JavaScript**
- Component-driven architecture
- Product and category browsing
- Search functionality
- Product detail pages
- Shopping cart
- Checkout flow
- Authentication and protected pages
- Account management
- Wishlist
- Editorial / Journal section
- Reusable layout and UI components
- Responsive design for desktop, tablet, and mobile
- Scalable project structure for future API integration

---

## Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| **Next.js** | React framework, routing, rendering, and application structure |
| **JavaScript** | Application logic and component development |
| **React** | UI component development |
| **CSS / Tailwind CSS** | Styling and responsive design |
| **React Context** | Global authentication and cart state |

### Application Structure

The project follows a component-based architecture to keep the codebase organized and easy to maintain.

---

## Project Structure

```text
src/
├── app/
│   ├── page.js
│   ├── shop/
│   │   └── page.js
│   ├── product/
│   │   └── [slug]/
│   │       └── page.js
│   ├── search/
│   │   └── page.js
│   ├── journal/
│   │   ├── page.js
│   │   └── [slug]/
│   │       └── page.js
│   ├── about/
│   │   └── page.js
│   ├── login/
│   │   └── page.js
│   ├── register/
│   │   └── page.js
│   ├── cart/
│   │   └── page.js
│   ├── checkout/
│   │   └── page.js
│   ├── account/
│   │   └── page.js
│   └── wishlist/
│       └── page.js
│
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── CartDrawer.jsx
│   │   └── Layout.jsx
│   │
│   ├── product/
│   │   ├── ProductCard.jsx
│   │   ├── ProductGrid.jsx
│   │   ├── ProductGallery.jsx
│   │   └── ProductInfo.jsx
│   │
│   ├── category/
│   │   └── CategoryCard.jsx
│   │
│   ├── cart/
│   │   ├── CartItem.jsx
│   │   └── CartSummary.jsx
│   │
│   └── ui/
│       ├── Button.jsx
│       ├── Modal.jsx
│       ├── Toast.jsx
│       └── ...
│
├── context/
│   ├── AuthContext.jsx
│   └── CartContext.jsx
│
├── lib/
│   ├── api.js
│   ├── constants.js
│   └── utils.js
│
├── hooks/
│   └── ...
│
└── styles/
    └── globals.css
