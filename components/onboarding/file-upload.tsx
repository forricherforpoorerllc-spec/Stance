"use client"

import React, { useState, useRef, useCallback } from "react"
import { Upload, Camera, X, FileText, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { upload } from "@vercel/blob/client"

interface FileUploadProps {
  label: string
  description: string
  accept?: string
  maxSizeMb?: number
  onFileUploaded: (url: string, fileName: string) => void
  uploadedUrl?: string
  uploadedName?: string
}

export function FileUpload({
  label,
  description,
  accept = "image/jpeg,image/png,application/pdf",
  maxSizeMb = 10,
  onFileUploaded,
  uploadedUrl,
  uploadedName,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState("")
  // If the component mounts with an already-uploaded image URL, use it as the preview
  const [preview, setPreview] = useState<string | null>(
    uploadedUrl && /\.(jpe?g|png|webp|heic)$/i.test(uploadedUrl) ? uploadedUrl : null
  )
  const [fileName, setFileName] = useState("")
  const [fileSize, setFileSize] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const cameraRef = useRef<HTMLInputElement>(null)

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / 1048576).toFixed(1) + " MB"
  }

  const processFile = useCallback(
    async (file: File) => {
      setError("")

      // Validate size
      if (file.size > maxSizeMb * 1024 * 1024) {
        setError(`File must be under ${maxSizeMb}MB`)
        return
      }

      // Validate type
      const validTypes = accept.split(",").map((t) => t.trim())
      if (!validTypes.includes(file.type) && file.type !== "") {
        setError(`Invalid file type. Accepted: ${validTypes.map((t) => t.split("/").pop()?.toUpperCase()).join(", ")}.`)
        return
      }

      setIsUploading(true)
      setFileName(file.name)
      setFileSize(formatBytes(file.size))

      // Generate preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => setPreview(e.target?.result as string)
        reader.readAsDataURL(file)
      } else {
        setPreview(null)
      }

      try {
        const blob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/upload",
          multipart: file.size > 5 * 1024 * 1024,
        })
        onFileUploaded(blob.url, file.name)
      } catch {
        setError("Upload failed. Please try again.")
        setPreview(null)
        setFileName("")
      } finally {
        setIsUploading(false)
      }
    },
    [accept, maxSizeMb, onFileUploaded]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) processFile(file)
    },
    [processFile]
  )

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) processFile(file)
    },
    [processFile]
  )

  const removeFile = () => {
    setPreview(null)
    setFileName("")
    setFileSize("")
    setError("")
    onFileUploaded("", "")
    if (inputRef.current) inputRef.current.value = ""
    if (cameraRef.current) cameraRef.current.value = ""
  }

  const isUploaded = !!uploadedUrl

  // ── Uploaded state ──
  if (isUploaded) {
    return (
      <div>
        <p className="text-base text-slate-700 font-semibold mb-2">{label}</p>
        <div className="border-2 border-green-300 bg-green-50 p-4 rounded-2xl">
          <div className="flex items-center gap-4">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="Uploaded file"
                className="w-16 h-16 object-cover rounded-xl border-2 border-green-200"
              />
            ) : (
              <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200">
                <FileText className="w-6 h-6 text-slate-500" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-base text-slate-900 font-semibold truncate">
                {uploadedName || fileName}
              </p>
              {fileSize && (
                <p className="text-sm text-slate-500">{fileSize}</p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-600" />
              <button
                onClick={removeFile}
                className="text-slate-400 hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Upload state ──
  return (
    <div>
      <p className="text-base text-slate-700 font-semibold mb-1">{label}</p>
      <p className="text-sm text-slate-600 mb-4">{description}</p>

      {error && (
        <div className="text-red-600 text-sm mb-3 bg-red-50 border border-red-200 px-3 py-2 rounded-lg font-medium">
          {error}
        </div>
      )}

      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl transition-all cursor-pointer p-8 text-center ${
          isDragging
            ? "border-red-500 bg-red-50"
            : "border-slate-300 bg-slate-50 hover:border-slate-400 hover:bg-slate-100"
        }`}
      >
        {isUploading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
            <p className="text-sm text-slate-600 font-medium">Uploading {fileName}...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <Upload className="w-8 h-8 text-slate-500" />
            <div>
              <p className="text-base text-slate-700 font-medium">
                Drag and drop or click to browse
              </p>
              <p className="text-sm text-slate-500 mt-1">
                JPG, PNG, or PDF — max {maxSizeMb}MB
              </p>
            </div>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Camera button for mobile */}
      <div className="mt-3 sm:hidden">
        <Button
          variant="outline"
          className="w-full border-slate-300 text-slate-700 hover:bg-slate-100 h-12 rounded-xl text-base font-medium"
          onClick={() => cameraRef.current?.click()}
        >
          <Camera className="w-4 h-4 mr-2" />
          Take Photo
        </Button>
        <input
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  )
}
