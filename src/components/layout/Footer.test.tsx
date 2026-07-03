import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/image", () => ({
  default: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => <img alt={alt} {...props} />,
}));

describe("Footer", () => {
  const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

  afterEach(() => {
    consoleErrorSpy.mockClear();
  });

  it("does not emit duplicate-key warnings for footer links", () => {
    render(<Footer />);

    const hadDuplicateKeyWarning = consoleErrorSpy.mock.calls.some(
      ([firstArg]) => typeof firstArg === "string" && firstArg.includes("Encountered two children with the same key")
    );

    expect(hadDuplicateKeyWarning).toBe(false);
  });

  it.each([
    ["Instagram", "https://www.instagram.com/foodallergycertified"],
    ["Facebook", "https://www.facebook.com/foodallergycertified"],
    ["LinkedIn", "https://www.linkedin.com/company/food-allergy-certified/"],
    ["TikTok", "https://www.tiktok.com/@foodallergycertified"],
  ])("links the %s icon to its official profile", (label, href) => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: label })).toHaveAttribute("href", href);
    expect(screen.getByRole("link", { name: label })).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: label })).toHaveAttribute(
      "rel",
      "noopener noreferrer",
    );
  });
});
