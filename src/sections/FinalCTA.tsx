import { useEffect, useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { MessageCircle } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WHATSAPP_URL = 'https://wa.me/51941414048?text=Hi%20Pablo%20Tour%2C%20I%27m%20interested%20in%20a%20Colca%20Canyon%20tour.%20My%20travel%20dates%20are%3A%20_____.%20Could%20you%20recommend%20the%20best%20option%3F'

export default function FinalCTA() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const els = sectionRef.current.querySelectorAll('.cta-animate')
    gsap.fromTo(els,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out',
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
    <section ref={sectionRef} className="w-full bg-terracotta py-16 md:py-20">
      <div className="max-w-[600px] mx-auto px-6 md:px-12 text-center">
        <h2 className="cta-animate font-display font-medium text-[32px] md:text-[44px] text-white leading-[1.2] opacity-0">
          {t('cta.title') as string}
        </h2>
        <p className="cta-animate text-[16px] md:text-[17px] text-white/85 leading-relaxed mt-4 opacity-0">
          {t('cta.body') as string}
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-animate inline-flex items-center gap-2 bg-white text-terracotta font-semibold text-[16px] rounded-full px-10 py-[18px] mt-8 transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] opacity-0"
        >
          <MessageCircle className="w-[22px] h-[22px]" />
          {t('cta.button') as string}
        </a>
        <p className="cta-animate text-[14px] text-white/60 mt-4 opacity-0">
          {t('cta.email') as string}{' '}
          <a href="mailto:perupablotour@gmail.com" className="underline hover:text-white transition-colors">
            perupablotour@gmail.com
          </a>
        </p>
      </div>
    </section>
  )
}
