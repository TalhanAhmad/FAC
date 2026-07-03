import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RoiCalculator } from "./RoiCalculator";

describe("RoiCalculator", () => {
  it("updates both displayed values from the sliders", () => {
    render(<RoiCalculator />);

    fireEvent.change(
      screen.getByRole("slider", { name: "Current enrollment" }),
      { target: { value: "42" } },
    );
    fireEvent.change(
      screen.getByRole("slider", {
        name: "Average years a family stays enrolled",
      }),
      { target: { value: "4.5" } },
    );

    expect(screen.getByText("42 children")).toBeInTheDocument();
    expect(screen.getByText("4.5 years")).toBeInTheDocument();
  });

  it("matches the Figma calculator content", () => {
    render(<RoiCalculator />);

    expect(
      screen.getByRole("heading", {
        name: "One enrollment changes the math completely.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Lifetime tuition from one new family"),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Get your center certified" }),
    ).toHaveAttribute("href", "/certification");
  });
});
