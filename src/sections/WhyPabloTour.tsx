import { useEffect, useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { CheckCircle } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const featureKeys = ['why.f1', 'why.f2', 'why.f3', 'why.f4']

export default function WhyPabloTour() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !imageRef.current) return

    const textEls = textRef.current.querySelectorAll('.animate-in')
    gsap.fromTo(
      textEls,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      }
    )

    gsap.fromTo(
      imageRef.current,
      { clipPath: 'inset(100% 0 0 0)' },
      {
        clipPath: 'inset(0% 0 0 0)',
        duration: 1,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === sectionRef.current) st.kill()
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="w-full bg-warm-50 py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12 md:gap-16 items-center">
        {/* Text Column */}
        <div ref={textRef} className="flex-1 md:max-w-[55%]">
          <span className="animate-in block text-[12px] font-medium tracking-[0.08em] uppercase text-terracotta mb-3 opacity-0">
            {t('why.label') as string}
          </span>
          <h2 className="animate-in font-display font-medium text-[28px] md:text-[40px] text-warm-800 leading-[1.2] mb-6 opacity-0">
            {t('why.title') as string}
          </h2>
          <p className="animate-in text-[16px] md:text-[17px] text-warm-600 leading-relaxed max-w-[480px] mb-4 opacity-0">
            {t('why.p1') as string}
          </p>
          <p className="animate-in text-[16px] md:text-[17px] text-warm-600 leading-relaxed max-w-[480px] mb-8 opacity-0">
            {t('why.p2') as string}
          </p>

          <div className="space-y-3">
            {featureKeys.map((key) => (
              <div key={key} className="animate-in flex items-center gap-3 opacity-0">
                <CheckCircle className="w-[18px] h-[18px] text-sage flex-shrink-0" strokeWidth={2} />
                <span className="text-[15px] font-medium text-warm-700">
                  {t(key) as string}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Image Column */}
        <div ref={imageRef} className="flex-1 md:max-w-[45%]">
          <div className="rounded-[20px] overflow-hidden shadow-card">
            <img
              src="/images/cabanaconde-village.jpg"
              alt="Cabanaconde village aerial view"
              className="w-full aspect-[4/5] object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
