"use client"

import CreationCard from "@/components/creation-card"

const SAMPLES = [
  {
    title: "Studio Portrait",
    description: "A stylized portrait converted into a 3D relief.",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&q=80",
  },
  {
    title: "Product Mockup",
    description: "A product photo textured into a model.",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
  },
  {
    title: "Landscape Scene",
    description: "A landscape image used for depth-based point cloud.",
    imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80",
  },
]

export default function CreationsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground p-8">
      <div className="container mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Creations</h1>
          <p className="mt-2 text-muted">Browse curated sample 3D creations generated from 2D imagery.</p>
        </header>

        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLES.map((s) => (
              <div key={s.title} className="glass-card p-2 rounded-lg">
                <CreationCard title={s.title} description={s.description} imageUrl={s.imageUrl} />
                <div className="mt-2 flex justify-between items-center">
                  <a href={`/creations/${encodeURIComponent(s.title)}.obj`} download className="text-sm text-blue-600 hover:underline">Download OBJ</a>
                  <a href={`/creations/${encodeURIComponent(s.title)}.gltf`} download className="text-sm text-blue-600 hover:underline">Download GLTF</a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
