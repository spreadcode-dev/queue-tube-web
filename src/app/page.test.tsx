import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "./page";

describe("Home page", () => {
  it("renders the QueueTube heading", () => {
    const { screen } = render(<Home />);
    expect(screen.getByRole("heading", { name: /queuetube/i })).toBeInTheDocument();
  });

  it("renders the tagline", () => {
    const { screen } = render(<Home />);
    expect(screen.getByText(/youtube queue management for power users/i)).toBeInTheDocument();
  });
});
