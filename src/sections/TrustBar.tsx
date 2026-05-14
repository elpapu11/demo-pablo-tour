import { useEffect, useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { MapPin, Calendar, Globe, Users } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const icons = [MapPin, Calendar, Globe, Users]
const keys = ['trust.local', 'trust.since', 'trust.languages', 'trust.private']

export default function TrustBar() {
  const { t } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const items = ref.current.querySelectorAll('.trust-item')
    gsap.fromTo(
      items,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          once: true,
        },
      }
    )
    return () => { ScrollTrigger.getAll().forEach(st => { if (st.trigger === ref.current) st.kill() }) }
  }, [])

  return (
    <div ref={ref} className="w-full bg-white border-b border-warm-200 py-6 md:py-8">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-wrap items-center justify-center gap-6 md:gap-12">
        {keys.map((key, i) => {
          const Icon = icons[i]
          return (
            <div key={key} className="trust-item flex items-center gap-2 opacity-0">
              <Icon className="w-5 h-5 text-sage flex-shrink-0" strokeWidth={1.5} />
              <span className="text-[14px] text-warm-600 font-normal whitespace-nowrap">
                {t(key) as string}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
