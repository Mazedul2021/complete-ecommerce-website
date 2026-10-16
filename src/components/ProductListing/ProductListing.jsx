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
import { getCategoryBySlug } from "../../data/categories";

const PER_PAGE = 8;

const SORTS = [
  { key: "latest", label: "Sort by latest" },
  { key: "name", label: "Sort by name: A to Z" },
  { key: "price-asc", label: "Sort by price: low to high" },
  { key: "price-desc", label: "Sort by price: high to low" },
  { key: "rating", label: "Sort by rating" },
  { key: "discount", label: "Biggest discount" },
];

const ProductListing = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
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
    price: priceBounds,
    inStockOnly: false,
    minRating: 0,
  });
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const activeCategory = categoryParam ? getCategoryBySlug(categoryParam) : null;

  const filtered = useMemo(() => {
    let list = [...products];

    if (categoryParam) list = list.filter((p) => p.category === categoryParam);
    else if (filters.categories.length > 0)
      list = list.filter((p) => filters.categories.includes(p.category));

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
  }, [categoryParam, qParam, filters, sortKey]);

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

  const breadcrumbItems = activeCategory
    ? [{ label: "Shop", to: "/shop" }, { label: activeCategory.name }]
    : qParam
    ? [{ label: "Shop", to: "/shop" }, { label: `Search: "${qParam}"` }]
    : [{ label: "Shop" }];

  return (
    <>
      <BreedCrumps items={breadcrumbItems} />
      <section className="py-5 pb-10">
        <div className="bg-white p-2 mt-2">
          <div className="container flex flex-col lg:flex-row gap-4">
            <div className="sidebarWrapper w-full lg:w-[23%] shrink-0">
              <Sidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                priceBounds={priceBounds}
              />
            </div>

            <div className="rightContent w-full lg:w-[77%] py-1 px-1">
              <div className="bg-[#f1f1f1] p-2.5 w-full mb-4 flex flex-wrap items-center justify-between gap-2 rounded-md">
                <div className="col1 flex items-center itemViewActions">
                  <Button
                    className={`!w-[35px] !h-[35px] !min-w-[35px] !rounded-full ${
                      itemView === "grid" ? "active" : ""
                    }`}
                    onClick={() => setItemView("grid")}
                  >
                    <IoGrid className="!text-[rgba(0,0,0,0.7)] text-[14px]" />
                  </Button>
                  <Button
                    className={`!w-[35px] !h-[35px] !min-w-[35px] !rounded-full ${
                      itemView === "list" ? "active" : ""
                    }`}
                    onClick={() => setItemView("list")}
                  >
                    <FaList className="!text-[rgba(0,0,0,0.7)] text-[14px]" />
                  </Button>
                  <span className="text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]">
                    There are{" "}
                    <b className="text-[#ff5252]">{filtered.length}</b> products.
                  </span>
                </div>
                <div className="col2 flex items-center justify-end gap-3">
                  <span className="text-[14px] font-[500] text-[rgba(0,0,0,0.7)]">
                    Sort By
                  </span>
                  <Button
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    className="!bg-white !text-[12px] !text-[#000] !normal-case !border !border-[rgba(0,0,0,0.3)]"
                  >
                    {SORTS.find((s) => s.key === sortKey)?.label ??
                      "Sort by latest"}
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => setAnchorEl(null)}
                  >
                    {SORTS.map((s) => (
                      <MenuItem
                        key={s.key}
                        onClick={() => {
                          setSortKey(s.key);
                          setAnchorEl(null);
                          setPage(1);
                        }}
                      >
                        {s.label}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              </div>

              {paged.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
                  <span className="text-[52px]">🔍</span>
                  <p className="text-[17px] font-[600]">No products found</p>
                  <p className="text-[14px] text-[rgba(0,0,0,0.5)]">
                    Try adjusting your filters or search keywords.
                  </p>
                </div>
              ) : (
                <div
                  className={`grid ${
                    itemView === "grid"
                      ? "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4"
                      : "grid-cols-1"
                  } gap-4`}
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

              {totalPages > 1 && (
                <div className="flex items-center justify-center mt-10">
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(_, v) => setPage(v)}
                    showFirstButton
                    showLastButton
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
