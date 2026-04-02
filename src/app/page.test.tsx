import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home page", () => {
  it("renders the QueueTube heading", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /queuetube/i })).toBeInTheDocument();
  });

  it("renders the tagline", () => {
    render(<Home />);
    expect(screen.getByText(/youtube queue management for power users/i)).toBeInTheDocument();
  });
});
