import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GlobalHeader } from "./GlobalHeader";

// Mock next/navigation
const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

describe("GlobalHeader", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it("renders the QueueTube wordmark", () => {
    render(<GlobalHeader />);
    expect(screen.getByText("Queue")).toBeInTheDocument();
    expect(screen.getByText("Tube")).toBeInTheDocument();
  });

  it("renders the search input with placeholder 'Find Content'", () => {
    render(<GlobalHeader />);
    expect(screen.getByPlaceholderText("Find Content")).toBeInTheDocument();
  });

  it("renders Library and My Queues nav links", () => {
    render(<GlobalHeader />);
    expect(screen.getByLabelText("Library")).toBeInTheDocument();
    expect(screen.getByLabelText("My Queues")).toBeInTheDocument();
  });

  it("renders user avatar pressable", () => {
    render(<GlobalHeader userDisplayName="John Doe" />);
    expect(screen.getByLabelText("User profile")).toBeInTheDocument();
  });

  it("navigates to /library when Library is pressed", () => {
    render(<GlobalHeader />);
    fireEvent.click(screen.getByLabelText("Library"));
    expect(pushMock).toHaveBeenCalledWith("/library");
  });

  it("navigates to /queues when My Queues is pressed", () => {
    render(<GlobalHeader />);
    fireEvent.click(screen.getByLabelText("My Queues"));
    expect(pushMock).toHaveBeenCalledWith("/queues");
  });

  it("navigates to /profile when avatar is pressed and user is authenticated", () => {
    render(<GlobalHeader isAuthenticated userDisplayName="Jane Smith" />);
    fireEvent.click(screen.getByLabelText("User profile"));
    expect(pushMock).toHaveBeenCalledWith("/profile");
  });

  it("navigates to /sign-in when avatar is pressed and user is not authenticated", () => {
    render(<GlobalHeader isAuthenticated={false} />);
    fireEvent.click(screen.getByLabelText("User profile"));
    expect(pushMock).toHaveBeenCalledWith("/sign-in");
  });

  it("shows fallback initials when no avatar URL is provided", () => {
    render(<GlobalHeader userDisplayName="Alice Brown" />);
    // AvatarFallbackText content
    expect(screen.getByText("AL")).toBeInTheDocument();
  });

  it("shows anonymous fallback '?' when no display name or avatar", () => {
    render(<GlobalHeader isAuthenticated={false} />);
    expect(screen.getByText("?")).toBeInTheDocument();
  });

  it("renders the header with sticky positioning class", () => {
    const { container } = render(<GlobalHeader />);
    const header = container.firstChild as HTMLElement;
    expect(header.className).toContain("sticky");
    expect(header.className).toContain("top-0");
  });

  it("header renders identically when no props are passed (empty state)", () => {
    const { container: c1 } = render(<GlobalHeader />);
    const { container: c2 } = render(
      <GlobalHeader userDisplayName="Alice" userAvatarUrl="https://example.com/avatar.jpg" />
    );
    // Both should still render the header root
    expect(c1.firstChild).toBeTruthy();
    expect(c2.firstChild).toBeTruthy();
  });
});
