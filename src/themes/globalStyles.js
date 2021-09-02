import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

import { defaultTheme } from './default'

export const theme = defaultTheme
// export const typography = defaultTypography

export const screenSize = theme.screens

export const GlobalStyles = createGlobalStyle`
  ${reset}

  *, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    box-sizing: border-box; 
    /* scroll-behavior: smooth; */
    /* scroll-behavior: initial; */
    /* scroll-behavior: auto; */
    scroll-behavior: initial;
    font-family: ${({ theme }) => theme.font.sans};
    font-size: ${({ theme }) => theme.fontSize.base};
    color: ${({ theme }) => theme.colors.page.default};
    font-feature-settings: 'kern', 'liga', 'clig', 'calt';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    word-wrap: break-word;
    font-kerning: normal;
  }

  body {
     line-height: ${({ theme }) => theme.lineHeight.relaxed};
     letter-spacing: ${({ theme }) => theme.letterSpacing.normal};
  }  

  section.light {
    color: ${({ theme }) => theme.colors.page.default};
  }
   section.dark {
    color: ${({ theme }) => theme.colors.page[100]};
  }

  a,
  a:link,
  a:hover,
  a:visited {
    color: ${({ theme }) => theme.colors.primary[1100]};
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  a:focus {
    outline: none;
  }

  a:focus-visible,
  button:focus-visible{
    outline: 2px solid ${({ theme }) => theme.colors.focusVisible} !important; 
  }

  /* a:-moz-focusring {
    outline: 2px solid ${({ theme }) => theme.colors.focusVisible} !important; 
  } */

  h1 {
    font-size: ${({ theme }) => theme.fontSize['5xl']};
    font-family: ${({ theme }) => theme.font.slab};
    line-height: ${({ theme }) => theme.lineHeight.tight};
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSize['4xl']};
    font-family: ${({ theme }) => theme.font.slab};
    line-height: ${({ theme }) => theme.lineHeight.tight};
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSize['2xl']};
    font-family: ${({ theme }) => theme.font.sans};
    line-height: ${({ theme }) => theme.lineHeight.snug};
  }

  h4 {
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-family: ${({ theme }) => theme.font.sans};
    line-height: ${({ theme }) => theme.lineHeight.relaxed};
  }  

  @media (max-width: ${({ theme }) => theme.screens.sm}) {
    h1 {
      font-size: ${({ theme }) => theme.fontSize['4xl']};
    }

    h2 {
      font-size: ${({ theme }) => theme.fontSize['3xl']};
    }

    h3 {
      font-size: ${({ theme }) => theme.fontSize['2xl']};
    }

    h4 {
      font-size: ${({ theme }) => theme.fontSize.xl};
    }

  }

  p {
    /* font-size: ${({ theme }) => theme.fontSize.base}; */
    font-family: ${({ theme }) => theme.font.sans};
    margin-bottom: ${({ theme }) => theme.spacing['3']};
   
    em {
      font-style: italic;
    }
  }

  p:last-of-type {
    margin-bottom: 0;
  }

  strong {
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
  }
 

  ul, ol {
    margin-left: 1.45em;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.45em;
    list-style-position: outside;
    list-style-image: none;
    list-style: disc;
  }

  ol {
    list-style: decimal;
  }

  dl {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.45em;
  }

  dd {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.45em;
  }

  p {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
  }

  figure {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.45em;
  }

  pre {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    margin-bottom: 1.45em;
    font-size: 0.85em;
    line-height: 1.42;
    background: hsla(0, 0%, 0%, 0.04);
    border-radius: 3px;
    overflow: auto;
    word-wrap: normal;
    padding: 1.45em;
  }


  button {
    font-size: ${({ theme }) => theme.fontSize.base};
    color: ${({ theme }) => theme.colors.page.default};
   background-color: transparent;  
    outline: none;
    border:none;
  }


  img {
    max-width: 100%;
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 0;
  }

  // Section - Slice widths for Homepage and General page
  .section-layout {
    > div {
      margin: 0 auto;
      padding-bottom: ${({ theme }) => theme.padding['1/2']};
        }
  }

  .section-layout.skinny {
    > div {
      max-width: ${({ theme }) => theme.screens.xs}; 
    }
  }

  .section-layout.slim {
    > div {
      max-width: ${({ theme }) => theme.screens.sm}; 
    }
  }

  .section-layout.default {
    > div {
      max-width: ${({ theme }) => theme.screens.md}; 
    }
  }

  .section-layout.large {
    > div {
      max-width: ${({ theme }) => theme.screens.lg}; 
    }
  }

  .section-layout.wide {
    > div {
      max-width: ${({ theme }) => theme.screens.xl}; 
    }
  }

  .section-layout.extraWide {
    > div {
      max-width: ${({ theme }) => theme.screens.xxl}; 
    }
  }

  .section-layout.full {
    > div {
      margin: 0 0;
      max-width: ${({ theme }) => theme.screens.full}; 
    }
  }

  .section-layout.form {
    padding: 0 ${({ theme }) => theme.padding['1/2']};
  }

  // Bground color options
  // Default
  // Grey 
  [class^="background-page"],
  [class*=" background-page"]{
    background-color: ${({ theme }) => theme.colors.page.bground.default}; 
  }
   //
  // Page

  .background-page-100 {
    background-color: ${({ theme }) => theme.colors.page.bground.default}; 
  }
  .background-page-200 {
    background-color: ${({ theme }) => theme.colors.page[200]}; 
  }
  .background-page-300 {
    background-color: ${({ theme }) => theme.colors.page[300]}; 
  }
  .background-page-400 {
    background-color: ${({ theme }) => theme.colors.page[400]}; 
  }
  .background-page-500 {
    background-color: ${({ theme }) => theme.colors.page[500]}; 
  }
  .background-page-600 {
    background-color: ${({ theme }) => theme.colors.page[600]}; 
  }
  .background-page-700 {
    background-color: ${({ theme }) => theme.colors.page[700]}; 
  }
  .background-page-800 {
    background-color: ${({ theme }) => theme.colors.page[800]}; 
  }
  .background-page-900 {
    background-color: ${({ theme }) => theme.colors.page[900]}; 
  }
  //
  // Primary
  .background-primary-default {
    background-color: ${({ theme }) => theme.colors.primary.default}; 
  }

  .background-primary-100 {
    background-color: ${({ theme }) => theme.colors.primary[100]}; 
  }
  .background-primary-200 {
    background-color: ${({ theme }) => theme.colors.primary[200]}; 
  }
  .background-primary-300 {
    background-color: ${({ theme }) => theme.colors.primary[300]}; 
  }
  .background-primary-400 {
    background-color: ${({ theme }) => theme.colors.primary[400]}; 
  }
  .background-primary-500 {
    background-color: ${({ theme }) => theme.colors.primary[500]}; 
  }
  .background-primary-600 {
    background-color: ${({ theme }) => theme.colors.primary[600]}; 
  }
  .background-primary-700 {
    background-color: ${({ theme }) => theme.colors.primary[700]}; 
  }
  .background-primary-800 {
    background-color: ${({ theme }) => theme.colors.primary[800]}; 
  }
  .background-primary-900 {
    background-color: ${({ theme }) => theme.colors.primary[900]}; 
  }
  .background-primary-1100 {
    background-color: ${({ theme }) => theme.colors.primary[1100]}; 
  }
  .background-primary-1200 {
    background-color: ${({ theme }) => theme.colors.primary[1200]}; 
  }
  .background-primary-1300 {
    background-color: ${({ theme }) => theme.colors.primary[1300]}; 
  }
  //
  // Secondary
  .background-secondary-default {
    background-color: ${({ theme }) => theme.colors.secondary.default}; 
  }
  .background-secondary-100 {
    background-color: ${({ theme }) => theme.colors.secondary[100]}; 
  }
  .background-secondary-200 {
    background-color: ${({ theme }) => theme.colors.secondary[200]}; 
  }
  .background-secondary-300 {
    background-color: ${({ theme }) => theme.colors.secondary[300]}; 
  }
  .background-secondary-400 {
    background-color: ${({ theme }) => theme.colors.secondary[400]}; 
  }
  .background-secondary-500 {
    background-color: ${({ theme }) => theme.colors.secondary[500]}; 
  }
  .background-secondary-600 {
    background-color: ${({ theme }) => theme.colors.secondary[600]}; 
  }
  .background-secondary-700 {
    background-color: ${({ theme }) => theme.colors.secondary[700]}; 
  }
  .background-secondary-800 {
    background-color: ${({ theme }) => theme.colors.secondary[800]}; 
  }
  .background-secondary-900 {
    background-color: ${({ theme }) => theme.colors.secondary[900]}; 
  }
  .background-secondary-1100 {
    background-color: ${({ theme }) => theme.colors.secondary[1100]}; 
  }
  .background-secondary-1200 {
    background-color: ${({ theme }) => theme.colors.secondary[1200]}; 
  }
  .background-secondary-1300 {
    background-color: ${({ theme }) => theme.colors.secondary[1300]}; 
  }
  //
  // Tertiary
  .background-tertiary-default {
    background-color: ${({ theme }) => theme.colors.tertiary.default}; 
  }
  .background-tertiary-100 {
    background-color: ${({ theme }) => theme.colors.tertiary[100]}; 
  }
  .background-tertiary-200 {
    background-color: ${({ theme }) => theme.colors.tertiary[200]}; 
  }
  .background-tertiary-300 {
    background-color: ${({ theme }) => theme.colors.tertiary[300]}; 
  }
  .background-tertiary-400 {
    background-color: ${({ theme }) => theme.colors.tertiary[400]}; 
  }
  .background-tertiary-500 {
    background-color: ${({ theme }) => theme.colors.tertiary[500]}; 
  }
  .background-tertiary-600 {
    background-color: ${({ theme }) => theme.colors.tertiary[600]}; 
  }
  .background-tertiary-700 {
    background-color: ${({ theme }) => theme.colors.tertiary[700]}; 
  }
  .background-tertiary-800 {
    background-color: ${({ theme }) => theme.colors.tertiary[800]}; 
  }
  .background-tertiary-900 {
    background-color: ${({ theme }) => theme.colors.tertiary[900]}; 
  }
  .background-tertiary-1100 {
    background-color: ${({ theme }) => theme.colors.tertiary[1100]}; 
  }
  .background-tertiary-1200 {
    background-color: ${({ theme }) => theme.colors.tertiary[1200]}; 
  }
  .background-tertiary-1300 {
    background-color: ${({ theme }) => theme.colors.tertiary[1300]}; 
  }
  //
  // Grey 
  .background-grey-default{
    background-color: ${({ theme }) => theme.colors.grey.default}; 
  }
  .background-grey-100 {
    background-color: ${({ theme }) => theme.colors.grey[100]}; 
  }
  .background-grey-200 {
    background-color: ${({ theme }) => theme.colors.grey[200]}; 
  }
  .background-grey-300 {
    background-color: ${({ theme }) => theme.colors.grey[300]}; 
  }
  .background-grey-400 {
    background-color: ${({ theme }) => theme.colors.grey[400]}; 
  }
  .background-grey-500 {
    background-color: ${({ theme }) => theme.colors.grey[500]}; 
  }
  .background-grey-600 {
    background-color: ${({ theme }) => theme.colors.grey[600]}; 
  }
  .background-grey-700 {
    background-color: ${({ theme }) => theme.colors.grey[700]}; 
  }
  .background-grey-800 {
    background-color: ${({ theme }) => theme.colors.grey[800]}; 
  }
  .background-grey-900 {
    background-color: ${({ theme }) => theme.colors.grey[900]}; 
  }
  //
  // Cards 
  .background-card-default{
    background-color: ${({ theme }) => theme.colors.card.default}; 
  }
  .background-card-100 {
    background-color: ${({ theme }) => theme.colors.card[100]}; 
  }
  .background-card-200 {
    background-color: ${({ theme }) => theme.colors.card[200]}; 
  }
  .background-card-300 {
    background-color: ${({ theme }) => theme.colors.card[300]}; 
  }
  .background-card-400 {
    background-color: ${({ theme }) => theme.colors.card[400]}; 
  }
  .background-card-500 {
    background-color: ${({ theme }) => theme.colors.card[500]}; 
  }
  .background-card-600 {
    background-color: ${({ theme }) => theme.colors.card[600]}; 
  }
  .background-card-700 {
    background-color: ${({ theme }) => theme.colors.card[700]}; 
  }
  .background-card-800 {
    background-color: ${({ theme }) => theme.colors.card[800]}; 
  }
  .background-card-900 {
    background-color: ${({ theme }) => theme.colors.card[900]}; 
  }
  //
  // Header 
  .background-header-bground-default{
    background-color: ${({ theme }) => theme.colors.header.bground.default}; 
  }
  .background-header-bground-100 {
    background-color: ${({ theme }) => theme.colors.header.bground[100]}; 
  }
  .background-header-bground-200 {
    background-color: ${({ theme }) => theme.colors.header.bground[200]}; 
  }
  .background-header-bground-300 {
    background-color: ${({ theme }) => theme.colors.header.bground[300]}; 
  }
  .background-header-bground-400 {
    background-color: ${({ theme }) => theme.colors.header.bground[400]}; 
  }
  .background-header-bground-500 {
    background-color: ${({ theme }) => theme.colors.header.bground[500]}; 
  }
  .background-header-bground-600 {
    background-color: ${({ theme }) => theme.colors.header.bground[600]}; 
  }
  .background-header-bground-700 {
    background-color: ${({ theme }) => theme.colors.header.bground[700]}; 
  }
  .background-header-bground-800 {
    background-color: ${({ theme }) => theme.colors.header.bground[800]}; 
  }
  .background-header-bground-900 {
    background-color: ${({ theme }) => theme.colors.header.bground[900]}; 
  }
   //
  // Footer 
  .background-footer-bground-default{
    background-color: ${({ theme }) => theme.colors.footer.bground.default}; 
  }
  .background-footer-bground-100 {
    background-color: ${({ theme }) => theme.colors.footer.bground[100]}; 
  }
  .background-footer-bground-200 {
    background-color: ${({ theme }) => theme.colors.footer.bground[200]}; 
  }
  .background-footer-bground-300 {
    background-color: ${({ theme }) => theme.colors.footer.bground[300]}; 
  }
  .background-footer-bground-400 {
    background-color: ${({ theme }) => theme.colors.footer.bground[400]}; 
  }
  .background-footer-bground-500 {
    background-color: ${({ theme }) => theme.colors.footer.bground[500]}; 
  }
  .background-footer-bground-600 {
    background-color: ${({ theme }) => theme.colors.footer.bground[600]}; 
  }
  .background-footer-bground-700 {
    background-color: ${({ theme }) => theme.colors.footer.bground[700]}; 
  }
  .background-footer-bground-800 {
    background-color: ${({ theme }) => theme.colors.footer.bground[800]}; 
  }
  .background-footer-bground-900 {
    background-color: ${({ theme }) => theme.colors.footer.bground[900]}; 
  }
  //
  // Alerts 
  // Tomato
  .background-alert-tomato{
    background-color: ${({ theme }) => theme.colors.alert.tomato}; 
  }
  // Level 1
  .background-alert-l1-default{
    background-color: ${({ theme }) => theme.colors.alert.l1.default}; 
  }
  .background-alert-l1-1100 {
    background-color: ${({ theme }) => theme.colors.alert.l1[1100]}; 
  }
  .background-alert-l1-1200 {
    background-color: ${({ theme }) => theme.colors.alert.l1[1200]}; 
  }
  .background-alert-l1-1300 {
    background-color: ${({ theme }) => theme.colors.alert.l1[1300]}; 
  }
  // Level 2
  .background-alert-l2-default{
    background-color: ${({ theme }) => theme.colors.alert.l2.default}; 
  }
  .background-alert-l2-1100 {
    background-color: ${({ theme }) => theme.colors.alert.l2[1100]}; 
  }
  .background-alert-l2-1200 {
    background-color: ${({ theme }) => theme.colors.alert.l2[1200]}; 
  }
  .background-alert-l2-1300 {
    background-color: ${({ theme }) => theme.colors.alert.l2[1300]}; 
  }
  // Level 3
  .background-alert-l3-default{
    background-color: ${({ theme }) => theme.colors.alert.l3.default}; 
  }
  .background-alert-l3-1100 {
    background-color: ${({ theme }) => theme.colors.alert.l3[1100]}; 
  }
  .background-alert-l3-1200 {
    background-color: ${({ theme }) => theme.colors.alert.l3[1200]}; 
  }
  .background-alert-l3-1300 {
    background-color: ${({ theme }) => theme.colors.alert.l3[1300]}; 
  }
  // Level 4
  .background-alert-l4-default{
    background-color: ${({ theme }) => theme.colors.alert.l4.default}; 
  }
  .background-alert-l4-1100 {
    background-color: ${({ theme }) => theme.colors.alert.l4[1100]}; 
  }
  .background-alert-l4-1200 {
    background-color: ${({ theme }) => theme.colors.alert.l4[1200]}; 
  }
  .background-alert-l4-1300 {
    background-color: ${({ theme }) => theme.colors.alert.l4[1300]}; 
  }
  // Level 1
  .background-alert-l5-default{
    background-color: ${({ theme }) => theme.colors.alert.l5.default}; 
  }
  .background-alert-l5-1100 {
    background-color: ${({ theme }) => theme.colors.alert.l5[1100]}; 
  }
  .background-alert-l5-1200 {
    background-color: ${({ theme }) => theme.colors.alert.l5[1200]}; 
  }
  .background-alert-l5-1300 {
    background-color: ${({ theme }) => theme.colors.alert.l5[1300]}; 
  }

`
