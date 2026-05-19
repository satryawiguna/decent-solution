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
      <main className="flex flex-col items-center px-6 pb-20 pt-24">
        {/* Title Section */}
        <div className="mb-8 flex max-w-[896px] flex-col items-center gap-2 text-center">
          <h1
            className="text-[48px] font-bold leading-[56px] tracking-[-0.96px] text-[#00415e]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Define Your Space
          </h1>
          <p className="max-w-[672px] text-[18px] leading-[28px] text-[#40484e]">
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
              className="relative flex flex-col rounded-[8px] border border-[#dfdfdf] bg-[#fcf9f8] p-[33px]"
            >
              {/* Photo */}
              <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-[4px] bg-[#f6f3f2]">
                <img
                  src={image}
                  alt={name}
                  className="absolute inset-0 h-[133.34%] w-full max-w-none object-cover"
                  style={{ top: "-16.67%" }}
                />
              </div>

              {/* Title row */}
              <div className="mb-2 flex items-center gap-2">
                <Icon className="h-[18px] w-[18px] shrink-0 text-[#00415e]" />
                <h3 className="text-[20px] font-semibold leading-[28px] text-[#00415e]">
                  {name}
                </h3>
              </div>

              {/* Description */}
              <p className="mb-4 text-[16px] leading-[24px] text-[#40484e]">
                {description}
              </p>

              {/* CTA */}
              <Link
                href={`/design?template=${id}`}
                className="flex items-center gap-2 text-[16px] leading-[24px] text-[#00415e] transition-opacity hover:opacity-70"
              >
                Select Template
                <ChevronRight className="h-[14px] w-[14px]" />
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
