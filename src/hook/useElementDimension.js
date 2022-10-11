import { useCallback, useState } from 'react'

export const useElementDimension = () => {
  const [dimension, setDimension] = useState(null)
  const elementRef = useCallback((node) => {
    if (!node) console.error('there is no elementRef!', node)
    const { width, height } = node.getBoundingClientRect()
    setDimension({
      width,
      height,
    })

    const resizeObserver = new ResizeObserver(() => {
      const { width, height } = node.getBoundingClientRect()
      setDimension({
        width,
        height,
      })
    })

    resizeObserver.observe(node)
  }, [])

  return { elementRef, dimension }
}
