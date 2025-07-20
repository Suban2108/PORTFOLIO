# 🧩 Component Guide - Editing Your Portfolio Components

Your portfolio is now organized into separate, easy-to-edit components. This guide will help you customize each section independently.

## 📁 Component Structure

```
src/
├── components/
│   ├── Navigation.tsx          # Navigation bar
│   ├── HeroSection.tsx         # Hero/landing section
│   ├── AboutSection.tsx        # About me section
│   ├── SkillsSection.tsx       # Skills and technologies
│   ├── ProjectsSection.tsx     # Portfolio projects
│   ├── ExperienceSection.tsx   # Work experience
│   ├── ContactSection.tsx      # Contact form and info
│   └── Footer.tsx              # Footer
└── app/
    └── page.tsx                # Main page (imports all components)
```

## 🎯 How to Edit Each Component

### 1. Navigation Component (`src/components/Navigation.tsx`)

**What to edit:**
- Portfolio title/logo
- Navigation menu items
- Mobile menu functionality

**Key sections:**
```tsx
// Change the portfolio title
className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
>
  Portfolio  // ← Change this
</motion.div>

// Add/remove navigation items
{['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
  // ← Modify this array
))}
```

### 2. Hero Section (`src/components/HeroSection.tsx`)

**What to edit:**
- Your name and title
- Personal description
- Hero image
- Call-to-action buttons

**Key sections:**
```tsx
// Your name
<span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
  Your Name  // ← Change this
</span>

// Your title
<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
  Full-Stack Developer  // ← Change this
</span>

// Your description
<p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto lg:mx-0">
  I create beautiful, functional, and user-centered digital experiences...  // ← Change this
</p>

// Hero image (replace the placeholder)
<div className="w-full h-full flex items-center justify-center text-white text-6xl font-bold">
  🚀  // ← Replace with your image
</div>
```

### 3. About Section (`src/components/AboutSection.tsx`)

**What to edit:**
- About me description
- Profile image
- Statistics (projects, experience)

**Key sections:**
```tsx
// About description
<p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
  I'm a full-stack developer with over 5 years of experience...  // ← Change this
</p>

// Statistics
<div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
  50+  // ← Change this number
</div>
<div className="text-sm text-gray-600 dark:text-gray-300">
  Projects Completed  // ← Change this text
</div>

// Profile image
<div className="w-full h-64 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-4xl">
  👨‍💻  // ← Replace with your image
</div>
```

### 4. Skills Section (`src/components/SkillsSection.tsx`)

**What to edit:**
- Skill categories
- Individual skills
- Progress percentages

**Key sections:**
```tsx
const skillCategories = [
  {
    category: "Frontend",  // ← Change category name
    gradient: "from-blue-500 to-cyan-500",  // ← Change gradient
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS", "JavaScript"]  // ← Modify skills
  },
  // Add more categories or modify existing ones
];
```

### 5. Projects Section (`src/components/ProjectsSection.tsx`)

**What to edit:**
- Project details
- Project images
- Technologies used
- Project links

**Key sections:**
```tsx
const projects = [
  {
    title: "E-Commerce Platform",  // ← Change project title
    description: "A full-stack e-commerce solution...",  // ← Change description
    image: "https://via.placeholder.com/400x250/3B82F6/FFFFFF?text=E-Commerce",  // ← Change image
    tech: ["React", "Node.js", "Stripe", "MongoDB"],  // ← Change technologies
    gradient: "from-blue-500 to-cyan-500",  // ← Change gradient
    link: "#"  // ← Add actual project link
  },
  // Add more projects or modify existing ones
];
```

### 6. Experience Section (`src/components/ExperienceSection.tsx`)

**What to edit:**
- Job titles and companies
- Work periods
- Job descriptions
- Achievements

**Key sections:**
```tsx
const experiences = [
  {
    title: "Senior Full-Stack Developer",  // ← Change job title
    company: "Tech Company Inc.",  // ← Change company name
    period: "2022 - Present",  // ← Change period
    description: "Leading development of enterprise applications...",  // ← Change description
    achievements: ["Reduced loading times by 40%", "Implemented CI/CD pipeline", "Led team of 5 developers"],  // ← Change achievements
    gradient: "from-blue-500 to-purple-500"  // ← Change gradient
  },
  // Add more experiences or modify existing ones
];
```

### 7. Contact Section (`src/components/ContactSection.tsx`)

**What to edit:**
- Contact information
- Social media links
- Contact form functionality

**Key sections:**
```tsx
// Contact information
<p className="text-gray-600 dark:text-gray-300">hello@yourname.com</p>  // ← Change email
<p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>  // ← Change phone
<p className="text-gray-600 dark:text-gray-300">San Francisco, CA</p>  // ← Change location

// Social platforms
const socialPlatforms = ['GitHub', 'LinkedIn', 'Twitter', 'Dribbble'];  // ← Modify platforms

// Add actual links
<a
  key={platform}
  href="#"  // ← Add actual social media URLs
  className="..."
>
```

### 8. Footer Component (`src/components/Footer.tsx`)

**What to edit:**
- Copyright information
- Footer text

**Key sections:**
```tsx
<p className="text-gray-400 mb-4">
  © 2024 Your Name. All rights reserved.  // ← Change name and year
</p>
```

## 🎨 Styling Customization

### Colors and Gradients
Each component uses Tailwind CSS classes. You can customize:

- **Gradients**: Change `from-blue-600 to-purple-600` to your preferred colors
- **Backgrounds**: Modify `bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50`
- **Text colors**: Update `text-gray-900 dark:text-white`

### Common Color Classes
```tsx
// Primary gradients
"from-blue-600 to-purple-600"
"from-purple-600 to-pink-600"
"from-green-500 to-blue-500"

// Background gradients
"from-blue-50 via-indigo-50 to-purple-50"
"from-gray-50 via-blue-50 to-purple-50"

// Text colors
"text-gray-900 dark:text-white"
"text-gray-600 dark:text-gray-300"
```

## 📱 Responsive Design

All components are already responsive with:
- Mobile-first design
- Responsive grid layouts
- Adaptive typography
- Touch-friendly interactions

## 🔧 Adding New Components

To add a new section:

1. Create a new component file in `src/components/`
2. Export it as default
3. Import it in `src/app/page.tsx`
4. Add it to the JSX

Example:
```tsx
// src/components/NewSection.tsx
const NewSection = () => {
  return (
    <section id="new-section" className="py-20 bg-white dark:bg-gray-800">
      {/* Your content */}
    </section>
  );
};

export default NewSection;

// src/app/page.tsx
import NewSection from '@/components/NewSection';

// Add to JSX
<NewSection />
```

## 🚀 Quick Customization Tips

1. **Start with personal info**: Update name, title, and contact details first
2. **Add your images**: Replace placeholders with your actual photos
3. **Update projects**: Add your real projects with screenshots
4. **Customize colors**: Adjust gradients to match your brand
5. **Test responsiveness**: Check how it looks on different devices

## 📝 Best Practices

- Keep components focused on a single responsibility
- Use consistent naming conventions
- Maintain the existing animation structure
- Test changes on both light and dark modes
- Optimize images before adding them

Your portfolio is now much easier to maintain and customize! Each section can be edited independently without affecting the others. 