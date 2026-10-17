import React, { useMemo, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import ProductItem from "../ProductItem/ProductItem";
import ProductItemListView from "../ProductItemListView/ProductItemListView";
import BreedCrumps from "../BreedCrumps/BreedCrumps";
import { IoGrid } from "react-icons/io5";
import Button from "@mui/material/Button";
import { FaList } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import { useSearchParams } from "react-router-dom";
import { products } from "../../data/products";
import { getCategoryBySlug, getCategoryName } from "../../data/categories";
import { IoCloseCircle, IoSwapVertical } from "react-icons/io5";

const PER_PAGE = 8;

const SORTS = [
  { key: "latest", label: "Sort by Latest" },
  { key: "name", label: "Sort by Name: A to Z" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "rating", label: "Top Customer Rating" },
  { key: "discount", label: "Biggest Discount (%)" },
];

const ProductListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const brandParam = searchParams.get("brand");
  const qParam = searchParams.get("q") ?? "";
  const sortParam = searchParams.get("sort") ?? "latest";

  const itemViewInit = searchParams.get("view") === "list" ? "list" : "grid";

  const priceBounds = useMemo(() => {
    const prices = products.map((p) => p.price);
    return [Math.floor(Math.min(...prices) / 100) * 100, Math.ceil(Math.max(...prices) / 100) * 100];
  }, []);

  const [itemView, setItemView] = useState(itemViewInit);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState(sortParam);
  const [filters, setFilters] = useState({
    categories: categoryParam ? [categoryParam] : [],
    brands: brandParam ? [brandParam] : [],
    price: priceBounds,
    inStockOnly: false,
    minRating: 0,
  });
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const activeCategory = categoryParam ? getCategoryBySlug(categoryParam) : null;

  const filtered = useMemo(() => {
    let list = [...products];

    if (categoryParam) {
      list = list.filter((p) => p.category === categoryParam);
    } else if (filters.categories.length > 0) {
      list = list.filter((p) => filters.categories.includes(p.category));
    }

    if (brandParam) {
      list = list.filter((p) => p.brand.toLowerCase() === brandParam.toLowerCase());
    } else if (filters.brands && filters.brands.length > 0) {
      list = list.filter((p) => filters.brands.includes(p.brand));
    }

    if (qParam.trim()) {
      const q = qParam.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }

    list = list.filter(
      (p) => p.price >= filters.price[0] && p.price <= filters.price[1]
    );

    if (filters.inStockOnly) list = list.filter((p) => p.stock > 0);
    if (filters.minRating > 0) list = list.filter((p) => p.rating >= filters.minRating);

    switch (sortKey) {
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "discount":
        list.sort(
          (a, b) =>
            (b.oldPrice - b.price) / b.oldPrice -
            (a.oldPrice - a.price) / a.oldPrice
        );
        break;
      default:
        list.sort((a, b) => b.id - a.id);
    }
    return list;
  }, [categoryParam, brandParam, qParam, filters, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  const handleFilterChange = (next) => {
    setFilters(next);
    setPage(1);
  };

  const removeCategoryChip = (slug) => {
    handleFilterChange({
      ...filters,
      categories: filters.categories.filter((c) => c !== slug),
    });
  };

  const removeBrandChip = (brand) => {
    handleFilterChange({
      ...filters,
      brands: (filters.brands || []).filter((b) => b !== brand),
    });
  };

  const breadcrumbItems = activeCategory
    ? [{ label: "Home", to: "/" }, { label: "Catalog", to: "/shop" }, { label: activeCategory.name }]
    : qParam
    ? [{ label: "Home", to: "/" }, { label: "Catalog", to: "/shop" }, { label: `Search: "${qParam}"` }]
    : [{ label: "Home", to: "/" }, { label: "Catalog" }];

  return (
    <>
      <BreedCrumps items={breadcrumbItems} />
      <section className="py-6 pb-16">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Filters */}
            <div className="w-full lg:w-[280px] shrink-0">
              <Sidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                priceBounds={priceBounds}
              />
            </div>

            {/* Products Main View */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] mb-5 flex flex-wrap items-center justify-between gap-3">
                {/* View Toggles & Count */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                    <button
                      onClick={() => setItemView("grid")}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${
                        itemView === "grid"
                          ? "bg-white text-rose-600 shadow-sm"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                      aria-label="Grid view"
                    >
                      <IoGrid className="text-[16px]" />
                    </button>
                    <button
                      onClick={() => setItemView("list")}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${
                        itemView === "list"
                          ? "bg-white text-rose-600 shadow-sm"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                      aria-label="List view"
                    >
                      <FaList className="text-[14px]" />
                    </button>
                  </div>

                  <span className="text-[13.5px] font-semibold text-slate-600 pl-2">
                    Showing <b className="text-slate-900">{filtered.length}</b> timepieces
                  </span>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-semibold text-slate-500">
                    Sort:
                  </span>
                  <button
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    className="h-9 px-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 text-slate-800 text-[12.5px] font-bold flex items-center gap-1.5 transition"
                  >
                    <span>{SORTS.find((s) => s.key === sortKey)?.label ?? "Sort by Latest"}</span>
                    <IoSwapVertical className="text-slate-400" />
                  </button>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => setAnchorEl(null)}
                    PaperProps={{
                      sx: {
                        borderRadius: "16px",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                        mt: 1,
                      },
                    }}
                  >
                    {SORTS.map((s) => (
                      <MenuItem
                        key={s.key}
                        selected={sortKey === s.key}
                        onClick={() => {
                          setSortKey(s.key);
                          setAnchorEl(null);
                          setPage(1);
                        }}
                        className="!text-[13px] !font-medium"
                      >
                        {s.label}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              </div>

              {/* Active Filter Chips */}
              {(filters.categories.length > 0 ||
                (filters.brands && filters.brands.length > 0) ||
                filters.inStockOnly ||
                filters.minRating > 0) && (
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                    Active Filters:
                  </span>
                  {filters.categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => removeCategoryChip(c)}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[12px] font-bold hover:bg-rose-100 transition"
                    >
                      {getCategoryName(c)} <IoCloseCircle className="text-[14px]" />
                    </button>
                  ))}
                  {filters.brands?.map((b) => (
                    <button
                      key={b}
                      onClick={() => removeBrandChip(b)}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[12px] font-bold hover:bg-slate-200 transition"
                    >
                      Brand: {b} <IoCloseCircle className="text-[14px]" />
                    </button>
                  ))}
                  {filters.inStockOnly && (
                    <button
                      onClick={() => handleFilterChange({ ...filters, inStockOnly: false })}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[12px] font-bold"
                    >
                      In Stock Only <IoCloseCircle className="text-[14px]" />
                    </button>
                  )}
                  {filters.minRating > 0 && (
                    <button
                      onClick={() => handleFilterChange({ ...filters, minRating: 0 })}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[12px] font-bold"
                    >
                      {filters.minRating}+ Stars <IoCloseCircle className="text-[14px]" />
                    </button>
                  )}
                </div>
              )}

              {/* Products Grid or List */}
              {paged.length === 0 ? (
                <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center my-6 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-[32px] mb-3">
                    🔍
                  </div>
                  <h3 className="text-[18px] font-bold text-slate-900">
                    No Matching Timepieces
                  </h3>
                  <p className="text-[13.5px] text-slate-500 max-w-sm mt-1">
                    Try removing some of your filter criteria or searching with a different watch term.
                  </p>
                  <button
                    onClick={() =>
                      handleFilterChange({
                        categories: [],
                        brands: [],
                        price: priceBounds,
                        inStockOnly: false,
                        minRating: 0,
                      })
                    }
                    className="mt-4 px-5 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-[13px] hover:bg-rose-700 transition"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div
                  className={`grid ${
                    itemView === "grid"
                      ? "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
                      : "grid-cols-1 gap-4"
                  }`}
                >
                  {paged.map((product) =>
                    itemView === "grid" ? (
                      <ProductItem key={product.id} product={product} />
                    ) : (
                      <ProductItemListView key={product.id} product={product} />
                    )
                  )}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center mt-12">
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(_, v) => {
                      setPage(v);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    showFirstButton
                    showLastButton
                    shape="rounded"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductListing;
