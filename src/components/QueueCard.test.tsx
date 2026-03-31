import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { QueueCard } from "./QueueCard";

// Minimal mock for gluestack-ui primitives used inside QueueCard
vi.mock("@/components/ui", () => ({
  Box: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
  Pressable: ({
    children,
    onPress,
  }: {
    children: React.ReactNode;
    onPress?: () => void;
  }) => <button onClick={onPress}>{children}</button>,
  Text: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span className={className}>{children}</span>
  ),
  HStack: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
  VStack: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
}));

describe("QueueCard", () => {
  it("renders the queue name", () => {
    render(<QueueCard name="Watch Later" videoCount={5} />);
    expect(screen.getByText("Watch Later")).toBeInTheDocument();
  });

  it("renders the video count", () => {
    render(<QueueCard name="Favourites" videoCount={12} />);
    expect(screen.getByText("12 videos")).toBeInTheDocument();
  });

  it("applies active styles when isActive is true", () => {
    const { container } = render(<QueueCard name="Active Queue" videoCount={3} isActive />);
    const box = container.querySelector("div");
    expect(box?.className).toContain("border-l-primary-500");
  });

  it("does not apply active border class when isActive is false", () => {
    const { container } = render(<QueueCard name="Inactive" videoCount={0} isActive={false} />);
    const box = container.querySelector("div");
    expect(box?.className).not.toContain("border-l-primary-500");
  });

  it("calls onPress when pressed", async () => {
    const user = userEvent.setup();
    const handlePress = vi.fn();
    render(<QueueCard name="Pressable" videoCount={1} onPress={handlePress} />);
    await user.click(screen.getByRole("button"));
    expect(handlePress).toHaveBeenCalledOnce();
  });

  it("renders without crashing when onPress is not provided", async () => {
    const user = userEvent.setup();
    render(<QueueCard name="No Handler" videoCount={2} />);
    // Should not throw
    await user.click(screen.getByRole("button"));
    expect(screen.getByText("No Handler")).toBeInTheDocument();
  });
});
