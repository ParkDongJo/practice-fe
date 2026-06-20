import React from 'react'

export default class ImageGallery extends React.Component {
  constructor(props) {
    super(props)
    this.observer = null
    this.imgRefs = []
    this.viewportRef = React.createRef()
  }

  componentDidMount() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const img = entry.target
          if (!entry.isIntersecting) return
          const realSrc = img.dataset.src
          if (realSrc && img.src.indexOf(realSrc) === -1) {
            img.src = realSrc
          }
          if (this.observer) {
            this.observer.unobserve(img)
          }
        })
      },
      {
        root: this.viewportRef.current,
        rootMargin: '0px 0px 100px 0px',
        threshold: 0,
      }
    )

    this.imgRefs.forEach((img) => {
      if (img && img.dataset && img.dataset.src) {
        this.observer.observe(img)
      }
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.images !== this.props.images && this.observer) {
      this.imgRefs.forEach((img) => {
        if (img && img.dataset && img.dataset.src) {
          this.observer.observe(img)
        }
      })
    }
  }

  componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect()
    }
  }

  setImgRef = (el, index) => {
    if (el) {
      this.imgRefs[index] = el
      if (this.observer && el.dataset && el.dataset.src) {
        this.observer.observe(el)
      }
    }
  }

  render() {
    const { images } = this.props

    return (
      <div
        style={{
          height: '400px',
          overflowY: 'auto',
          border: '1px solid #ccc',
          position: 'relative',
        }}
      >
        <div
          ref={this.viewportRef}
          style={{
            height: '200px',
            borderBottom: '2px solid red',
            position: 'absolute',
            top: 0,
            left: 0,
            transform: 'translateX(-50%)',
            backgroundColor: 'red',
          }}
        >
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 200px)',
            paddingTop: '8px',
            paddingBottom: '8px',
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              data-src={image.src}
              alt={image.alt || ''}
              ref={(el) => this.setImgRef(el, index)}
              style={{
                width: '200px',
                height: '200px',
                objectFit: 'cover',
                backgroundColor: '#eee',
                marginRight: '4px',
              }}
            />
          ))}
        </div>
      </div>
    )
  }
}
