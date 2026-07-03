import { afterEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
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
});
