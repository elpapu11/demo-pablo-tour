import { useLanguage } from '../contexts/LanguageContext'
import { MapPin, Phone, Mail } from 'lucide-react'

const quickLinks = [
  { label: 'footer.link.tours', href: '#tours' },
  { label: 'footer.link.why', href: '#why' },
  { label: 'footer.link.faq', href: '#faq' },
  { label: 'footer.link.contact', href: '#contact' },
]

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer id="contact" className="w-full">
      <div className="bg-warm-900 pt-12 pb-8">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {/* Brand */}
            <div>
              <span className="font-sans font-bold text-[16px] tracking-[0.12em] text-white">
                {t('footer.brand') as string}
              </span>
              <p className="text-[14px] text-warm-400 leading-relaxed mt-3 max-w-[280px]">
                {t('footer.desc') as string}
              </p>
            </div>

            {/* Contact */}
            <div>
              <span className="block text-[12px] font-medium tracking-[0.08em] uppercase text-warm-400 mb-4">
                {t('footer.contact') as string}
              </span>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[14px] text-warm-300">
                  <MapPin className="w-4 h-4 text-warm-500 flex-shrink-0" />
                  {t('footer.address') as string}
                </div>
                <a
                  href="tel:+51941414048"
                  className="flex items-center gap-2 text-[14px] text-warm-300 hover:text-terracotta-light transition-colors"
                >
                  <Phone className="w-4 h-4 text-warm-500 flex-shrink-0" />
                  {t('footer.phone') as string}
                </a>
                <a
                  href="mailto:perupablotour@gmail.com"
                  className="flex items-center gap-2 text-[14px] text-warm-300 hover:text-terracotta-light transition-colors"
                >
                  <Mail className="w-4 h-4 text-warm-500 flex-shrink-0" />
                  {t('footer.email') as string}
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <span className="block text-[12px] font-medium tracking-[0.08em] uppercase text-warm-400 mb-4">
                {t('footer.links') as string}
              </span>
              <div className="space-y-2">
                {quickLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block text-[14px] text-warm-300 hover:text-terracotta-light transition-colors"
                  >
                    {t(link.label) as string}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-warm-700 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
            <span className="text-[13px] text-warm-500">
              {t('footer.copyright') as string}
            </span>
            <span className="text-[13px] text-warm-500">
              {t('footer.demo') as string}
            </span>
          </div>
        </div>
      </div>

      {/* Demo Banner */}
      <div className="bg-warm-800 py-3 px-6 text-center">
        <p className="text-[12px] text-warm-400 leading-relaxed">
          {t('demo.banner') as string}
        </p>
      </div>
    </footer>
  )
}
