"use client"

import React from "react"
import Image from "next/image"
import { Dialog, DialogTrigger, DialogContent, DialogOverlay, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import ModelViewer from "@/components/model-viewer"

interface CreationCardProps {
  title: string
  description?: string
  imageUrl: string
}

export default function CreationCard({ title, description, imageUrl }: CreationCardProps) {
  return (
    <Dialog>
      <div className="rounded-lg overflow-hidden shadow-lg bg-card/80 backdrop-blur-sm border border-border">
        <DialogTrigger asChild>
          <button className="w-full h-48 relative group">
            {/* Use next/image where possible; fallback to img tag in ModelViewer */}
            <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            <div className="absolute left-3 bottom-3 bg-black/40 text-white px-3 py-1 rounded-md text-sm">{title}</div>
          </button>
        </DialogTrigger>
      </div>

      <DialogContent className="max-w-4xl w-full">
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}

        <div className="mt-4 h-[60vh]">
          <ModelViewer imageUrl={imageUrl} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
