import sharp from "sharp"
import fs from "fs"
import path from "path"

export async function optimizeImages(directory: string) {
  try {
    const files = fs.readdirSync(directory)

    for (const file of files) {
      const filePath = path.join(directory, file)
      const stats = fs.statSync(filePath)

      if (stats.isDirectory()) {
        await optimizeImages(filePath)
      } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
        const outputWebp = filePath.replace(/\.(jpg|jpeg|png)$/i, ".webp")
        const outputAvif = filePath.replace(/\.(jpg|jpeg|png)$/i, ".avif")

        await sharp(filePath).webp({ quality: 80 }).toFile(outputWebp)

        await sharp(filePath).avif({ quality: 65 }).toFile(outputAvif)
      }
    }
  } catch (error) {
    console.error("Error optimizing images:", error)
  }
}
