import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'

const WHATSAPP_URL = 'https://wa.me/51941414048?text=Hi%20Pablo%20Tour%2C%20I%27m%20interested%20in%20a%20Colca%20Canyon%20tour.%20My%20travel%20dates%20are%3A%20_____.%20Could%20you%20recommend%20the%20best%20option%3F'

export default function StickyWhatsApp() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-5 right-5 z-[100] w-14 h-14 rounded-full bg-whatsapp flex items-center justify-center shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-all duration-300 hover:scale-[1.08] md:hidden ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  )
}
