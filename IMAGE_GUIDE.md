# 🖼️ Image Guide - Adding Your Personal Images

This guide will help you replace the placeholder images with your own personal photos and project screenshots.

## 📁 Image Requirements

### Hero Image
- **Location**: Hero section (right side)
- **Recommended size**: 600x600px or larger
- **Format**: JPG, PNG, or WebP
- **Style**: Professional headshot or creative developer photo
- **File**: Save as `hero-image.jpg` in the `public` folder

### Profile Image
- **Location**: About section (left side)
- **Recommended size**: 400x300px or larger
- **Format**: JPG, PNG, or WebP
- **Style**: Professional headshot
- **File**: Save as `profile-image.jpg` in the `public` folder

### Project Images
- **Location**: Projects section
- **Recommended size**: 400x250px
- **Format**: JPG, PNG, or WebP
- **Style**: Screenshots of your actual projects
- **Files**: Save as `project-1.jpg`, `project-2.jpg`, etc. in the `public` folder

## 🚀 How to Add Your Images

### Step 1: Prepare Your Images
1. Resize your images to the recommended dimensions
2. Optimize them for web (compress if needed)
3. Save them in the `public` folder of your project

### Step 2: Replace Hero Image
In `src/app/page.tsx`, find this section in the Hero Image area:

```tsx
{/* Replace this div with your actual image */}
<div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-3xl shadow-2xl overflow-hidden">
  {/* Placeholder for your hero image - Replace this with your actual image */}
  <div className="w-full h-full flex items-center justify-center text-white text-6xl font-bold">
    🚀
  </div>
  
  {/* Add your image here like this:
  <Image
    src="/your-hero-image.jpg"
    alt="Your Name - Developer"
    fill
    className="object-cover"
    priority
  />
  */}
</div>
```

Replace it with:

```tsx
<div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-3xl shadow-2xl overflow-hidden">
  <Image
    src="/hero-image.jpg"
    alt="Your Name - Developer"
    fill
    className="object-cover"
    priority
  />
</div>
```

### Step 3: Replace Profile Image
In the About section, find this section:

```tsx
{/* Replace this with your actual profile image */}
<div className="w-full h-64 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-4xl">
  👨‍💻
</div>

{/* Add your profile image here like this:
<Image
  src="/your-profile-image.jpg"
  alt="Your Name"
  width={400}
  height={300}
  className="w-full h-64 object-cover rounded-xl"
/>
*/}
```

Replace it with:

```tsx
<Image
  src="/profile-image.jpg"
  alt="Your Name"
  width={400}
  height={300}
  className="w-full h-64 object-cover rounded-xl"
/>
```

### Step 4: Replace Project Images
In the Projects section, find the project images and replace the placeholder URLs:

```tsx
// Replace this:
image: "https://via.placeholder.com/400x250/3B82F6/FFFFFF?text=E-Commerce",

// With this:
image: "/project-1.jpg",
```

Do this for all 6 projects with your actual project screenshots.

## 🎨 Image Tips

### Hero Image Ideas
- Professional headshot with a modern background
- Creative photo showing you coding or working
- Abstract developer-themed image
- Photo with your workspace/laptop

### Profile Image Ideas
- Professional headshot
- Casual but professional photo
- Photo showing your personality

### Project Image Ideas
- Screenshots of your actual projects
- Mockups of your designs
- Live website screenshots
- Mobile app screenshots

## 📱 Responsive Images

The images are already set up to be responsive:
- Hero image scales properly on all devices
- Profile image maintains aspect ratio
- Project images have hover effects and scaling

## 🔧 Troubleshooting

### Image Not Loading
- Check that the file path is correct
- Ensure the image is in the `public` folder
- Verify the file name matches exactly (case-sensitive)

### Image Too Large/Small
- Adjust the `width` and `height` props in the Image component
- Modify the CSS classes for sizing

### Performance Issues
- Use WebP format for better compression
- Optimize images before adding them
- Consider using Next.js Image optimization features

## 📝 Example File Structure

```
public/
├── hero-image.jpg
├── profile-image.jpg
├── project-1.jpg
├── project-2.jpg
├── project-3.jpg
├── project-4.jpg
├── project-5.jpg
└── project-6.jpg
```

## 🎯 Quick Start

1. Add your images to the `public` folder
2. Update the image paths in `src/app/page.tsx`
3. Test the website to ensure images load correctly
4. Adjust sizing if needed

Your portfolio will look much more professional and personal with your own images! 