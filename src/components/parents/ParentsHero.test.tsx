import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ParentsHero } from "./ParentsHero";

describe("ParentsHero", () => {
  it("uses the supplied hero assets and submits the waitlist form", async () => {
    const user = userEvent.setup();
    render(<ParentsHero />);

    expect(screen.getAllByTestId("parents-hero-image")).toHaveLength(2);
    expect(screen.getAllByTestId("parents-wave")).toHaveLength(2);
    screen
      .getAllByTestId("parents-wave")
      .forEach((wave) => expect(wave).toHaveAttribute("alt", ""));
    expect(
      screen.getAllByRole("heading", {
        name: "You should not have to wonder if your child is safe.",
      }),
    ).toHaveLength(2);

    await user.type(screen.getByLabelText("First name"), "Amber");
    await user.type(
      screen.getByLabelText("Email address"),
      "amber@example.com",
    );
    await user.type(screen.getByLabelText("Zip code"), "10001");
    await user.click(
      screen.getAllByRole("button", { name: "Join the waitlist" })[0],
    );

    expect(screen.getByRole("status")).toHaveTextContent("You’re on the list!");
  });
});
