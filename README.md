# CivicConnect - Civic Issue Reporting Platform

## 📋 Project Overview

**CivicConnect** is a full-stack web application designed to empower citizens to report civic issues in their community and enable administrators to manage and track these issues efficiently. The platform facilitates seamless communication between citizens and local authorities through an intuitive user interface.

### Purpose
To create a centralized platform where citizens can:
- Report civic issues with images and location details
- Track the status of their submitted reports
- View all their previous reports

And administrators can:
- View all submitted reports from all citizens
- Update report statuses (Pending, In Progress, Resolved)
- Monitor community issues efficiently

---

## 🛠️ Technology Stack

### Frontend
- **React 19.1.1** - Modern JavaScript library for building user interfaces
- **React Router DOM 7.9.4** - Client-side routing
- **Axios 1.12.2** - HTTP client for API communication
- **Firebase 12.4.0** - Authentication service
- **Vite (Rolldown)** - Build tool and development server
- **CSS3** - Styling and responsive design

### Backend
- **Node.js** - Runtime environment
- **Express 5.1.0** - Web application framework
- **MongoDB with Mongoose 8.19.2** - Database and ODM
- **Firebase Admin SDK 13.5.0** - Server-side authentication
- **Multer 2.0.2** - File upload middleware
- **Cloudinary 2.8.0** - Cloud-based image storage and manipulation
- **CORS 2.8.5** - Cross-origin resource sharing
- **dotenv 17.2.3** - Environment variable management

### Third-Party Services
- **MongoDB Atlas** - Cloud-hosted database
- **Firebase Authentication** - User authentication
- **Cloudinary** - Image hosting and CDN

---

## 🏗️ Architecture & System Design

### Architecture Pattern
**MVC (Model-View-Controller)** pattern with separation of concerns:

#### Backend Structure
```
backend/
├── config/          # Database and Firebase configurations
├── controllers/     # Business logic
├── middleware/      # Authentication and authorization
├── models/          # Database schemas (Mongoose)
├── routes/          # API endpoint definitions
├── utils/           # Utility functions (Cloudinary upload)
└── server.js        # Application entry point
```

#### Frontend Structure
```
frontend/src/
├── components/      # Reusable UI components
├── context/         # React Context API (AuthProvider)
├── firebase/        # Firebase configuration
├── pages/           # Page components
└── App.jsx          # Main application component
```

---

## 📊 Database Models

### User Model
```javascript
{
  uid: String (required, unique)    // Firebase user ID
  email: String (required)          // User email
  name: String                      // User display name
  role: Enum ["citizen", "admin"]   // Default: "citizen"
}
```

### Report Model
```javascript
{
  title: String (required)              // Report title
  description: String                   // Detailed description
  imageUrl: String                      // Cloudinary image URL
  location: {                           // Location object
    lat: Number,                        // Latitude
    lng: Number,                        // Longitude
    address: String                     // Human-readable address
  }
  status: String                        // "Pending" | "In Progress" | "Resolved"
  createdBy: String                     // User email who created
  createdAt: Date (default: Date.now)  // Timestamp
}
```

---

## 🔐 Authentication & Authorization

### Authentication Flow
1. **User Registration**
   - Firebase creates user account with email/password
   - Frontend receives Firebase user object
   - POST request to `/api/users` creates MongoDB user document
   - Default role: "citizen"

2. **User Login**
   - Firebase authenticates credentials
   - `onAuthStateChanged` listener updates global state
   - JWT token obtained via `getIdToken()`

3. **Protected Routes**
   - `ProtectedRoute` component checks authentication
   - Redirects to `/login` if not authenticated

### Authorization System
- **Role-Based Access Control (RBAC)** with two roles:
  - **Citizen**: Can submit reports, view own reports
  - **Admin**: Full access including status management

### Security Middleware
1. **`verifyToken`** - Validates Firebase JWT token
2. **`checkAdmin`** - Verifies user role from MongoDB

---

## 📡 API Endpoints

### Authentication-Independent Endpoints

#### User Management
- **POST** `/api/users` - Create new user in MongoDB
- **POST** `/api/users/make-admin` - Promote user to admin role
- **GET** `/api/users/role/:email` - Get user role by email (for frontend role-based UI)

#### Reports
- **GET** `/api/reports` - Fetch all reports (public)

---

### Protected Endpoints (Require Firebase Token)

#### Report Submission
- **POST** `/api/reports`
  - **Headers**: `Authorization: Bearer <token>`
  - **Body**: `{ title, description, location, imageUrl }`
  - **Response**: Created report object

#### Image Upload
- **POST** `/api/upload`
  - **Headers**: `Authorization: Bearer <token>`, `Content-Type: multipart/form-data`
  - **Body**: FormData with `image` file
  - **Response**: `{ imageUrl: "https://..." }`

#### Admin Endpoints
- **GET** `/api/admin/reports`
  - **Requires**: Admin role
  - **Response**: All reports from all users

- **PUT** `/api/admin/reports/:id`
  - **Requires**: Admin role
  - **Body**: `{ status }`
  - **Response**: Updated report object

---

## 🎨 Frontend Pages & Features

### 1. Landing Page (`/`)
**Features:**
- **Hero Section**: Gradient background with compelling headline
- **Call-to-Action Buttons**: 
  - "Start Reporting" → Login (unauthenticated) or Dashboard (authenticated)
  - "Learn More" → Smooth scroll to features section
- **Feature Carousel**: Automatic slideshow showcasing platform capabilities
- **How It Works**: 4-step process explanation with numbered cards
- **Testimonials**: Rotating carousel with community feedback
- **Why Choose CivicConnect**: 3 benefit cards with hover effects
- **Footer**: Links to platform features and company information
- **No Navbar**: Clean landing page experience without navigation bar
- **Responsive**: Fully responsive design with smooth animations

### 2. Login Page (`/login`)
- Email/password authentication via Firebase
- Link to registration page
- Automatic redirect to dashboard on success

### 3. Registration Page (`/register`)
- Firebase user creation
- Automatic MongoDB user document creation
- Redirect to dashboard on success

### 4. Dashboard (`/dashboard`)
- Central hub with navigation links
- Quick access to reporting and viewing reports
- User-friendly welcome interface

### 5. Report Issue (`/report`)
**Features:**
- **Form fields**: Title, Description, Location Address
- **Image Upload**:
  - File input with image preview
  - Upload to Cloudinary before form submission
  - Loading state during upload
  - Image preview display
- **Submission**:
  - Two-step process: Upload image → Submit report
  - Firebase token authentication
  - Form validation
  - Success/error alerts

### 6. My Reports (`/my-reports`)
**Features:**
- Filtered view showing only current user's reports
- Status badges with color coding:
  - Red: Pending
  - Yellow: In Progress
  - Green: Resolved
- Display: Title, description, location, creation date, image
- Loading state handling

### 7. Admin Panel (`/admin`)
**Features:**
- **Access Control**: Automatic redirect if not admin
- **All Reports View**: Displays reports from all users
- **Status Management**: Dropdown to update report status
- **Real-time Updates**: Refreshes after status change
- **Statistics**: Total report count
- **Error Handling**: 403 handling with user-friendly alerts

### Navigation Bar
- **Conditional Rendering**: Different links for authenticated/unauthenticated users
- **Role-Based Admin Link**: Admin Panel link only visible to users with "admin" role
- **Dynamic Role Detection**: Frontend fetches user role from backend on login
- **Features**: 
  - **Public**: Login/Register links
  - **Authenticated**: Dashboard, Report Issue, My Reports, Logout
  - **Admin Only**: Admin Panel (hidden from regular citizens)
- **Implementation**: Uses `AuthContext` to fetch and store user role via `GET /api/users/role/:email`

---

## 🖼️ Image Upload System

### Implementation Details

#### Backend (Upload Pipeline)
1. **Multer Configuration**
   - Memory storage (no disk writes)
   - File size limit: 5MB
   - File filter: Only image MIME types allowed

2. **Upload Process**
   ```
   Client → Multer → Base64 Conversion → Cloudinary → URL Response
   ```

3. **Cloudinary Integration**
   - **Configuration**: Environment variables for credentials
   - **Upload Folder**: `civicconnect/`
   - **Allowed Formats**: jpg, jpeg, png, gif
   - **Response**: Secure HTTPS URL

#### Frontend (User Experience)
1. **File Selection**: Browser file picker with image filter
2. **Preview**: Client-side preview using FileReader API
3. **Upload**: FormData submission to `/api/upload`
4. **State Management**: Loading states and error handling
5. **Integration**: Retrieved URL included in report submission

### Technical Flow
```javascript
// 1. User selects image
handleImageChange() → FileReader → Preview

// 2. Form submission
submitReport() → handleImageUpload() → Cloudinary

// 3. URL retrieval
Cloudinary returns secure_url → Included in report data

// 4. Report creation
POST /api/reports with imageUrl
```

---

## 🎯 Key Features & Implementation Highlights

### 1. Landing Page Experience
- **Professional Marketing Site**: First impression with hero section and compelling copy
- **Smart Navigation**: CTA buttons adapt based on authentication status
- **Feature Showcase**: Carousel displays key platform features
- **Community Trust**: Testimonials section builds credibility
- **No Clutter**: Clean design without navbar on landing page
- **Smooth Animations**: Transitions and hover effects enhance UX
- **Conversion Focused**: Clear call-to-actions guide users to register/login

### 2. Protected Routes
- React Router with authentication checks
- Seamless redirects for unauthorized access
- Global authentication state via Context API

### 3. Role-Based Access Control (RBAC)
- **Double-Layer Security**: Firebase auth + MongoDB role check
- **Backend Middleware**: `checkAdmin` validates role on every admin request
- **Frontend UI Control**: Admin Panel link hidden from regular citizens
- **Dynamic Role Fetching**: User role fetched from backend on authentication
- **Context Integration**: `AuthContext` stores `userRole` for global access
- **API Endpoint**: `GET /api/users/role/:email` returns user role
- **Conditional Rendering**: `{userRole === "admin" && <AdminLink />}`

### 4. Image Handling
- Client-side preview for better UX
- Cloud storage for scalability
- Automatic optimization via Cloudinary
- HTTPS-only image URLs for security

### 5. Real-time State Management
- Firebase `onAuthStateChanged` for login state
- React Context for global user state
- User role fetched and stored on authentication
- Automatic UI updates on authentication changes
- Role-based conditional rendering

### 6. Responsive Design
- Mobile-friendly layouts
- Consistent styling across pages
- Status badges with intuitive color coding
- Professional card-based UI

### 7. Error Handling
- Try-catch blocks in all async operations
- User-friendly error messages
- Console logging for debugging
- Graceful fallbacks

---

## ⚙️ Environment Setup & Configuration

### Backend Environment Variables
```env
# Database
MONGODB_URI=mongodb+srv://...

# Firebase Admin
FIREBASE_PROJECT_ID=...
FIREBASE_PRIVATE_KEY=...
FIREBASE_CLIENT_EMAIL=...

# Cloudinary
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# Server
PORT=5000
```

### Frontend Environment Variables
```env
# Firebase Client
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Firebase project
- Cloudinary account

### Installation Steps

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd CivicConnect
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create .env file with required variables
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   # Create .env file with Firebase config
   npm run dev
   ```

4. **Database Setup**
   - MongoDB Atlas cluster created
   - Connection string added to backend `.env`
   - Collections auto-created on first use

5. **Firebase Setup**
   - Create Firebase project
   - Enable Email/Password authentication
   - Download service account key
   - Configure Admin SDK in backend
   - Add web app and configure client keys

6. **Cloudinary Setup**
   - Create free account
   - Obtain API credentials
   - Add to backend `.env`
   - Folder structure: `civicconnect/`

---

## 🧪 Testing & Validation

### Manual Testing Checklist

#### Authentication Flow
- ✅ User registration creates Firebase account
- ✅ MongoDB user document created on registration
- ✅ Login redirects to dashboard
- ✅ Logout clears session
- ✅ Protected routes redirect when not authenticated

#### Report Functionality
- ✅ Image preview displays before upload
- ✅ Image uploads to Cloudinary successfully
- ✅ Report created with image URL
- ✅ Report displays in "My Reports"
- ✅ Status badges show correct colors
- ✅ Images render in report cards

#### Admin Functionality
- ✅ Admin panel accessible to admin users only
- ✅ Status updates persist to database
- ✅ Status dropdown updates report
- ✅ Non-admin redirected with error message
- ✅ All reports visible in admin panel

#### UI/UX
- ✅ Responsive design on mobile
- ✅ Loading states during operations
- ✅ Error messages user-friendly
- ✅ Form validation prevents empty submissions
- ✅ Consistent styling across pages

---

## 📈 Performance & Scalability

### Optimizations Implemented
1. **Image Optimization**: Cloudinary automatic format conversion and compression
2. **Database Indexing**: MongoDB indexes on `email` and `uid` for fast lookups
3. **Efficient Queries**: Specific field selection to reduce data transfer
4. **Client-Side Routing**: Fast navigation without page reloads
5. **Memory Efficient**: Multer memory storage for uploads

### Scalability Features
- Cloud-hosted database (MongoDB Atlas)
- CDN for image delivery (Cloudinary)
- Stateless API design
- Environment-based configuration

---

## 💻 Frontend-Backend Integration

### Authentication Flow
1. **User Login**: Firebase authenticates → Returns user object with email
2. **Role Fetch**: `AuthContext` calls `GET /api/users/role/:email`
3. **State Update**: `userRole` stored in context for global access
4. **UI Update**: Navbar conditionally renders Admin link based on role

### Data Flow
```
User Action → Component → AuthContext/API → Backend → Database → Response → UI Update
```

### Context API Structure
```javascript
AuthContext.Provider value={{
  user: FirebaseUser | null,
  userRole: "admin" | "citizen" | null
}}
```

### API Integration
- **Axios**: Used for all HTTP requests
- **Bearer Token**: Firebase ID token sent in Authorization header
- **Error Handling**: Try-catch with user-friendly alerts
- **Loading States**: UI feedback during async operations

---

## 🔒 Security Measures

1. **Authentication**: Firebase JWT tokens for API security
2. **Authorization**: Role-based access control with middleware
3. **File Validation**: MIME type checking for uploads
4. **File Size Limits**: 5MB max to prevent abuse
5. **Environment Variables**: Sensitive data not committed to code
6. **HTTPS**: All external URLs use secure connections
7. **CORS**: Configured for authorized origins only
8. **Role Validation**: Frontend AND backend checks for admin access

---

## 📝 Project Phases & Development Timeline

### Phase 1: Core Authentication ✅
- Firebase integration
- Registration and login
- Protected routes
- User context management

### Phase 2: Report Management ✅
- Report creation form
- Database models
- GET and POST endpoints
- My Reports page

### Phase 3: Admin Features ✅
- Admin panel
- Status management
- Role-based access control
- Admin middleware

### Phase 4: UI Polish & Image Upload ✅
- Image upload system
- Cloudinary integration
- Styling improvements
- Responsive design
- Status badges

### Phase 5: Final Polish & Presentation ✅
- Landing page with marketing content
- Role-based navigation (admin link conditional)
- Documentation
- Error handling
- Testing
- Code cleanup

---

## 🎓 Academic Considerations

### Technologies Justified
- **React**: Component-based architecture for maintainable code
- **MongoDB**: Document-based storage for flexible data structures
- **Firebase**: Secure authentication with minimal backend code
- **Cloudinary**: Reliable image hosting without server storage
- **Express**: RESTful API design for clear separation of concerns

### Learning Outcomes
- Full-stack development with modern frameworks
- Database design and NoSQL queries
- Authentication and authorization best practices
- Third-party API integration
- File upload and cloud storage implementation
- Role-based access control
- Responsive web design

---

## 🔮 Future Enhancements

### Potential Features
1. **Real-time Notifications**: Push notifications for status updates
2. **Maps Integration**: Google Maps for visual location selection
3. **Email Notifications**: Automated emails on report updates
4. **Advanced Filtering**: Search and sort reports
5. **Mobile App**: React Native version
6. **Analytics Dashboard**: Admin statistics and charts
7. **Comments System**: Citizen-administrator communication
8. **Report Prioritization**: Urgency levels for reports

---

## 💡 Code Examples & Implementation Details

### Role-Based Navigation Implementation

**Backend Controller** (`userController.js`):
```javascript
export const getUserRole = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.json({ role: "citizen" });
    }
    
    res.json({ role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

**Frontend Context** (`AuthContext.jsx`):
```javascript
const [userRole, setUserRole] = useState(null);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    setUser(currentUser);
    
    if (currentUser?.email) {
      const response = await axios.get(
        `http://localhost:5000/api/users/role/${currentUser.email}`
      );
      setUserRole(response.data.role);
    }
  });
  return () => unsubscribe();
}, []);
```

**Navigation Conditional Rendering** (`Navbar.jsx`):
```javascript
{userRole === "admin" && (
  <Link to="/admin">Admin</Link>
)}
```

### Landing Page Smart Routing

**Home Component** (`Home.jsx`):
```javascript
const handleStartReporting = () => {
  if (user) {
    navigate("/dashboard");  // Authenticated users
  } else {
    navigate("/login");      // Unauthenticated users
  }
};
```

### Protected Route Example

```javascript
<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminPanel />
    </ProtectedRoute>
  }
/>
```

---

## 📄 License & Credits

### Development Team
- Project conception and implementation
- Full-stack development
- UI/UX design
- Testing and documentation

### Technologies Used
- Firebase (Google)
- MongoDB Atlas
- Cloudinary
- React (Meta)
- Express.js

---

## 📞 Support & Contact

For questions or issues, please refer to the project documentation or contact the development team.

---

**Project Status**: ✅ Complete and Production-Ready

**Last Updated**: 2025
