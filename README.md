# NUTHE LABEL – Project Documentation

## Overview
This project is a modern React single‑page e‑commerce web application built with **Vite** + **React Router**.  It follows a clear component hierarchy:

- **`src/App.jsx`** – central router and entry point.
- **Layout** (`src/components/layout/Layout.jsx`) – shared UI (announcement bar, navbar, footer, cart drawer, toast).
- **`src/context/*`** – context providers for authentication and cart state.
- **Pages** (`src/pages/*.jsx`) – one component per route.
- **Protected routes** (`src/components/layout/ProtectedRoute.jsx`).

The **README** below explains the navigation flow, maps each URL to its source file, and tells you exactly which file to edit when you want to change a page or a core behaviour.

---

## Directory Structure (relevant parts)
```
.
├─ public/                # static assets, index.html
├─ src/                  
│   ├─ App.jsx                # router & providers
│   ├─ index.css              # global styles
│   ├─ main.jsx               # React entry point
│   ├─ components/
│   │   └─ layout/
│   │       ├─ Layout.jsx          # page wrapper
│   │       ├─ ProtectedRoute.jsx   # auth guard
│   │       ├─ Navbar.jsx           # top navigation
│   │       ├─ Footer.jsx           # footer
│   │       └─ ...
│   ├─ context/
│   │   ├─ AuthContext.jsx   # authentication state
│   │   └─ CartContext.jsx   # shopping‑cart state
│   ├─ pages/
│   │   ├─ Home.jsx          # `/`
│   │   ├─ Shop.jsx          # `/shop` & `/shop/:category`
│   │   ├─ ProductDetail.jsx # `/product/:slug`
│   │   ├─ Search.jsx        # `/search`
│   │   ├─ Journal.jsx
│   │   ├─ JournalDetail.jsx
│   │   ├─ About.jsx
│   │   ├─ Cart.jsx          # protected `/cart`
│   │   ├─ Checkout.jsx      # protected `/checkout`
│   │   ├─ Account.jsx       # protected `/account`
│   │   ├─ Wishlist.jsx      # protected `/wishlist`
│   │   ├─ Login.jsx         # `/login`
│   │   ├─ Register.jsx      # `/register`
│   │   └─ NotFound.jsx      # catch‑all `*`
│   └─ utils/ …
└─ README.md
```
---

## Page Flow (Routing)
The routing configuration lives in **`src/App.jsx`**.  Below is a visual flow of the main navigation paths.

```mermaid
flowchart TD
    A[Home (/)] --> B[Shop (/shop)] --> C[Product Detail (/product/:slug)]
    A --> D[Search (/search)]
    A --> E[Journal (/journal)] --> F[Journal Detail (/journal/:slug)]
    A --> G[About (/about)]
    A --> H[Login (/login)]
    H --> I[Register (/register)]
    A --> J[Cart (/cart) (protected)]
    J --> K[Checkout (/checkout) (protected)]
    A --> L[Account (/account) (protected)]
    A --> M[Wishlist (/wishlist) (protected)]
    A --> N[NotFound (*])
```
---

## Where to Modify What
| Feature / Page | URL Pattern | Source File | Typical Edit Location |
|----------------|-------------|-------------|----------------------|
| **Home** | `/` | `src/pages/Home.jsx` | Change the JSX markup, hero section, featured products, etc. |
| **Shop** | `/shop` & `/shop/:category` | `src/pages/Shop.jsx` | Adjust product grid, category filters, API calls. |
| **Product Detail** | `/product/:slug` | `src/pages/ProductDetail.jsx` | Edit product image carousel, description, add‑to‑cart logic. |
| **Search** | `/search` | `src/pages/Search.jsx` | Modify search bar styling or search‑result rendering. |
| **Journal** | `/journal` | `src/pages/Journal.jsx` | Update list layout, pagination. |
| **Journal Detail** | `/journal/:slug` | `src/pages/JournalDetail.jsx` | Change article layout, comments section. |
| **About** | `/about` | `src/pages/About.jsx` | Edit static content, team cards, etc. |
| **Login** | `/login` | `src/pages/Login.jsx` | Adjust form fields, validation, styling. |
| **Register** | `/register` | `src/pages/Register.jsx` | Same as login – form UI. |
| **Cart** (protected) | `/cart` | `src/pages/Cart.jsx` | Modify cart table, quantity controls. |
| **Checkout** (protected) | `/checkout` | `src/pages/Checkout.jsx` | Update checkout flow, payment UI. |
| **Account** (protected) | `/account` | `src/pages/Account.jsx` | User profile edit, order history. |
| **Wishlist** (protected) | `/wishlist` | `src/pages/Wishlist.jsx` | Change wishlist layout, remove‑item logic. |
| **Not Found** | `*` | `src/pages/NotFound.jsx` | Custom 404 page design. |

### Core App / Global Changes
| Concern | File | What to Edit |
|---------|------|--------------|
| **Routing table** | `src/App.jsx` | Add/remove routes, change path strings, wrap new pages in `<ProtectedRoute>` if needed. |
| **Layout (header/footer, drawer, toast)** | `src/components/layout/Layout.jsx` | Rearrange components, add new global UI elements. |
| **Auth guard** | `src/components/layout/ProtectedRoute.jsx` | Change redirection logic, add role‑based checks. |
| **Auth state** | `src/context/AuthContext.jsx` | Adjust login handling, token storage, `isAuthenticated` flag. |
| **Cart state** | `src/context/CartContext.jsx` | Modify cart actions, persistence, totals calculation. |
| **Global styles** | `src/index.css` | Update Tailwind‑like utilities, theme colours, dark mode variables. |
| **Entry point** | `src/main.jsx` | Usually no change; only needed when switching to a different root element. |

---

## How to Add a New Page
1. **Create a component** in `src/pages/YourNewPage.jsx`.
2. **Export** it with a named export (e.g., `export const YourNewPage = () => { … }`).
3. **Add a route** in `src/App.jsx` inside the `<Routes>` block:
   ```jsx
   <Route path="/your‑path" element={<YourNewPage />} />
   ```
4. If the page must be protected, wrap the element with `<ProtectedRoute>`:
   ```jsx
   <Route path="/secure" element={<ProtectedRoute><YourNewPage /></ProtectedRoute>} />
   ```
5. **Style** the page using `src/index.css` or component‑scoped CSS modules.
---

## Quick Reference for Common Replacements
- **Change the logo** → edit the `<Navbar>` component (usually `src/components/layout/Navbar.jsx`).
- **Update the primary colour** → modify the CSS variable in `src/index.css` (e.g., `--primary: #ff6600;`).
- **Switch authentication method** → edit `src/context/AuthContext.jsx` where the token is stored and `isAuthenticated` is derived.
- **Add a new global toast** → use the `Toast` component imported from `src/components/ui/Toast.jsx` and trigger it via the toast context (if existent).
---

## Development Commands
```bash
# Install dependencies (run once)
npm install

# Start development server
npm run dev   # Vite dev server on http://localhost:5173

# Build for production
npm run build
```
---

## License & Credits
*This project uses open‑source libraries such as React, React‑Router, and Vite.*

---

*End of README*
