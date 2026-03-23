import { NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client"

export const runtime = "edge"

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "application/pdf",
]

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") ?? ""

  // Client-side upload: browser uploads directly to Vercel Blob using a short-lived token.
  // This bypasses the serverless function body-size limit for large photo files.
  if (!contentType.includes("multipart/form-data")) {
    const body = (await req.json()) as HandleUploadBody
    try {
      const jsonResponse = await handleUpload({
        body,
        request: req,
        onBeforeGenerateToken: async (_pathname) => ({
          allowedContentTypes: ALLOWED_TYPES,
          maximumSizeInBytes: 20 * 1024 * 1024, // 20 MB
          addRandomSuffix: true,
        }),
        onUploadCompleted: async () => {},
      })
      return NextResponse.json(jsonResponse)
    } catch (error) {
      return NextResponse.json(
        { error: (error as Error).message },
        { status: 400 }
      )
    }
  }

  // Server-side upload path — used by uploadOnboardingPDF (jsPDF output, always < 2 MB).
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null
    const category = formData.get("category") as string | null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "File type not allowed. Accepted: JPEG, PNG, WebP, HEIC, PDF." },
        { status: 400 }
      )
    }

    const timestamp = Date.now()
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_")
    const prefix = category ? `${category}/` : ""
    const pathname = `${prefix}${timestamp}-${sanitizedName}`

    const blob = await put(pathname, file, {
      access: "public",
      addRandomSuffix: true,
    })

    return NextResponse.json({ url: blob.url, pathname: blob.pathname })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { error: "Upload failed. Please try again." },
      { status: 500 }
    )
  }
}
