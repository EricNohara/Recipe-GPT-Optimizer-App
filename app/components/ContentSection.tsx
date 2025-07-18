import styled from "styled-components";

const ContentSection = styled.div`
  background-color: var(--background);
  clip-path: polygon(0 0, 100% 0, 90% 100%, 0% 100%);
  padding: 2rem 4rem;
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default ContentSection;
