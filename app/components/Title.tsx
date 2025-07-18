import styled from "styled-components";
import { titleFont } from "../style/localFonts";

const Title = styled.h1`
  font-size: 5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
  font-family: ${titleFont.style.fontFamily};
`;

export default Title;
