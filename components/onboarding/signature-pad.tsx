"use client"

import React, { useRef, useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Eraser } from "lucide-react"

interface SignaturePadProps {
  contractorName: string
  onSignatureComplete: (signatureDataUrl: string) => void
  onAcknowledge: (acknowledged: boolean) => void
  isAcknowledged: boolean
  signatureDataUrl?: string
}

export function SignaturePad({
  contractorName,
  onSignatureComplete,
  onAcknowledge,
  isAcknowledged,
  signatureDataUrl,
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasDrawn, setHasDrawn] = useState(false)
  const hasDrawnRef = useRef(false) // mirrors hasDrawn for use inside event closures
  const [typedName, setTypedName] = useState("")
  const [activeTab, setActiveTab] = useState<string>("draw")
  const lastPos = useRef<{ x: number; y: number } | null>(null)

  // Resize canvas to parent
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    const dpr = window.devicePixelRatio || 1
    const rect = parent.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.scale(dpr, dpr)
      ctx.strokeStyle = "#1f2937"
      ctx.lineWidth = 2
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
    }
  }, [])

  useEffect(() => {
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    return () => window.removeEventListener("resize", resizeCanvas)
  }, [resizeCanvas])

  const getPos = (e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()

    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      }
    }
    return {
      x: (e as React.MouseEvent).clientX - rect.left,
      y: (e as React.MouseEvent).clientY - rect.top,
    }
  }

  const startDraw = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault()
    setIsDrawing(true)
    lastPos.current = getPos(e)
  }

  const draw = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDrawing || !lastPos.current) return
    e.preventDefault()

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!ctx) return

    const pos = getPos(e)
    ctx.beginPath()
    ctx.moveTo(lastPos.current.x, lastPos.current.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
    lastPos.current = pos
    if (!hasDrawnRef.current) {
      hasDrawnRef.current = true
      setHasDrawn(true)
    }
  }

  const endDraw = () => {
    setIsDrawing(false)
    lastPos.current = null

    if (hasDrawnRef.current && canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL("image/png")
      onSignatureComplete(dataUrl)
    }
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!ctx || !canvas) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    hasDrawnRef.current = false
    setHasDrawn(false)
    onSignatureComplete("")
  }

  // Type-to-sign: generate signature image from typed name
  const generateTypedSignature = useCallback(
    (name: string) => {
      if (!name.trim()) {
        onSignatureComplete("")
        return
      }

      const canvas = document.createElement("canvas")
      const dpr = window.devicePixelRatio || 1
      canvas.width = 600 * dpr
      canvas.height = 150 * dpr

      const ctx = canvas.getContext("2d")
      if (!ctx) return
      ctx.scale(dpr, dpr)

      ctx.fillStyle = "transparent"
      ctx.fillRect(0, 0, 600, 150)

      ctx.fillStyle = "#1f2937"
      ctx.font = "italic 48px 'Georgia', 'Times New Roman', serif"
      ctx.textBaseline = "middle"
      ctx.fillText(name, 20, 75)

      onSignatureComplete(canvas.toDataURL("image/png"))
    },
    [onSignatureComplete]
  )

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-slate-200 border border-slate-300 mb-6 w-full sm:w-auto">
          <TabsTrigger
            value="draw"
            className="data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-sm flex-1 sm:flex-none text-slate-600 font-medium"
          >
            Draw
          </TabsTrigger>
          <TabsTrigger
            value="type"
            className="data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-sm flex-1 sm:flex-none text-slate-600 font-medium"
          >
            Type
          </TabsTrigger>
        </TabsList>

        <TabsContent value="draw">
          <div className="relative border-2 border-slate-300 bg-white rounded-2xl overflow-hidden shadow-sm" style={{ height: "240px" }}>
            {/* Signature line */}
            <div className="absolute bottom-16 left-8 right-8 border-b-2 border-slate-300" />
            <p className="absolute bottom-6 left-8 text-sm text-slate-500 font-medium">
              Sign above this line
            </p>

            <canvas
              ref={canvasRef}
              className="absolute inset-0 cursor-crosshair touch-none"
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={endDraw}
              onMouseLeave={endDraw}
              onTouchStart={startDraw}
              onTouchMove={draw}
              onTouchEnd={endDraw}
            />

            {!hasDrawn && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-slate-400 text-base">
                  Draw your signature here
                </p>
              </div>
            )}
          </div>
          <div className="flex justify-end mt-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCanvas}
              disabled={!hasDrawn}
              className="text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            >
              <Eraser className="w-3.5 h-3.5 mr-1.5" />
              Clear
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="type">
          <div className="space-y-4">
            <div>
              <Label className="text-base text-slate-700 mb-2 block font-semibold">
                Type your full legal name
              </Label>
              <Input
                value={typedName}
                onChange={(e) => {
                  setTypedName(e.target.value)
                  generateTypedSignature(e.target.value)
                }}
                placeholder={contractorName || "Your legal name"}
                className="bg-white border border-slate-300 text-slate-900 h-12 rounded-xl text-base shadow-sm focus:border-red-400 focus:ring-2 focus:ring-red-100 placeholder:text-slate-400"
              />
            </div>

            {/* Preview */}
            {typedName && (
              <div className="border-2 border-slate-200 bg-slate-50 p-6 min-h-[120px] flex items-center rounded-2xl">
                <p
                  className="text-slate-900 text-4xl md:text-5xl italic"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  {typedName}
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Signature preview if already signed */}
      {signatureDataUrl && (
        <div className="mt-6 border-2 border-slate-200 bg-slate-50 p-5 rounded-2xl">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Your Signature
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={signatureDataUrl}
            alt="Your signature"
            className="max-h-20 w-auto"
          />
        </div>
      )}

      {/* Acknowledgment — amber when unchecked, green when checked */}
      <div className={`mt-8 border-2 p-6 rounded-2xl transition-all ${
        isAcknowledged
          ? "border-green-400 bg-green-50"
          : "border-amber-300 bg-amber-50"
      }`}>
        <div className="flex items-start gap-3">
          <Checkbox
            id="acknowledge"
            checked={isAcknowledged}
            onCheckedChange={(checked) => onAcknowledge(checked === true)}
            className={`mt-0.5 h-5 w-5 rounded border-2 transition-all ${
              isAcknowledged
                ? "border-green-500 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-white"
                : "border-amber-400"
            }`}
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              {!isAcknowledged && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-200 text-amber-800">Required to continue</span>
              )}
              {isAcknowledged && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-200 text-green-800">Acknowledged ✓</span>
              )}
            </div>
            <Label
              htmlFor="acknowledge"
              className={`text-sm leading-relaxed cursor-pointer font-medium ${
                isAcknowledged ? "text-green-800" : "text-amber-900"
              }`}
            >
              I acknowledge that this constitutes my electronic signature and
              express my intent to sign this Independent Contractor Agreement as
              described in Section 15 (Electronic Records and Signatures) and
              Section 17 (Contractor Acknowledgments). I confirm that I have read
              and understood this Agreement in its entirety.
            </Label>
          </div>
        </div>
      </div>
    </div>
  )
}
