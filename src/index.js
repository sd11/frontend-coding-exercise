import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import App from "./App";

const GlobalStyle = createGlobalStyle`
    body {
        color: #000;

        * {
            box-sizing: border-box;
        }
    }

    @font-face {
        font-family: "ABCSans";
        font-weight: 400;
        font-style: normal;
        src: url("//res.abc.net.au/fonts/abcsans/abcsans-regular.woff2")
            format("woff2"),
        url("//res.abc.net.au/fonts/abcsans/abcsans-regular.woff") format("woff");
    }

    @font-face {
        font-family: "ABCSans";
        font-weight: bold;
        font-style: normal;
        src: url("//res.abc.net.au/fonts/abcsans/abcsans-bold.woff2") format("woff2"),
        url("//res.abc.net.au/fonts/abcsans/abcsans-bold.woff") format("woff");
    }

    html {
        font-size: 16px;
    }

    body,
    button,
    input,
    textarea {
        font-family: abcsans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
        Helvetica Neue, Arial, sans-serif;
    }

    label {
        padding: 0.75rem 1.5rem 0.5rem 0;
        font-size: 1rem;
    }

    section {
        background: hsl(0, 0%, 95%);
        padding: 1rem;
        margin: 1rem;
    }
`;

ReactDOM.render(
    <>
        <GlobalStyle/>
        <App />
    </>,
    document.getElementById("root")
);
