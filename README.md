# Portfolio Website

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Features smooth animations, dark mode support, and a clean, professional design.

## 🚀 Features

- **Modern Design**: Clean and professional layout with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Dark Mode**: Built-in dark mode support with system preference detection
- **Smooth Animations**: Powered by Framer Motion for engaging user experience
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Fast Performance**: Optimized with Next.js 15 and modern web technologies
- **Accessible**: WCAG compliant with proper focus management and screen reader support

## 📋 Sections

1. **Hero Section**: Eye-catching introduction with call-to-action buttons
2. **About**: Personal information and statistics
3. **Skills**: Technical skills organized by category with progress indicators
4. **Projects**: Portfolio showcase with project details and technologies used
5. **Experience**: Professional work history and achievements
6. **Contact**: Contact form and social media links

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Fonts**: Geist Sans & Geist Mono
- **Deployment**: Vercel (recommended)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Customization

### Personal Information

Update the following in `src/app/page.tsx`:

1. **Hero Section**:
   - Change "Your Name" to your actual name
   - Update the title and description
   - Modify the call-to-action buttons

2. **About Section**:
   - Update the profile description
   - Change the statistics (projects completed, years experience)
   - Replace the placeholder image with your photo

3. **Skills Section**:
   - Modify the skills list in each category
   - Adjust the progress bars (currently randomized)

4. **Projects Section**:
   - Replace placeholder projects with your actual work
   - Update project images, descriptions, and technologies
   - Add real project links

5. **Experience Section**:
   - Update job titles, companies, and periods
   - Modify job descriptions and achievements
   - Add or remove experience entries

6. **Contact Section**:
   - Update email, phone, and location
   - Add your social media links
   - Customize the contact form

### Styling

The website uses Tailwind CSS for styling. You can customize:

1. **Colors**: Update the color scheme in `src/app/globals.css`
2. **Fonts**: Change fonts in `src/app/layout.tsx`
3. **Animations**: Modify animation settings in the Framer Motion components
4. **Layout**: Adjust spacing and layout in the component classes

### Images

Replace placeholder images with your own:

1. **Profile Photo**: Add your photo to the About section
2. **Project Images**: Replace placeholder URLs with actual project screenshots
3. **Favicon**: Update `src/app/favicon.ico`

### SEO

Update the metadata in `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Your Name - Portfolio",
  description: "Your professional description",
  keywords: ["your", "keywords", "here"],
  authors: [{ name: "Your Name" }],
};
```

## 📱 Responsive Design

The website is fully responsive and includes:

- Mobile-first design approach
- Responsive navigation with mobile menu
- Adaptive grid layouts
- Touch-friendly interactions
- Optimized typography for all screen sizes

## 🌙 Dark Mode

Dark mode is automatically enabled based on system preferences. The design includes:

- Smooth transitions between light and dark themes
- Proper contrast ratios for accessibility
- Consistent color schemes across all components

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The website can be deployed to any platform that supports Next.js:

```bash
npm run build
npm start
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help customizing your portfolio, feel free to open an issue or contact me.

---

**Built with ❤️ using Next.js and Tailwind CSS**
