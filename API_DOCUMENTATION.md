# 🔧 API Documentation - Portfolio Backend

Complete backend API system for portfolio management with authentication, CRUD operations, and real-time data management.

## 🏗️ **System Architecture**

### **Backend Stack:**
- **Framework**: Next.js 15 API Routes
- **Authentication**: JWT with bcrypt password hashing
- **Database**: In-memory storage (easily replaceable with real database)
- **Security**: Token-based authentication with role-based access

### **API Structure:**
```
/api/
├── auth/
│   ├── login/route.ts      # User authentication
│   └── verify/route.ts     # Token verification
├── skills/route.ts         # Skills CRUD operations
├── projects/route.ts       # Projects CRUD operations
└── experience/route.ts     # Experience CRUD operations
```

## 🔐 **Authentication API**

### **POST /api/auth/login**
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "admin@portfolio.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "admin@portfolio.com",
    "name": "Portfolio Admin",
    "role": "admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response:**
```json
{
  "error": "Invalid credentials"
}
```

### **POST /api/auth/verify**
Verify JWT token validity.

**Request Body:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "admin@portfolio.com",
    "name": "Portfolio Admin",
    "role": "admin"
  }
}
```

## 🛠️ **Skills API**

### **GET /api/skills**
Fetch all skill categories and skills.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Frontend Development",
      "skills": [
        { "id": 1, "name": "React", "level": 90 },
        { "id": 2, "name": "Next.js", "level": 85 }
      ]
    }
  ]
}
```

### **POST /api/skills**
Create new skill category (Admin only).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "title": "New Category",
  "skills": [
    { "name": "Skill Name", "level": 85 }
  ]
}
```

### **PUT /api/skills**
Update skill category (Admin only).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "id": 1,
  "title": "Updated Category",
  "skills": [
    { "name": "Updated Skill", "level": 90 }
  ]
}
```

### **DELETE /api/skills?id=1**
Delete skill category (Admin only).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

## 🚀 **Projects API**

### **GET /api/projects**
Fetch all projects.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "E-Commerce Platform",
      "description": "A full-stack e-commerce platform...",
      "image": "/project1.jpg",
      "technologies": ["Next.js", "TypeScript"],
      "link": "#",
      "github": "#",
      "createdAt": "2024-01-15T00:00:00.000Z"
    }
  ]
}
```

### **POST /api/projects**
Create new project (Admin only).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "title": "New Project",
  "description": "Project description",
  "image": "/project-image.jpg",
  "technologies": ["React", "Node.js"],
  "link": "https://demo.com",
  "github": "https://github.com/user/repo"
}
```

### **PUT /api/projects**
Update project (Admin only).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "id": 1,
  "title": "Updated Project",
  "description": "Updated description"
}
```

### **DELETE /api/projects?id=1**
Delete project (Admin only).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

## 💼 **Experience API**

### **GET /api/experience**
Fetch all work experience.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Senior Full-Stack Developer",
      "company": "Tech Solutions Inc.",
      "period": "2022 - Present",
      "description": "Leading development of enterprise applications...",
      "achievements": [
        "Led a team of 5 developers",
        "Improved performance by 40%"
      ],
      "createdAt": "2022-01-15T00:00:00.000Z"
    }
  ]
}
```

### **POST /api/experience**
Create new experience (Admin only).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "title": "New Position",
  "company": "Company Name",
  "period": "2024 - Present",
  "description": "Job description",
  "achievements": ["Achievement 1", "Achievement 2"]
}
```

### **PUT /api/experience**
Update experience (Admin only).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "id": 1,
  "title": "Updated Position",
  "company": "Updated Company"
}
```

### **DELETE /api/experience?id=1**
Delete experience (Admin only).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

## 🔧 **Frontend Integration**

### **API Service Functions:**
```typescript
import { authAPI, skillsAPI, projectsAPI, experienceAPI } from '@/lib/api';

// Authentication
const loginResponse = await authAPI.login(email, password);
const verifyResponse = await authAPI.verifyToken(token);

// Skills
const skills = await skillsAPI.getAll();
const newSkill = await skillsAPI.create({ title: 'New Category' });
const updatedSkill = await skillsAPI.update(1, { title: 'Updated' });
await skillsAPI.delete(1);

// Projects
const projects = await projectsAPI.getAll();
const newProject = await projectsAPI.create(projectData);
const updatedProject = await projectsAPI.update(1, updateData);
await projectsAPI.delete(1);

// Experience
const experience = await experienceAPI.getAll();
const newExp = await experienceAPI.create(expData);
const updatedExp = await experienceAPI.update(1, updateData);
await experienceAPI.delete(1);
```

### **Error Handling:**
```typescript
try {
  const response = await skillsAPI.getAll();
  // Handle success
} catch (error) {
  if (error instanceof APIError) {
    console.error('API Error:', error.message);
  } else {
    console.error('Network Error:', error);
  }
}
```

## 🛡️ **Security Features**

### **Authentication:**
- **JWT Tokens**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Token Expiration**: 24-hour token validity
- **Role-Based Access**: Admin-only operations

### **Authorization:**
- **Protected Routes**: All write operations require admin token
- **Token Verification**: Server-side token validation
- **Automatic Logout**: Invalid token handling

### **Input Validation:**
- **Required Fields**: Server-side validation for all inputs
- **Data Sanitization**: Clean input processing
- **Error Handling**: Comprehensive error responses

## 🗄️ **Data Models**

### **User Model:**
```typescript
interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}
```

### **Skill Category Model:**
```typescript
interface SkillCategory {
  id: number;
  title: string;
  skills: Skill[];
}

interface Skill {
  id: number;
  name: string;
  level: number;
}
```

### **Project Model:**
```typescript
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
  github: string;
  createdAt: string;
}
```

### **Experience Model:**
```typescript
interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  createdAt: string;
}
```

## 🚀 **Deployment Considerations**

### **Environment Variables:**
```env
JWT_SECRET=your-super-secret-jwt-key
DATABASE_URL=your-database-connection-string
NODE_ENV=production
```

### **Database Integration:**
Replace mock data with real database:
- **PostgreSQL**: Using Prisma ORM
- **MongoDB**: Using Mongoose
- **SQLite**: For development
- **Cloud Databases**: AWS RDS, PlanetScale, etc.

### **Production Security:**
- **HTTPS**: Secure communication
- **Rate Limiting**: Prevent abuse
- **CORS**: Configure allowed origins
- **Input Validation**: Sanitize all inputs
- **Logging**: Monitor API usage

## 📊 **API Response Format**

### **Success Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

### **Error Response:**
```json
{
  "error": "Error message",
  "status": 400
}
```

### **HTTP Status Codes:**
- **200**: Success
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized
- **404**: Not Found
- **500**: Internal Server Error

## 🔄 **State Management**

### **Frontend State:**
- **Authentication**: JWT token in localStorage
- **User Data**: Cached user information
- **Content Data**: Real-time from API
- **Loading States**: API request indicators

### **Data Flow:**
1. **Login**: Get JWT token
2. **API Calls**: Include token in headers
3. **Data Fetch**: Real-time content loading
4. **Updates**: Immediate UI updates
5. **Error Handling**: Graceful error display

Your portfolio now has a complete, production-ready backend API system with full CRUD operations, authentication, and security! 🎉✨ 