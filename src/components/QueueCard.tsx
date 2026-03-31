import { Box, Pressable, Text, HStack, VStack, Image } from "@/components/ui";

export interface VideoItem {
  id: string;
  title: string;
  creatorName: string;
  viewCount: number;
  thumbnailUrl: string;
}

interface QueueCardProps {
  item: VideoItem;
  isActive?: boolean;
  onPress?: () => void;
}

function formatViewCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M views`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K views`;
  return `${count} views`;
}

export function QueueCard({ item, isActive = false, onPress }: QueueCardProps) {
  return (
    <Pressable onPress={onPress} className="group w-full">
      <Box
        className={[
          "rounded-xl overflow-hidden",
          "bg-background-0 border border-outline-300",
          isActive ? "border-l-4 border-l-primary-500" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <HStack space="sm" className="items-start p-3">
          {/* Thumbnail — 16:9 aspect ratio, fixed width on desktop */}
          <Box className="w-40 rounded-lg overflow-hidden shrink-0">
            <Box className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <Image
                source={{ uri: item.thumbnailUrl }}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </Box>
          </Box>

          {/* Metadata */}
          <VStack className="flex-1 justify-start py-1" space="xs">
            <Text
              className="text-typography-900 font-semibold text-sm leading-snug"
              numberOfLines={2}
            >
              {item.title}
            </Text>
            <Text className="text-typography-400 text-xs">{item.creatorName}</Text>
            <Text className="text-typography-400 text-xs">{formatViewCount(item.viewCount)}</Text>
          </VStack>

          {/* Overflow menu — visible only on hover/focus */}
          <Box
            aria-label="More options"
            className="opacity-0 group-hover:opacity-100 focus-within:opacity-100 p-1 rounded-lg transition-opacity"
          >
            <Text className="text-typography-400 text-lg leading-none select-none">⋮</Text>
          </Box>
        </HStack>
      </Box>
    </Pressable>
  );
}
