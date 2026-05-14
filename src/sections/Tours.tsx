import { useEffect, useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { Activity, Users, Star } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WHATSAPP_URL = 'https://wa.me/51941414048?text=Hi%20Pablo%20Tour%2C%20I%27m%20interested%20in%20a%20Colca%20Canyon%20tour.%20My%20travel%20dates%20are%3A%20_____.%20Could%20you%20recommend%20the%20best%20option%3F'

interface TourData {
  img: string
  badge: string
  titleKey: string
  subtitleKey: string
  descKey: string
  metaKey: string
  popular?: boolean
}

const tours: TourData[] = [
  { img: '/images/trek-bridge.jpg', badge: 'tour.1.badge', titleKey: 'tour.1.title', subtitleKey: 'tour.1.subtitle', descKey: 'tour.1.desc', metaKey: 'tour.1.meta' },
  { img: '/images/sangalle-oasis.jpg', badge: 'tour.2.badge', titleKey: 'tour.2.title', subtitleKey: 'tour.2.subtitle', descKey: 'tour.2.desc', metaKey: 'tour.2.meta', popular: true },
  { img: '/images/canyon-deep.jpg', badge: 'tour.3.badge', titleKey: 'tour.3.title', subtitleKey: 'tour.3.subtitle', descKey: 'tour.3.desc', metaKey: 'tour.3.meta' },
  { img: '/images/terraces-green.jpg', badge: 'tour.4.badge', titleKey: 'tour.4.title', subtitleKey: 'tour.4.subtitle', descKey: 'tour.4.desc', metaKey: 'tour.4.meta' },
  { img: '/images/mountain-biking.jpg', badge: 'tour.5.badge', titleKey: 'tour.5.title', subtitleKey: 'tour.5.subtitle', descKey: 'tour.5.desc', metaKey: 'tour.5.meta' },
  { img: '/images/rafting-canyon.jpg', badge: 'tour.6.badge', titleKey: 'tour.6.title', subtitleKey: 'tour.6.subtitle', descKey: 'tour.6.desc', metaKey: 'tour.6.meta' },
]

export default function Tours() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return

    const headerEls = sectionRef.current.querySelectorAll('.header-animate')
    gsap.fromTo(
      headerEls,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      }
    )

    const cards = cardsRef.current.querySelectorAll('.tour-card')
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', once: true },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === sectionRef.current || st.trigger === cardsRef.current) st.kill()
      })
    }
  }, [])

  return (
    <section ref={sectionRef} id="tours" className="w-full bg-white py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <span className="header-animate block text-[12px] font-medium tracking-[0.08em] uppercase text-terracotta mb-3 opacity-0">
          {t('tours.label') as string}
        </span>
        <h2 className="header-animate font-display font-medium text-[28px] md:text-[40px] text-warm-800 leading-[1.2] mb-3 opacity-0">
          {t('tours.title') as string}
        </h2>
        <p className="header-animate text-[16px] text-warm-500 leading-relaxed max-w-[520px] opacity-0">
          {t('tours.subtitle') as string}
        </p>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {tours.map((tour, i) => (
            <div
              key={i}
              className="tour-card group bg-warm-50 border border-warm-200 rounded-xl overflow-hidden opacity-0 transition-shadow duration-300 hover:shadow-card-hover"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={tour.img}
                  alt={t(tour.titleKey) as string}
                  className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                {tour.popular && (
                  <div className="absolute top-3 left-3 flex items-center gap-1 bg-amber-400 text-warm-900 text-[11px] font-semibold px-2 py-1 rounded-full">
                    <Star className="w-3 h-3" />
                    {t('tour.popular') as string}
                  </div>
                )}
              </div>
              <div className="p-6">
                <span className="inline-block text-[11px] font-medium tracking-[0.06em] uppercase bg-terracotta/10 text-terracotta rounded-full px-3 py-1 mb-3">
                  {t(tour.badge) as string}
                </span>
                <h3 className="font-sans font-semibold text-[18px] md:text-[20px] text-warm-800 mb-1">
                  {t(tour.titleKey) as string}
                </h3>
                <p className="text-[14px] text-warm-500 mb-3">
                  {t(tour.subtitleKey) as string}
                </p>
                <p className="text-[14px] text-warm-600 leading-[1.6] mb-4 line-clamp-3">
                  {t(tour.descKey) as string}
                </p>
                <div className="flex items-center gap-4 mb-5">
                  <span className="flex items-center gap-1 text-[13px] text-warm-500">
                    <Activity className="w-3.5 h-3.5 text-sage" />
                    {(t(tour.metaKey) as string).split(' · ')[0]}
                  </span>
                  <span className="flex items-center gap-1 text-[13px] text-warm-500">
                    <Users className="w-3.5 h-3.5 text-sage" />
                    {(t(tour.metaKey) as string).split(' · ')[1]}
                  </span>
                </div>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-warm-100 text-warm-700 font-medium text-[14px] rounded-md py-3 transition-colors duration-200 hover:bg-terracotta hover:text-white"
                >
                  {t('tour.ask') as string}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
