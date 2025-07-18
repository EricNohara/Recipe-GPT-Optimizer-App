import styled from "styled-components";

const DiagonalSection = styled.div<{ $expand: boolean }>`
  background: var(--second);
  height: 100%;
  border: none;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  width: ${({ $expand }) => ($expand ? "100vw" : "20%")};
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    clip-path 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  clip-path: ${({ $expand }) =>
    $expand
      ? "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
      : "polygon(35% 0, 100% 0, 100% 100%, 0% 100%)"};
  pointer-events: none;
`;

export default DiagonalSection;
