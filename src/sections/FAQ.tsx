import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { ChevronDown } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const faqKeys = Array.from({ length: 8 }, (_, i) => ({
  q: `faq.q${i + 1}`,
  a: `faq.a${i + 1}`,
}))

export default function FAQ() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const items = sectionRef.current.querySelectorAll('.faq-item')
    gsap.fromTo(items,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
      }
    )
    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === sectionRef.current) st.kill()
      })
    }
  }, [])

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section ref={sectionRef} id="faq" className="w-full bg-warm-50 py-16 md:py-24">
      <div className="max-w-[800px] mx-auto px-6 md:px-12">
        <div className="text-center mb-10">
          <span className="block text-[12px] font-medium tracking-[0.08em] uppercase text-terracotta mb-3">
            {t('faq.label') as string}
          </span>
          <h2 className="font-display font-medium text-[28px] md:text-[40px] text-warm-800 leading-[1.2]">
            {t('faq.title') as string}
          </h2>
        </div>

        <div className="mt-10">
          {faqKeys.map((key, i) => (
            <div key={i} className="faq-item border-b border-warm-200 opacity-0">
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span className="font-sans font-semibold text-[15px] md:text-[16px] text-warm-700 pr-4 group-hover:text-terracotta transition-colors">
                  {t(key.q) as string}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-warm-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className="overflow-hidden transition-all duration-300 ease-out"
                style={{
                  maxHeight: openIndex === i ? '300px' : '0',
                  opacity: openIndex === i ? 1 : 0,
                }}
              >
                <p className="text-[14px] md:text-[15px] text-warm-600 leading-[1.65] pb-5 max-w-[640px]">
                  {t(key.a) as string}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
