"use client";

import { useState } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function FilterSidebar() {
  const [expandedSections, setExpandedSections] = useState({
    brand: true,
    price: true,
    color: true,
    discount: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section as keyof typeof expandedSections],
    });
  };

  const brands = [
    { name: "HIGHLANDER", count: 6136 },
    { name: "Roadster", count: 4600 },
    { name: "Snitch", count: 3635 },
    { name: "Crimsoune Club", count: 3183 },
    { name: "Louis Philippe Sport", count: 2983 },
    { name: "Mast & Harbour", count: 2980 },
    { name: "SHOWOFF", count: 2960 },
    { name: "Campus Sutra", count: 2840 },
  ];

  const colors = [
    { name: "Blue", count: 24652, color: "bg-blue-600" },
    { name: "White", count: 20390, color: "bg-white border border-gray-300" },
    { name: "Black", count: 14327, color: "bg-black" },
    { name: "Green", count: 13472, color: "bg-green-600" },
    { name: "Navy Blue", count: 12601, color: "bg-blue-900" },
    { name: "Grey", count: 9788, color: "bg-gray-500" },
    { name: "Beige", count: 7047, color: "bg-amber-100" },
  ];

  const discountRanges = [
    "10% and above",
    "20% and above",
    "30% and above",
    "40% and above",
    "50% and above",
    "60% and above",
    "70% and above",
    "80% and above",
  ];

  const [priceRange, setPriceRange] = useState([100, 10100]);

  return (
    <div className="space-y-6">
      <div className="font-bold text-lg">FILTERS</div>

      {/* Brand Filter */}
      <div className="border-b pb-4">
        <div
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => toggleSection("brand")}
        >
          <h3 className="font-medium">BRAND</h3>
          {expandedSections.brand ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>

        {expandedSections.brand && (
          <>
            <div className="relative mb-3">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input placeholder="Search" className="pl-8 h-9 text-sm" />
            </div>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {brands.map((brand) => (
                <div key={brand.name} className="flex items-center space-x-2">
                  <Checkbox id={`brand-${brand.name}`} />
                  <Label
                    htmlFor={`brand-${brand.name}`}
                    className="text-sm flex justify-between w-full"
                  >
                    <span>{brand.name}</span>
                    <span className="text-gray-500 text-xs">
                      ({brand.count})
                    </span>
                  </Label>
                </div>
              ))}
              <button className="text-red-500 text-sm mt-2">+ 909 more</button>
            </div>
          </>
        )}
      </div>

      {/* Price Filter */}
      <div className="border-b pb-4">
        <div
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => toggleSection("price")}
        >
          <h3 className="font-medium">PRICE</h3>
          {expandedSections.price ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>

        {expandedSections.price && (
          <div className="space-y-4">
            <Slider
              defaultValue={[100, 10100]}
              min={100}
              max={10100}
              step={100}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mt-6"
            />
            <div className="flex justify-between text-sm">
              <span>₹  {priceRange[0]}</span>
              <span>₹  {priceRange[1]}+</span>
            </div>
          </div>
        )}
      </div>

      {/* Color Filter */}
      <div className="border-b pb-4">
        <div
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => toggleSection("color")}
        >
          <h3 className="font-medium">COLOR</h3>
          {expandedSections.color ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>

        {expandedSections.color && (
          <>
            <div className="relative mb-3">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input placeholder="Search" className="pl-8 h-9 text-sm" />
            </div>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {colors.map((color) => (
                <div key={color.name} className="flex items-center space-x-2">
                  <Checkbox id={`color-${color.name}`} />
                  <div className={`w-5 h-5 rounded-full ${color.color}`}></div>
                  <Label
                    htmlFor={`color-${color.name}`}
                    className="text-sm flex justify-between w-full"
                  >
                    <span>{color.name}</span>
                    <span className="text-gray-500 text-xs">
                      ({color.count})
                    </span>
                  </Label>
                </div>
              ))}
              <button className="text-red-500 text-sm mt-2">+ 43 more</button>
            </div>
          </>
        )}
      </div>

      {/* Discount Range */}
      <div className="border-b pb-4">
        <div
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => toggleSection("discount")}
        >
          <h3 className="font-medium">DISCOUNT RANGE</h3>
          {expandedSections.discount ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>

        {expandedSections.discount && (
          <div className="space-y-2">
            {discountRanges.map((range) => (
              <div key={range} className="flex items-center space-x-2">
                <Checkbox id={`discount-${range}`} />
                <Label htmlFor={`discount-${range}`} className="text-sm">
                  {range}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
