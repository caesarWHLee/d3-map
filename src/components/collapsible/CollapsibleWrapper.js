import { useCallback, useState } from 'react'
import styled from 'styled-components'
import UpTriangleSVG from '../../images/up_triangle.svg'
import DownTriangleSVG from '../../images/down_triangle.svg'

const Wrapper = styled.div``
const CollapseButton = styled.div`
  position: relative;
  padding: 0 11px 0 23px;
  height: 40px;
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`
const CollapseButtonTitle = styled.p`
  font-size: 16px;
  margin: 0;
`

const CollapseButtonIcon = styled.img`
  width: 16px;
  height: 16px;
`

const CollapseContent = styled.div`
  border: solid 1px black;
  border-radius: 0 0 16px 16px;

  max-height: ${({ collapse, scrollHeight }) =>
    collapse ? `${scrollHeight}px` : '0'};
  overflow: hidden;

  ${({ collapse, scrollHeight }) =>
    collapse
      ? `
        max-height: ${scrollHeight}px;
        border: solid 1px black;
      `
      : `
        max-height: 0;
        border: solid 0px black;
      `}
`

export const CollapsibleWrapper = ({ children, title, className }) => {
  const [collapse, setCollapse] = useState(true)
  const [scrollHeight, setScrollHeight] = useState(0)
  const buttonRef = useCallback((node) => {
    if (node && node.nextElementSibling) {
      const contentNode = node.nextElementSibling
      const resizeObserver = new ResizeObserver(() => {
        if (scrollHeight !== contentNode.scrollHeight) {
          setScrollHeight(contentNode.scrollHeight)
        }
      })

      resizeObserver.observe(node)
    }
  }, [])

  return (
    <Wrapper className={className}>
      <CollapseButton
        onClick={() => {
          setCollapse((v) => !v)
        }}
        ref={buttonRef}
      >
        <CollapseButtonTitle>{title}</CollapseButtonTitle>
        <CollapseButtonIcon src={collapse ? DownTriangleSVG : UpTriangleSVG} />
      </CollapseButton>
      <CollapseContent collapse={collapse} scrollHeight={scrollHeight}>
        {children}
      </CollapseContent>
    </Wrapper>
  )
}
