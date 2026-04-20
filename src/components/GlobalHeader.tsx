import { useRouter } from "next/navigation";
import { Box, HStack, Pressable, Text } from "@/components/ui";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import { SearchIcon } from "@/components/ui/icon";

interface GlobalHeaderProps {
  userDisplayName?: string;
  userAvatarUrl?: string;
  isAuthenticated?: boolean;
}

export function GlobalHeader({
  userDisplayName,
  userAvatarUrl,
  isAuthenticated = true,
}: GlobalHeaderProps) {
  const router = useRouter();

  const fallbackInitials = userDisplayName
    ? userDisplayName.slice(0, 2).toUpperCase()
    : "?";

  function handleAvatarPress() {
    if (isAuthenticated) {
      router.push("/profile");
    } else {
      router.push("/sign-in");
    }
  }

  return (
    <Box
      className="sticky top-0 z-50 w-full bg-background-dark border-b border-outline-100"
      style={{ height: 72 }}
    >
      <HStack className="h-full w-full max-w-screen-xl mx-auto px-6 items-center gap-6">
        {/* Logo */}
        <HStack className="items-center gap-3 shrink-0">
          {/* Logo icon tile */}
          <Box className="rounded-xl bg-background-0 border border-outline-100 items-center justify-center" style={{ width: 44, height: 44 }}>
            {/* Play/list icon represented with a simple inline SVG */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="6" width="14" height="2" rx="1" fill="#f5f5f5" />
              <rect x="3" y="11" width="10" height="2" rx="1" fill="#f5f5f5" />
              <rect x="3" y="16" width="8" height="2" rx="1" fill="#f5f5f5" />
              <polygon points="17,10 22,13 17,16" fill="#E94560" />
            </svg>
          </Box>
          {/* Wordmark */}
          <HStack className="items-baseline gap-0">
            <Text
              className="text-typography-900 font-bold"
              style={{ fontSize: 28, lineHeight: 36, fontFamily: "Inter, sans-serif" }}
            >
              Queue
            </Text>
            <Text
              className="font-bold"
              style={{
                fontSize: 28,
                lineHeight: 36,
                fontFamily: "Inter, sans-serif",
                color: "#00B87A",
              }}
            >
              Tube
            </Text>
          </HStack>
        </HStack>

        {/* Search bar */}
        <Box className="flex-1 items-center">
          <Input
            className="rounded-full bg-background-50 border-outline-100 w-full"
            style={{ maxWidth: 420, minWidth: 200 }}
            size="md"
          >
            <InputSlot className="pl-3">
              <InputIcon as={SearchIcon} className="text-typography-400" />
            </InputSlot>
            <InputField
              placeholder="Find Content"
              className="text-typography-900 placeholder:text-typography-400"
              aria-label="Find Content"
            />
          </Input>
        </Box>

        {/* Nav links + avatar */}
        <HStack className="items-center gap-6 shrink-0">
          <Pressable onPress={() => router.push("/library")} aria-label="Library">
            <Text
              className="text-typography-900 truncate"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}
              numberOfLines={1}
            >
              Library
            </Text>
          </Pressable>

          <Pressable onPress={() => router.push("/queues")} aria-label="My Queues">
            <Text
              className="text-typography-900 truncate"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}
              numberOfLines={1}
            >
              My Queues
            </Text>
          </Pressable>

          <Pressable onPress={handleAvatarPress} aria-label="User profile">
            <Avatar
              className="rounded-full bg-background-50"
              style={{ width: 40, height: 40 }}
              size="md"
            >
              {userAvatarUrl ? (
                <AvatarImage
                  source={{ uri: userAvatarUrl }}
                  alt={userDisplayName ?? "User avatar"}
                />
              ) : null}
              <AvatarFallbackText className="text-typography-900">
                {fallbackInitials}
              </AvatarFallbackText>
            </Avatar>
          </Pressable>
        </HStack>
      </HStack>
    </Box>
  );
}
