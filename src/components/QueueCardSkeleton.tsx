import { Box, HStack, VStack } from "@/components/ui";

export function QueueCardSkeleton() {
  return (
    <Box className="rounded-xl bg-background-0 border border-outline-300 overflow-hidden">
      <HStack space="sm" className="items-start p-3">
        {/* Thumbnail skeleton */}
        <Box className="w-40 shrink-0 rounded-lg overflow-hidden">
          <Box
            className="w-full bg-background-50 animate-pulse"
            style={{ paddingTop: "56.25%" }}
          />
        </Box>

        {/* Text skeletons */}
        <VStack className="flex-1 py-1" space="sm">
          <Box className="h-4 w-4/5 rounded-lg bg-background-50 animate-pulse" />
          <Box className="h-3 w-2/5 rounded-lg bg-background-50 animate-pulse" />
          <Box className="h-3 w-1/4 rounded-lg bg-background-50 animate-pulse" />
        </VStack>
      </HStack>
    </Box>
  );
}
