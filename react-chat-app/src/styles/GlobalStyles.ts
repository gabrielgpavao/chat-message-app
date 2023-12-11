import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center, dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend, main,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video, input, button, select, textarea {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
        line-height: 1;
        list-style: none;
        box-sizing: border-box;
        font-family: 'Inter', sans-serif;
    }
    
    body{
        background-color: #0D0630;
        color: #F8FFE3;
    }

    a {
        text-decoration: none;
    }
    
    button {
        cursor: pointer;
    }
	
	input, button {
		outline: none;
	}

    :root {
        --brand-1: #E6F9AF;
        --brand-2: #8BBEB2;

        --blue-1: #0D0630;
		--blue-2: #18314F;
        --blue-3: #384E77;

        --white: #F8FFE3;
        
        --error: #E63462
    }
`
