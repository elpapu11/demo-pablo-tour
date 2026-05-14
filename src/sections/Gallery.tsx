import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { X } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const images = [
  { src: '/images/hero-colca.jpg', alt: 'Colca Canyon panoramic view' },
  { src: '/images/condor-flying.jpg', alt: 'Andean condor in flight' },
  { src: '/images/sangalle-oasis.jpg', alt: 'Sangalle Oasis' },
  { src: '/images/cabanaconde-village.jpg', alt: 'Cabanaconde village' },
  { src: '/images/rafting-canyon.jpg', alt: 'Rafting through canyon' },
  { src: '/images/terraces-green.jpg', alt: 'Pre-Inca terraces' },
  { src: '/images/trek-bridge.jpg', alt: 'Trekking suspension bridge' },
  { src: '/images/vicunas.jpg', alt: 'Vicunas in the highlands' },
]

export default function Gallery() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [lightbox, setLightbox] = useState<number | null>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const items = sectionRef.current.querySelectorAll('.gallery-item')
    gsap.fromTo(items,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
      }
    )
    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === sectionRef.current) st.kill()
      })
    }
  }, [])

  return (
    <>
      <section ref={sectionRef} className="w-full bg-white py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-10">
            <span className="block text-[12px] font-medium tracking-[0.08em] uppercase text-terracotta mb-3">
              {t('gallery.label') as string}
            </span>
            <h2 className="font-display font-medium text-[28px] md:text-[40px] text-warm-800 leading-[1.2]">
              {t('gallery.title') as string}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {images.map((img, i) => (
              <div
                key={i}
                className="gallery-item relative aspect-square md:aspect-square overflow-hidden rounded-md cursor-pointer opacity-0 group"
                onClick={() => setLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={images[lightbox].src}
            alt={images[lightbox].alt}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
