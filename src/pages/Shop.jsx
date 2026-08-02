import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";

import { ProductGrid } from "../components/product/ProductGrid";
import { Breadcrumb } from "../components/ui/Breadcrumb";
import { products } from "../data/products";
import { categories } from "../data/categories";

export const Shop = () => {
  const { category: categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  /* =========================================================
     URL PARAMS
  ========================================================= */

  const currentCategory = categorySlug || searchParams.get("category") || "all";

  const currentCollection = searchParams.get("collection") || "all";

  const initialSort = searchParams.get("sort") || "newest";

  const initialPage = Number(searchParams.get("page")) || 1;

  /* =========================================================
     STATE
  ========================================================= */

  const [selectedCategory, setSelectedCategory] = useState(currentCategory);

  const [selectedColor, setSelectedColor] = useState("all");

  const [selectedSize, setSelectedSize] = useState("all");

  const [sortOption, setSortOption] = useState(initialSort);

  const [currentPage, setCurrentPage] = useState(initialPage);

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  /* =========================================================
     PRODUCTS PER PAGE
     
     Ubah angka ini jika ingin:
     8  = 8 produk / halaman
     12 = 12 produk / halaman
     16 = 16 produk / halaman
  ========================================================= */

  const PRODUCTS_PER_PAGE = 8;

  /* =========================================================
     UPDATE STATE WHEN URL / CATEGORY CHANGES
  ========================================================= */

  useEffect(() => {
    setSelectedCategory(currentCategory);
  }, [currentCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedCategory,
    selectedColor,
    selectedSize,
    sortOption,
    currentCollection,
  ]);

  /* =========================================================
     COLOR OPTIONS
  ========================================================= */

  const colorOptions = useMemo(() => {
    const colorSet = new Set();

    products.forEach((product) => {
      product.colors?.forEach((color) => {
        if (color.name) {
          colorSet.add(color.name);
        }
      });
    });

    return Array.from(colorSet).sort();
  }, []);

  /* =========================================================
     SIZE OPTIONS
  ========================================================= */

  const sizeOptions = [
    "S",
    "M",
    "L",
    "XL",
    "115x115 cm",
    "110x110 cm",
    "180x75 cm",
    "One Size",
  ];

  /* =========================================================
     FILTER + SORT
  ========================================================= */

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      /* -------------------------
         CATEGORY
      ------------------------- */

      if (
        selectedCategory !== "all" &&
        product.categorySlug !== selectedCategory
      ) {
        return false;
      }

      /* -------------------------
         COLLECTION
      ------------------------- */

      if (
        currentCollection === "new-arrivals" &&
        !product.tags?.includes("New Arrival")
      ) {
        return false;
      }

      if (
        currentCollection === "rayon" &&
        !product.tags?.includes("Rayon Collection")
      ) {
        return false;
      }

      if (
        currentCollection === "eid" &&
        !product.tags?.includes("Ramadan Collection")
      ) {
        return false;
      }

      if (
        currentCollection === "everyday" &&
        !product.tags?.includes("Everyday")
      ) {
        return false;
      }

      /* -------------------------
         COLOR
      ------------------------- */

      if (
        selectedColor !== "all" &&
        !product.colors?.some((color) => color.name === selectedColor)
      ) {
        return false;
      }

      /* -------------------------
         SIZE
      ------------------------- */

      if (selectedSize !== "all" && !product.sizes?.includes(selectedSize)) {
        return false;
      }

      return true;
    });

    /* =====================================================
       SORTING
    ===================================================== */

    return result.sort((a, b) => {
      /* Price Low → High */
      if (sortOption === "price-low") {
        return a.price - b.price;
      }

      /* Price High → Low */
      if (sortOption === "price-high") {
        return b.price - a.price;
      }

      /* Best Selling */
      if (sortOption === "best-selling") {
        return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      }

      /* Rating */
      if (sortOption === "rating") {
        return (b.rating || 0) - (a.rating || 0);
      }

      /* Newest */
      if (sortOption === "newest") {
        return b.id.localeCompare(a.id);
      }

      return 0;
    });
  }, [
    selectedCategory,
    currentCollection,
    selectedColor,
    selectedSize,
    sortOption,
  ]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalProducts = filteredProducts.length;

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  /*
   * Pastikan currentPage tidak melebihi jumlah halaman.
   */

  const safeCurrentPage = Math.min(
    Math.max(currentPage, 1),
    Math.max(totalPages, 1),
  );

  const startIndex = (safeCurrentPage - 1) * PRODUCTS_PER_PAGE;

  const endIndex = startIndex + PRODUCTS_PER_PAGE;

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  /* =========================================================
     CATEGORY OBJECT
  ========================================================= */

  const activeCategoryObj = categories.find(
    (category) => category.slug === selectedCategory,
  );

  /* =========================================================
     UPDATE URL
  ========================================================= */

  const updateUrl = ({
    category = selectedCategory,
    sort = sortOption,
    page = 1,
  } = {}) => {
    const params = new URLSearchParams();

    if (category && category !== "all") {
      params.set("category", category);
    }

    if (currentCollection && currentCollection !== "all") {
      params.set("collection", currentCollection);
    }

    if (sort && sort !== "newest") {
      params.set("sort", sort);
    }

    if (page > 1) {
      params.set("page", page);
    }

    setSearchParams(params);
  };

  /* =========================================================
     CATEGORY HANDLER
  ========================================================= */

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);

    updateUrl({
      category,
      page: 1,
    });

    setIsMobileFilterOpen(false);
  };

  /* =========================================================
     SORT HANDLER
  ========================================================= */

  const handleSortChange = (sort) => {
    setSortOption(sort);
    setCurrentPage(1);

    updateUrl({
      sort,
      page: 1,
    });
  };

  /* =========================================================
     PAGINATION HANDLER
  ========================================================= */

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);

    updateUrl({
      page,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     RESET FILTER
  ========================================================= */

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedColor("all");
    setSelectedSize("all");
    setSortOption("newest");
    setCurrentPage(1);

    setSearchParams({});
  };

  /* =========================================================
     PAGINATION BUTTONS
  ========================================================= */

  const paginationPages = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* =====================================================
          BREADCRUMB
      ===================================================== */}

      <Breadcrumb
        items={[
          {
            label: "Shop",
            href: "/shop",
          },

          ...(selectedCategory !== "all"
            ? [
                {
                  label: activeCategoryObj
                    ? activeCategoryObj.name
                    : selectedCategory,
                },
              ]
            : []),
        ]}
      />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="border-b border-[#E9E2E3] pb-6 space-y-2">
        <span className="text-xs uppercase tracking-mega text-[#807779]">
          {currentCollection !== "all"
            ? `Collection / ${currentCollection}`
            : "nuthelabel Shop"}
        </span>

        <h1 className="text-3xl sm:text-5xl font-serif text-[#181516]">
          {activeCategoryObj ? activeCategoryObj.name : "All Products"}
        </h1>

        <p className="text-xs sm:text-sm text-[#807779] font-light max-w-2xl">
          {activeCategoryObj?.description ||
            "Explore our full assortment of modest dresses, abaya, hijab, scarves, and everyday essentials."}
        </p>
      </div>

      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <div className="flex items-center justify-between gap-4 py-2 border-b border-[#E9E2E3] text-xs">
        {/* Mobile Filter */}

        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex lg:hidden items-center gap-2 font-medium uppercase tracking-widest text-[#181516] border border-[#181516] px-3.5 py-2 rounded-sm"
        >
          <SlidersHorizontal className="w-4 h-4" />

          <span>Filter & Refine</span>
        </button>

        {/* Product Count */}

        <span className="hidden lg:block text-[#807779] uppercase tracking-wider">
          Showing {totalProducts === 0 ? 0 : startIndex + 1}–
          {Math.min(endIndex, totalProducts)} of {totalProducts} items
        </span>

        {/* Sort */}

        <div className="flex items-center gap-2 ml-auto">
          <span className="text-[#807779] uppercase tracking-wider hidden sm:inline">
            Sort by:
          </span>

          <select
            value={sortOption}
            onChange={(e) => handleSortChange(e.target.value)}
            className="bg-[#FAF9F7] border border-[#E9E2E3] text-xs text-[#181516] px-3 py-2 rounded-sm focus:outline-none focus:border-[#181516] font-medium"
          >
            <option value="newest">Newest Arrivals</option>

            <option value="best-selling">Best Selling</option>

            <option value="rating">Highest Rated</option>

            <option value="price-low">Price: Low to High</option>

            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* ===================================================
            DESKTOP SIDEBAR
        =================================================== */}

        <aside className="hidden lg:block space-y-8 pr-4 border-r border-[#E9E2E3]">
          {/* CATEGORY */}

          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#181516] pb-2 border-b border-[#E9E2E3]">
              Categories
            </h4>

            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleCategoryChange("all")}
                  className={`w-full text-left transition-colors ${
                    selectedCategory === "all"
                      ? "font-bold text-[#181516]"
                      : "text-[#807779] hover:text-[#181516]"
                  }`}
                >
                  All Categories ({products.length})
                </button>
              </li>

              {categories.map((category) => (
                <li key={category.slug}>
                  <button
                    onClick={() => handleCategoryChange(category.slug)}
                    className={`w-full text-left transition-colors ${
                      selectedCategory === category.slug
                        ? "font-bold text-[#181516]"
                        : "text-[#807779] hover:text-[#181516]"
                    }`}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* COLOR */}

          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#181516] pb-2 border-b border-[#E9E2E3]">
              Color
            </h4>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedColor("all")}
                className={`text-[11px] px-2.5 py-1 rounded-sm border ${
                  selectedColor === "all"
                    ? "bg-[#181516] text-[#FAF9F7] border-[#181516]"
                    : "border-[#E9E2E3] text-[#807779]"
                }`}
              >
                All Colors
              </button>

              {colorOptions.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`text-[11px] px-2.5 py-1 rounded-sm border transition-colors ${
                    selectedColor === color
                      ? "bg-[#181516] text-[#FAF9F7] border-[#181516]"
                      : "border-[#E9E2E3] text-[#807779] hover:border-[#181516]"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* SIZE */}

          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#181516] pb-2 border-b border-[#E9E2E3]">
              Size
            </h4>

            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedSize("all")}
                className={`text-[11px] px-2.5 py-1 rounded-sm border ${
                  selectedSize === "all"
                    ? "bg-[#181516] text-[#FAF9F7] border-[#181516]"
                    : "border-[#E9E2E3] text-[#807779]"
                }`}
              >
                All
              </button>

              {sizeOptions.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`text-[11px] px-2 py-1 rounded-sm border ${
                    selectedSize === size
                      ? "bg-[#181516] text-[#FAF9F7] border-[#181516]"
                      : "border-[#E9E2E3] text-[#807779] hover:border-[#181516]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* RESET */}

          {(selectedCategory !== "all" ||
            selectedColor !== "all" ||
            selectedSize !== "all") && (
            <button
              onClick={handleResetFilters}
              className="text-xs uppercase tracking-widest text-[#181516] underline hover:text-[#807779]"
            >
              Reset All Filters
            </button>
          )}
        </aside>

        {/* ===================================================
            PRODUCT GRID
        =================================================== */}

        <main className="lg:col-span-3">
          <ProductGrid
            products={paginatedProducts}
            emptyMessage={"No products found in this category."}
          />

          {/* =================================================
              PAGINATION
          ================================================= */}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              {/* PREVIOUS */}

              <button
                onClick={() => handlePageChange(safeCurrentPage - 1)}
                disabled={safeCurrentPage === 1}
                className="w-9 h-9 flex items-center justify-center border border-[#E9E2E3] rounded-sm transition-colors hover:border-[#181516] disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* PAGE NUMBERS */}

              {paginationPages.map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-9 h-9 text-xs border rounded-sm transition-colors ${
                    safeCurrentPage === page
                      ? "bg-[#181516] text-[#FAF9F7] border-[#181516]"
                      : "border-[#E9E2E3] text-[#807779] hover:border-[#181516] hover:text-[#181516]"
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* NEXT */}

              <button
                onClick={() => handlePageChange(safeCurrentPage + 1)}
                disabled={safeCurrentPage === totalPages}
                className="w-9 h-9 flex items-center justify-center border border-[#E9E2E3] rounded-sm transition-colors hover:border-[#181516] disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </main>
      </div>

      {/* =====================================================
          MOBILE FILTER DRAWER
      ===================================================== */}

      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}

          <div
            className="fixed inset-0 bg-[#181516]/50 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          {/* Drawer */}

          <div className="relative w-full max-w-xs bg-[#FAF9F7] h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-10 animate-slide-up">
            <div className="space-y-8">
              {/* HEADER */}

              <div className="flex items-center justify-between border-b border-[#E9E2E3] pb-4">
                <h3 className="text-xs uppercase tracking-widest font-semibold text-[#181516]">
                  Refine Catalog
                </h3>

                <button onClick={() => setIsMobileFilterOpen(false)}>
                  <X className="w-5 h-5 text-[#181516]" />
                </button>
              </div>

              {/* CATEGORY */}

              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-[#181516] uppercase">
                  Category
                </h4>

                <div className="space-y-1.5 text-xs">
                  <button
                    onClick={() => handleCategoryChange("all")}
                    className={`block w-full text-left py-1 ${
                      selectedCategory === "all"
                        ? "font-bold"
                        : "text-[#807779]"
                    }`}
                  >
                    All Categories
                  </button>

                  {categories.map((category) => (
                    <button
                      key={category.slug}
                      onClick={() => handleCategoryChange(category.slug)}
                      className={`block w-full text-left py-1 ${
                        selectedCategory === category.slug
                          ? "font-bold"
                          : "text-[#807779]"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* COLOR */}

              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-[#181516] uppercase">
                  Color
                </h4>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedColor("all")}
                    className={`text-[11px] px-2.5 py-1 border rounded-sm ${
                      selectedColor === "all"
                        ? "bg-[#181516] text-[#FAF9F7]"
                        : "border-[#E9E2E3] text-[#807779]"
                    }`}
                  >
                    All
                  </button>

                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`text-[11px] px-2.5 py-1 border rounded-sm ${
                        selectedColor === color
                          ? "bg-[#181516] text-[#FAF9F7]"
                          : "border-[#E9E2E3] text-[#807779]"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* SIZE */}

              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-[#181516] uppercase">
                  Size
                </h4>

                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedSize("all")}
                    className={`text-[11px] px-2.5 py-1 border rounded-sm ${
                      selectedSize === "all"
                        ? "bg-[#181516] text-[#FAF9F7]"
                        : "border-[#E9E2E3] text-[#807779]"
                    }`}
                  >
                    All
                  </button>

                  {sizeOptions.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`text-[11px] px-2 py-1 border rounded-sm ${
                        selectedSize === size
                          ? "bg-[#181516] text-[#FAF9F7]"
                          : "border-[#E9E2E3] text-[#807779]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* RESET */}

              {(selectedCategory !== "all" ||
                selectedColor !== "all" ||
                selectedSize !== "all") && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs uppercase tracking-widest underline"
                >
                  Reset All Filters
                </button>
              )}
            </div>

            {/* SHOW RESULT */}

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full bg-[#181516] text-[#FAF9F7] py-3 text-xs uppercase tracking-widest font-medium rounded-sm mt-6"
            >
              SHOW RESULTS ({totalProducts})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
