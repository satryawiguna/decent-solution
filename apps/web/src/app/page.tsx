import Link from "next/link";
import Header from "@/components/layout/Header";
import { Home, Users, User, ChevronRight } from "lucide-react";

// Figma asset URLs (valid for 7 days)
const IMG_HOME_OFFICE =
  "https://www.figma.com/api/mcp/asset/c1c3e866-c719-4b10-8c72-141996235560";
const IMG_COLLABORATIVE =
  "https://www.figma.com/api/mcp/asset/d8a62d8f-5ad9-463a-aa60-c69d0c71fe90";
const IMG_EXECUTIVE =
  "https://www.figma.com/api/mcp/asset/d1f8a6c1-cd2a-4ea0-83c5-855579b058e9";

const templates = [
  {
    id: "home-office",
    name: "Home Office",
    icon: Home,
    image: IMG_HOME_OFFICE,
    description:
      "Optimized for individual focus and domestic comfort. Perfect for remote professionals and creative freelancers.",
  },
  {
    id: "collaborative-studio",
    name: "Collaborative Studio",
    icon: Users,
    image: IMG_COLLABORATIVE,
    description:
      "Designed for teams and shared creativity. Includes open zones, modular tables, and flexible breakout areas.",
  },
  {
    id: "executive-suite",
    name: "Executive Suite",
    icon: User,
    image: IMG_EXECUTIVE,
    description:
      "Premium private environment for leadership and strategy. High-quality materials and refined aesthetics.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fcf9f8]">
      <Header />

      {/* Main Content */}
      <main className="flex flex-col items-center px-4 pb-20 pt-24 sm:px-6">
        {/* Title Section */}
        <div className="mb-8 flex max-w-[896px] flex-col items-center gap-3 text-center">
          <h1
            className="text-3xl font-bold leading-tight tracking-tight text-[#00415e] sm:text-4xl lg:text-[48px] lg:leading-[56px] lg:tracking-[-0.96px]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Define Your Space
          </h1>
          <p className="max-w-[672px] text-base leading-relaxed text-[#40484e] sm:text-[18px] sm:leading-[28px]">
            Select a workspace archetype to begin your planning journey. Each
            template is optimized for specific productivity needs and spatial
            layouts.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid w-full max-w-[1152px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map(({ id, name, icon: Icon, image, description }) => (
            <div
              key={id}
              className="group relative flex flex-col rounded-[8px] border border-[#dfdfdf] bg-[#fcf9f8] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#00415e]/30 hover:shadow-lg sm:p-[33px]"
            >
              {/* Photo */}
              <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-[4px] bg-[#f6f3f2]">
                <img
                  src={image}
                  alt={name}
                  className="absolute inset-0 h-[133.34%] w-full max-w-none object-cover transition-transform duration-300 group-hover:scale-105"
                  style={{ top: "-16.67%" }}
                />
              </div>

              {/* Title row */}
              <div className="mb-2 flex items-center gap-2">
                <Icon className="h-[18px] w-[18px] shrink-0 text-[#00415e]" />
                <h3 className="text-[18px] font-semibold leading-[28px] text-[#00415e] sm:text-[20px]">
                  {name}
                </h3>
              </div>

              {/* Description */}
              <p className="mb-5 flex-1 text-[15px] leading-[24px] text-[#40484e] sm:text-[16px]">
                {description}
              </p>

              {/* CTA */}
              <Link
                href={`/design?template=${id}`}
                className="inline-flex items-center gap-2 text-[15px] font-semibold leading-[24px] text-[#00415e] transition-all duration-150 hover:gap-3 hover:opacity-80 sm:text-[16px]"
              >
                Select Template
                <ChevronRight className="h-[14px] w-[14px] transition-transform duration-150 group-hover:translate-x-0.5" />
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
