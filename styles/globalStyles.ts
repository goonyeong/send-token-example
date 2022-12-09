import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}
    *, *::before, *::after{
        box-sizing: border-box;
        color: inherit;
    }
    html{
        font-size: 1rem;
    }
    body{
        font-family: "NotoSansKR";
        line-height: 1.5;
        background-color: ${({ theme }) => theme.colors.background_color};
        color: ${({ theme }) => theme.colors.main_text_color};
    }
    input, textarea, select, button {
        outline: none;
        font-size: inherit;
        font-family: inherit;
        border: 1px solid #000;
    }
    input{
        color: ${({ theme }) => theme.colors.background_color};
     }
    input:focus, textarea:focus, select:focus {
        outline: none;
    }
    a{
        color: inherit;
        text-decoration: none;
    }
    ol, ul, li {  
        list-style: none;
    }
    img {
        display: block;
        width: 100%;
        height: 100%;
    }
    button {
        background-color: transparent;
        cursor: pointer;
    }
    
`;

export default GlobalStyle;
