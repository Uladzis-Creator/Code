# Product list with cart

A learning project based on a Frontend Mentor design.  
Features:
- Load products from a JSON file
- Add to cart, update quantity (+ / –), remove items
- Calculate total items and order amount
- Order confirmation modal
- Sticky cart with scrollable list when too many items
- Responsive images with `<picture>`
- Colors and fonts via CSS variables (design tokens)

## Technologies
- HTML5, CSS3 (grid, flex, variables, media queries)
- JavaScript (ES modules, DOM, events)
- [Frontend Mentor](https://www.frontendmentor.io/) design

## Problems & Solutions
- **fetch didn’t work when opening file directly** → solved by running a local server.  
- **Cart architecture** → refactored into a separate module.  
- **Modal bug** → fixed by removing the modal node instead of just clearing innerHTML.  

## Demo
🔗 [Live demo]()
