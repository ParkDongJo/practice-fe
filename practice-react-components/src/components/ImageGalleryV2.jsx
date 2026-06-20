import React from 'react'

export default class ImageGallery extends React.Component {
  observer = null
  imgRefs = []

  constructor(props) {
    super(props)
    this.imgRefs = []
  }

  componentDidMount() {
    if (this.observer) this.observer.disconnect()

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const imgEl = entry.target
          const realSrc = imgEl.dataset.src

          if (realSrc && imgEl.src !== realSrc) {
            imgEl.src = realSrc
          }

          this.observer?.unobserve(imgEl)
        })
      },
      {
        root: null,
        threshold: 0.5,
      }
    )

    this.imgRefs.forEach((img) => {
      if (img && img.dataset.src) {
        this.observer?.observe(img)
      }
    })
  }

  componentWillUnmount() {
    this.observer?.disconnect()
  }

  setImgRef = (el, index) => {
    if (el) this.imgRefs[index] = el
  }

  render() {
    const { images } = this.props

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 200px)',
          gridAutoRows: '200px',
          gap: '8px',
          overflowY: 'auto',
          maxHeight: '600px',
          border: '1px solid #ccc',
        }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            data-src={img.src}
            src={index < 3 ? img.src : ""}
            alt={img.alt ?? `image-${index}`}
            ref={(el) => this.setImgRef(el, index)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              backgroundColor: '#eee',
            }}
          />
        ))}
      </div>
    )
  }
}
