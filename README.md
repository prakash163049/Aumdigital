# Aum Digital Marketing Website

A modern, responsive website for Aum Digital Marketing agency showcasing their services in logo design, banner creation, and social media management.

## Features

- Responsive design that works on all devices
- Modern and clean user interface
- Smooth scrolling navigation
- Interactive portfolio gallery
- Contact form with validation
- Animated sections and elements
- Mobile-friendly navigation menu
- Social media integration

## Technologies Used

- HTML5
- CSS3 (with CSS Variables and Flexbox/Grid)
- JavaScript (ES6+)
- Font Awesome Icons

## Setup Instructions

1. Clone this repository to your local machine
2. Create an `images` folder in the root directory
3. Add the following images to the `images` folder:
   - `hero-bg.jpg` - A high-quality background image for the hero section
   - `portfolio1.jpg` - Logo design portfolio image
   - `portfolio2.jpg` - Banner design portfolio image
   - `portfolio3.jpg` - Social media portfolio image

4. Open `index.html` in your web browser to view the website

## Customization

### Colors
The website uses CSS variables for easy color customization. You can modify the colors in the `:root` section of `styles.css`:

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
    --text-color: #333;
    --light-bg: #f8f9fa;
    --white: #ffffff;
}
```

### Content
- Update the text content in `index.html`
- Replace portfolio images in the `images` folder
- Update contact information and social media links
- Modify the services section to match your offerings

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Contact Form

The contact form is currently set up to log form submissions to the console. To make it functional, you'll need to:

1. Set up a backend server
2. Modify the form submission handler in `script.js`
3. Add your server endpoint to handle the form data

## License

This project is open source and available under the MIT License. 