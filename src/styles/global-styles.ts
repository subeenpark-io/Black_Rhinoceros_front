import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #root {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }

  .react-flow__node.selected > *{
    border-color: #0041d0;
    box-shadow: 0 0 0 0.5px #0041d0;
  }

  .react-flow__handle {
    background: white;
    border: 1px solid #555;
    transition: 0.1s;
    width: 13px;
    height: 13px;
  }
  .react-flow__handle:hover {
    width: 13px;
    height: 13px;
  }
  .react-flow__handle.connectable {
    cursor: pointer;
    transition: 0.1s;
  }
  .react-flow__handle-bottom {
    bottom:-6px;
  }
  .react-flow__handle-top {
    top:-6px;
  }

  .react-flow__edge-path {
    stroke-width: 2.5px;
  }

  .react-flow__edge-path.hit {
    stroke-width: 14px;
    stroke: white;
    opacity: 0;
  }
  .react-flow__connection-path {
    stroke-width: 2.5px;
  }

  .connected {
    background: #555;
  }

  .positive {
    background: #30D158;
    border: #30D158;
  }
  .negative {
    background: #FF453A;
    border: #FF453A;
  }
`;
