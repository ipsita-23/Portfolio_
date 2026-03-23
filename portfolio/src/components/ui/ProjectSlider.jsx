import { useState, useRef, useCallback } from 'react'
import './ProjectSlider.css'

function Slide({ slide, current, index, onSlideClick }) {
  const slideRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const el = slideRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--x', e.clientX - (r.left + Math.floor(r.width / 2)))
    el.style.setProperty('--y', e.clientY - (r.top + Math.floor(r.height / 2)))
  }, [])

  const handleMouseLeave = useCallback(() => {
    const el = slideRef.current
    if (!el) return
    el.style.setProperty('--x', 0)
    el.style.setProperty('--y', 0)
  }, [])

  const handleImageLoad = useCallback((e) => {
    e.target.style.opacity = 1
  }, [])

  let classNames = 'project-slide'
  if (current === index) classNames += ' project-slide--current'
  else if (current - 1 === index) classNames += ' project-slide--previous'
  else if (current + 1 === index) classNames += ' project-slide--next'

  return (
    <li
      ref={slideRef}
      className={classNames}
      onClick={() => onSlideClick(index)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-slide__image-wrapper">
        <img
          className="project-slide__image"
          alt={slide.name}
          src={slide.image}
          onLoad={handleImageLoad}
        />
      </div>

      <article className="project-slide__content">
        <p className="project-slide__tag">{slide.tag}</p>
        <h2 className="project-slide__headline">{slide.name}</h2>
        <p className="project-slide__tech">{slide.techStack?.join(' · ')}</p>
        {slide.links?.github && slide.links.github !== '#' && (
          <a
            href={slide.links.github}
            target="_blank"
            rel="noreferrer"
            className="project-slide__action"
            onClick={(e) => e.stopPropagation()}
          >
            View on GitHub ↗
          </a>
        )}
      </article>
    </li>
  )
}

function SliderControl({ type, title, onClick }) {
  return (
    <button className={`slider-btn slider-btn--${type}`} title={title} onClick={onClick}>
      <svg viewBox="0 0 24 24">
        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
      </svg>
    </button>
  )
}

export default function ProjectSlider({ slides = [] }) {
  const [current, setCurrent] = useState(Math.min(1, slides.length - 1))

  const handlePrevious = useCallback(() => {
    setCurrent((prev) => (prev <= 0 ? slides.length - 1 : prev - 1))
  }, [slides.length])

  const handleNext = useCallback(() => {
    setCurrent((prev) => (prev >= slides.length - 1 ? 0 : prev + 1))
  }, [slides.length])

  const handleSlideClick = useCallback((index) => {
    if (current !== index) setCurrent(index)
  }, [current])

  const wrapperStyle = {
    transform: `translateX(-${current * (100 / slides.length)}%)`,
  }

  if (slides.length === 0) return null

  return (
    <div className="project-slider">
      <ul className="project-slider__wrapper" style={wrapperStyle}>
        {slides.map((slide, i) => (
          <Slide
            key={i}
            slide={slide}
            index={i}
            current={current}
            onSlideClick={handleSlideClick}
          />
        ))}
      </ul>

      <div className="project-slider__controls">
        <SliderControl type="previous" title="Previous project" onClick={handlePrevious} />
        <SliderControl type="next" title="Next project" onClick={handleNext} />
      </div>
    </div>
  )
}
