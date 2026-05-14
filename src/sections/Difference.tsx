import { useEffect, useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { Mountain, Home, PackageCheck } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cardIcons = [Mountain, Home, PackageCheck]
const cardKeys = [
  { title: 'diff.card1.title', desc: 'diff.card1.desc' },
  { title: 'diff.card2.title', desc: 'diff.card2.desc' },
  { title: 'diff.card3.title', desc: 'diff.card3.desc' },
]

export default function Difference() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !imageRef.current || !textRef.current) return

    gsap.fromTo(imageRef.current,
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1, ease: 'power3.inOut',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true }
      }
    )

    const textEls = textRef.current.querySelectorAll('.diff-animate')
    gsap.fromTo(textEls, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true }
    })

    const cards = textRef.current.querySelectorAll('.diff-card')
    gsap.fromTo(cards, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: cards[0], start: 'top 85%', once: true }
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === sectionRef.current) st.kill()
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="w-full bg-warm-50 py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col-reverse md:flex-row gap-12 md:gap-16 items-center">
        {/* Image Column */}
        <div ref={imageRef} className="flex-1 md:max-w-[45%]">
          <div className="rounded-[20px] overflow-hidden shadow-card">
            <img
              src="/images/vicunas.jpg"
              alt="Vicunas in the Andean highlands"
              className="w-full aspect-square object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Text Column */}
        <div ref={textRef} className="flex-1 md:max-w-[55%]">
          <span className="diff-animate block text-[12px] font-medium tracking-[0.08em] uppercase text-terracotta mb-3 opacity-0">
            {t('diff.label') as string}
          </span>
          <h2 className="diff-animate font-display font-medium text-[28px] md:text-[40px] text-warm-800 leading-[1.2] mb-6 opacity-0">
            {t('diff.title') as string}
          </h2>
          <p className="diff-animate text-[16px] md:text-[17px] text-warm-600 leading-relaxed max-w-[480px] mb-8 opacity-0">
            {t('diff.body') as string}
          </p>

          <div className="space-y-3">
            {cardKeys.map((key, i) => {
              const Icon = cardIcons[i]
              return (
                <div key={key.title} className="diff-card bg-white border border-warm-200 rounded-xl p-5 opacity-0">
                  <Icon className="w-8 h-8 text-terracotta mb-3" strokeWidth={1.5} />
                  <h3 className="font-sans font-semibold text-[16px] text-warm-700 mb-1">
                    {t(key.title) as string}
                  </h3>
                  <p className="text-[14px] text-warm-500 leading-relaxed">
                    {t(key.desc) as string}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
