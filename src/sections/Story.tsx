import { useEffect, useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Story() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const quote = sectionRef.current.querySelector('.story-quote')
    const paras = sectionRef.current.querySelectorAll('.story-p')
    const divider = sectionRef.current.querySelector('.story-divider')

    if (quote) {
      gsap.fromTo(quote, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true }
      })
    }
    if (divider) {
      gsap.fromTo(divider, { scaleX: 0 }, {
        scaleX: 1, duration: 0.6, delay: 0.3, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true }
      })
    }
    gsap.fromTo(paras, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true }
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === sectionRef.current) st.kill()
      })
    }
  }, [])

  useEffect(() => {
    if (!statsRef.current) return
    const counters = statsRef.current.querySelectorAll('.stat-number')
    const targets = ['1986', '40+', '3']

    counters.forEach((el, i) => {
      const target = targets[i]
      const isYear = target === '1986'
      const obj = { val: isYear ? 1950 : 0 }
      gsap.to(obj, {
        val: isYear ? 1986 : (i === 1 ? 40 : 3),
        duration: 1.2,
        delay: i * 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
          once: true,
        },
        onUpdate: () => {
          if (isYear) {
            el.textContent = 'Since ' + Math.round(obj.val)
          } else if (i === 1) {
            el.textContent = Math.round(obj.val) + '+ Years'
          } else {
            el.textContent = 'Trilingual'
          }
        },
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === statsRef.current) st.kill()
      })
    }
  }, [])

  return (
    <section ref={sectionRef} id="story" className="w-full bg-warm-800 py-20 md:py-32">
      <div className="max-w-[720px] mx-auto px-6 md:px-12 text-center">
        <span className="block text-[12px] font-medium tracking-[0.08em] uppercase text-terracotta-light mb-6">
          {t('story.label') as string}
        </span>

        <h2 className="story-quote font-display font-medium text-[28px] md:text-[44px] text-white leading-[1.2] opacity-0">
          {(t('story.quote') as string).split('legacy').map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && <span className="text-terracotta-light">legacy</span>}
            </span>
          ))}
        </h2>

        <div className="story-divider w-[60px] h-[2px] bg-terracotta mx-auto my-8 origin-left" />

        <p className="story-p text-[16px] md:text-[17px] text-warm-300 leading-relaxed max-w-[600px] mx-auto opacity-0">
          {t('story.p1') as string}
        </p>
        <p className="story-p text-[16px] md:text-[17px] text-warm-300 leading-relaxed max-w-[600px] mx-auto mt-5 opacity-0">
          {t('story.p2') as string}
        </p>

        <div ref={statsRef} className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mt-12">
          <div className="text-center">
            <div className="stat-number font-display font-medium text-[36px] text-white">
              {t('story.stat1') as string}
            </div>
            <span className="text-[13px] text-warm-400 uppercase tracking-[0.08em]">
              {t('story.stat1Label') as string}
            </span>
          </div>
          <div className="text-center">
            <div className="stat-number font-display font-medium text-[36px] text-white">
              {t('story.stat2') as string}
            </div>
            <span className="text-[13px] text-warm-400 uppercase tracking-[0.08em]">
              {t('story.stat2Label') as string}
            </span>
          </div>
          <div className="text-center">
            <div className="stat-number font-display font-medium text-[36px] text-white">
              {t('story.stat3') as string}
            </div>
            <span className="text-[13px] text-warm-400 uppercase tracking-[0.08em]">
              {t('story.stat3Label') as string}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
