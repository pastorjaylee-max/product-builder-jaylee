
# Blueprint: Lotto Number Recommendation Site

## Overview

This application will be a simple and visually appealing "Lotto Number Recommendation" site. The user can press a button to generate a set of 6 unique lottery numbers between 1 and 45. The interface will be clean, modern, and responsive.

## Project Outline

### Style and Design

*   **Layout:** A centered, card-like interface on a textured background.
*   **Color Palette:** A vibrant and energetic color scheme with a wide range of hues. Gradients and soft shadows will be used to create depth and a "lifted" feel for interactive elements.
*   **Typography:** Expressive and clear fonts to create a hierarchy of information (title, generated numbers).
*   **Iconography:** An icon will be used on the generation button to enhance user understanding.
*   **Effects:**
    *   Subtle noise texture on the main background for a premium feel.
    *   Multi-layered drop shadows for depth.
    *   A "glow" effect on the button and number display.
*   **Responsiveness:** The layout will adapt to different screen sizes, ensuring it works well on both mobile and desktop.

### Features

*   **Number Generation:** Generate 6 unique random numbers from 1 to 45.
*   **Display:** Show the generated numbers in a clear and visually appealing format.
*   **Interactivity:** A single button to trigger the number generation.
*   **Web Component:** The core functionality will be encapsulated in a `<lotto-generator>` custom element for modularity and reusability.

## Current Plan

1.  **Update `index.html`:**
    *   Set the document title.
    *   Add a `<lotto-generator>` custom element to the body.
    *   Change the heading to "Lotto Number Generator".

2.  **Update `style.css`:**
    *   Apply a background with noise texture.
    *   Style the main application container and elements to match the design outline.
    *   Implement responsive design using modern CSS.

3.  **Update `main.js`:**
    *   Create and define the `LottoGenerator` custom element (Web Component).
    *   The component will handle its own internal state, logic for number generation, and rendering of the numbers and button.
    *   The component's shadow DOM will encapsulate its styles and structure.
