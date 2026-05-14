import { useEffect, useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { ChevronDown, MessageCircle } from 'lucide-react'
import * as THREE from 'three'

const WHATSAPP_URL = 'https://wa.me/51941414048?text=Hi%20Pablo%20Tour%2C%20I%27m%20interested%20in%20a%20Colca%20Canyon%20tour.%20My%20travel%20dates%20are%3A%20_____.%20Could%20you%20recommend%20the%20best%20option%3F'

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

const fragmentShader = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform vec2 uLensCenter;
uniform float uLensRadius;
uniform float uEdgeFade;
uniform vec3 uColorTint;
uniform float uDistortionStrength;
uniform float uTime;
uniform float uVignette;

vec2 barrelDistort(vec2 uv, float strength) {
  vec2 delta = uv - vec2(0.5);
  float deltaSq = dot(delta, delta);
  return uv + delta * (deltaSq * strength);
}

float edgeBlur(vec2 uv, float edgeFade) {
  vec2 absUV = abs(uv - 0.5) * 2.0;
  float maxDist = max(absUV.x, absUV.y);
  return 1.0 - smoothstep(edgeFade, 1.0, maxDist);
}

vec3 chromatic(vec2 uv, float strength) {
  vec2 d = uv - uLensCenter;
  float dLen = length(d);
  float dLenSq = dLen * dLen;
  vec2 redOffset = uv + d * (dLenSq * strength * 1.5);
  vec2 greenOffset = uv + d * (dLenSq * strength * 1.0);
  vec2 blueOffset = uv + d * (dLenSq * strength * 0.5);
  float r = texture2D(uTexture, redOffset).r;
  float g = texture2D(uTexture, greenOffset).g;
  float b = texture2D(uTexture, blueOffset).b;
  return vec3(r, g, b);
}

void main() {
  vec2 aspectUV = vec2(uResolution.x / uResolution.y, 1.0);
  vec2 distUV = (vUv - uLensCenter) * aspectUV;
  float distLen = length(distUV);
  float lensMask = 1.0 - smoothstep(uLensRadius * 0.5, uLensRadius, distLen);
  float outerMask = smoothstep(uLensRadius, uLensRadius * 1.5, distLen);
  vec2 baseUV = barrelDistort(vUv, uDistortionStrength * 0.1);
  vec3 chromColor = chromatic(baseUV, uDistortionStrength * lensMask);
  vec4 texColor = texture2D(uTexture, vUv);
  vec3 finalColor = texColor.rgb;
  finalColor = mix(finalColor, chromColor * uColorTint, lensMask * 0.5);
  float blurMask = edgeBlur(vUv, uEdgeFade) * outerMask;
  vec3 blurColor = mix(finalColor, texColor.rgb * uColorTint, 0.3);
  finalColor = mix(finalColor, blurColor, blurMask);
  float radial = length(vUv - 0.5);
  float vig = 1.0 - smoothstep(0.5, 1.5, radial * uVignette);
  finalColor *= vig;
  float alpha = smoothstep(0.0, 0.05, vig);
  gl_FragColor = vec4(finalColor, alpha);
}
`

export default function Hero() {
  const { lang, setLang, t } = useLanguage()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  useEffect(() => {
    if (isMobile) return
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
    const dpr = Math.min(window.devicePixelRatio, 2)
    renderer.setPixelRatio(dpr)
    renderer.setSize(container.clientWidth, container.clientHeight, false)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const pointer = { x: container.clientWidth / 2, y: container.clientHeight / 2 }

    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load('/images/hero-colca.jpg')
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0.0 },
        uTexture: { value: texture },
        uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
        uLensCenter: { value: new THREE.Vector2(0.5, 0.5) },
        uLensRadius: { value: 0.28 },
        uEdgeFade: { value: 0.85 },
        uColorTint: { value: new THREE.Vector3(0.76, 0.48, 0.36) },
        uDistortionStrength: { value: 0.2 },
        uVignette: { value: 1.2 },
      },
      transparent: true,
    })

    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
    }
    canvas.addEventListener('pointermove', handlePointerMove)

    const handleResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      if (canvas.width === w * dpr && canvas.height === h * dpr) return
      renderer.setSize(w, h, false)
      material.uniforms.uResolution.value.set(w, h)
    }
    window.addEventListener('resize', handleResize)

    const clock = new THREE.Clock()
    let rafId: number
    let isVisible = true

    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting },
      { threshold: 0.1 }
    )
    observer.observe(container)

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      if (!isVisible) return
      material.uniforms.uTime.value = clock.getElapsedTime()
      material.uniforms.uLensCenter.value.set(
        pointer.x / material.uniforms.uResolution.value.x,
        1.0 - (pointer.y / material.uniforms.uResolution.value.y)
      )
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      canvas.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      texture.dispose()
    }
  }, [isMobile])

  const scrollToTours = () => {
    const el = document.getElementById('tours')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" ref={containerRef} className="relative w-full min-h-[100dvh] overflow-hidden">
      {/* Background */}
      {isMobile ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/hero-colca.jpg)',
            backgroundPosition: '50% 40%',
          }}
        />
      ) : (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ display: 'block' }}
        />
      )}

      {/* Overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 45%, rgba(42,28,21,0.45) 0%, rgba(42,28,21,0.65) 100%)',
        }}
      />

      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-[72px]">
        <span className="font-sans font-bold text-[16px] tracking-[0.12em] text-white opacity-0 animate-fade-in"
          style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          {t('nav.brand') as string}
        </span>
        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <div className="flex items-center rounded-full bg-white/15 backdrop-blur-md px-1 py-1 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded-full text-[13px] font-medium transition-colors duration-200 ${
                lang === 'en' ? 'bg-terracotta text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('es')}
              className={`px-3 py-1 rounded-full text-[13px] font-medium transition-colors duration-200 ${
                lang === 'es' ? 'bg-terracotta text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              ES
            </button>
          </div>
          {/* WhatsApp icon */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-whatsapp flex items-center justify-center shadow-lg opacity-0 animate-fade-in hover:scale-105 transition-transform"
            style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
          >
            <MessageCircle className="w-5 h-5 text-white" />
          </a>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-6 text-center">
        <span
          className="text-[12px] font-medium tracking-[0.12em] uppercase text-terracotta-light opacity-0"
          style={{
            animation: 'fadeInUp 0.6s ease-out 0.2s forwards',
          }}
        >
          {t('hero.label') as string}
        </span>

        <h1
          className="font-display font-medium text-[34px] md:text-[56px] text-white leading-[1.15] max-w-[700px] mt-4 opacity-0"
          style={{
            textShadow: '0 2px 30px rgba(0,0,0,0.3)',
            animation: 'fadeInUp 0.8s ease-out 0.4s forwards',
          }}
        >
          {t('hero.title') as string}
        </h1>

        <p
          className="text-white/85 text-[16px] md:text-[18px] max-w-[560px] mt-4 leading-relaxed opacity-0"
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.6s forwards',
          }}
        >
          {t('hero.subtitle') as string}
        </p>

        <div
          className="flex flex-col sm:flex-row items-center gap-4 mt-10 opacity-0"
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.8s forwards',
          }}
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-whatsapp hover:bg-whatsapp-dark text-white font-semibold text-[15px] rounded-full px-8 py-4 transition-all duration-200 hover:scale-[1.03] shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            {t('hero.cta.primary') as string}
          </a>
          <button
            onClick={scrollToTours}
            className="inline-flex items-center gap-2 bg-transparent border-[1.5px] border-white/40 hover:border-white/60 text-white font-semibold text-[15px] rounded-full px-8 py-4 transition-all duration-200 hover:bg-white/10"
          >
            {t('hero.cta.secondary') as string}
          </button>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0"
          style={{
            animation: 'fadeIn 0.6s ease-out 1.2s forwards',
          }}
        >
          <ChevronDown className="w-8 h-8 text-white/40 animate-bounce-subtle" />
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  )
}
