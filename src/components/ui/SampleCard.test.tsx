import { render, screen } from "@testing-library/react";
import { SampleCard } from "./SampleCard";

describe("SampleCard", () => {
  it("renders the provided title", () => {
    render(<SampleCard title="My Queue" />);
    expect(screen.getByRole("heading", { name: "My Queue" })).toBeInTheDocument();
  });

  it("applies the correct background class", () => {
    const { container } = render(<SampleCard title="Test" />);
    expect(container.firstChild).toHaveClass("bg-background-0");
  });
});
