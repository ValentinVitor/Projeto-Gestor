import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"

export default function AspectRatioDemo() {
  return (
    <AspectRatio ratio={16 / 9} className="bg-muted">
      <Image
        src="/imagemNext.jpeg"
        alt="Photo by Drew Beamer"
        fill
        className="rounded-md object-cover"
      />
    </AspectRatio>
  )
}
