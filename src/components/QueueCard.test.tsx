import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { QueueCard } from "./QueueCard";

// Minimal mocks for gluestack-ui primitives used inside QueueCard
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
    render(<QueueCard name="My Watch Later" videoCount={12} />);
    expect(screen.getByText("My Watch Later")).toBeInTheDocument();
  });

  it("renders the video count", () => {
    render(<QueueCard name="Tech Talks" videoCount={7} />);
    expect(screen.getByText("7 videos")).toBeInTheDocument();
  });

  it("applies active styles when isActive is true", () => {
    const { container } = render(<QueueCard name="Active Queue" videoCount={3} isActive />);
    const box = container.querySelector(".border-l-primary-500");
    expect(box).not.toBeNull();
  });

  it("does not apply active left-border class when isActive is false", () => {
    const { container } = render(<QueueCard name="Inactive Queue" videoCount={1} isActive={false} />);
    const box = container.querySelector(".border-l-primary-500");
    expect(box).toBeNull();
  });

  it("calls onPress when the card is pressed", async () => {
    const handlePress = vi.fn();
    render(<QueueCard name="Clickable" videoCount={5} onPress={handlePress} />);
    screen.getByRole("button").click();
    expect(handlePress).toHaveBeenCalledTimes(1);
  });
});
