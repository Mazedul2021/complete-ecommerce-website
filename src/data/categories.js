import cat1 from "../assets/Image/category/1.png";
import cat2 from "../assets/Image/category/2.png";
import cat3 from "../assets/Image/category/3.png";
import cat4 from "../assets/Image/category/4.png";
import cat5 from "../assets/Image/category/5.png";
import cat6 from "../assets/Image/category/6.png";
import cat7 from "../assets/Image/category/7.png";
import cat8 from "../assets/Image/category/8.png";

export const categories = [
  {
    id: 1,
    name: "Men's Watches",
    slug: "mens-watches",
    img: cat1,
    subCategories: [
      {
        name: "Chronograph",
        slug: "chronograph",
        children: ["Diver", "Pilot", "Racing"],
      },
      {
        name: "Analog Classic",
        slug: "analog-classic",
        children: ["Leather Strap", "Steel Bracelet", "Mesh Strap"],
      },
      {
        name: "Skeleton",
        slug: "skeleton",
        children: ["Automatic", "Tourbillon Design"],
      },
    ],
  },
  {
    id: 2,
    name: "Women's Watches",
    slug: "womens-watches",
    img: cat2,
    subCategories: [
      {
        name: "Bracelet Watches",
        slug: "bracelet-watches",
        children: ["Rose Gold", "Silver Tone", "Two Tone"],
      },
      {
        name: "Dress Watches",
        slug: "dress-watches",
        children: ["Diamond Set", "Slim Classic", "Mother of Pearl"],
      },
      {
        name: "Casual",
        slug: "casual-women",
        children: ["Leather Strap", "Mesh Strap"],
      },
    ],
  },
  {
    id: 3,
    name: "Couple Watches",
    slug: "couple-watches",
    img: cat3,
    subCategories: [
      {
        name: "Couple Sets",
        slug: "couple-sets",
        children: ["His & Hers", "Gift Box Set"],
      },
      {
        name: "Anniversary Editions",
        slug: "anniversary",
        children: ["Gold Edition", "Black Edition"],
      },
    ],
  },
  {
    id: 4,
    name: "Smart Watches",
    slug: "smart-watches",
    img: cat4,
    subCategories: [
      {
        name: "Fitness Bands",
        slug: "fitness-bands",
        children: ["Heart Rate", "Sleep Tracking"],
      },
      {
        name: "Smart Watches",
        slug: "smart-watches-pro",
        children: ["Calling Watch", "AMOLED Display", "Kids GPS"],
      },
    ],
  },
  {
    id: 5,
    name: "Luxury Watches",
    slug: "luxury-watches",
    img: cat5,
    subCategories: [
      {
        name: "Automatic",
        slug: "automatic",
        children: ["Skeleton", "Moon Phase", "GMT"],
      },
      {
        name: "Premium Quartz",
        slug: "premium-quartz",
        children: ["Gold Plated", "Ceramic"],
      },
    ],
  },
  {
    id: 6,
    name: "Digital Watches",
    slug: "digital-watches",
    img: cat6,
    subCategories: [
      {
        name: "Sport Digital",
        slug: "sport-digital",
        children: ["Waterproof", "Dual Time", "LED"],
      },
      {
        name: "Retro Digital",
        slug: "retro-digital",
        children: ["Calculator", "Classic 80s"],
      },
    ],
  },
  {
    id: 7,
    name: "Kids' Watches",
    slug: "kids-watches",
    img: cat7,
    subCategories: [
      {
        name: "Character Watches",
        slug: "character-watches",
        children: ["Cartoon Dial", "3D Strap"],
      },
      {
        name: "Kids Digital",
        slug: "kids-digital",
        children: ["Waterproof", "Light Up"],
      },
    ],
  },
  {
    id: 8,
    name: "Accessories",
    slug: "accessories",
    img: cat8,
    subCategories: [
      {
        name: "Straps",
        slug: "straps",
        children: ["Leather", "Silicone", "Steel", "Mesh"],
      },
      {
        name: "Gift Sets",
        slug: "gift-sets",
        children: ["Watch Box", "Travel Case"],
      },
    ],
  },
];

export const getCategoryBySlug = (slug) =>
  categories.find((c) => c.slug === slug);

export const getCategoryName = (slug) => getCategoryBySlug(slug)?.name ?? slug;
