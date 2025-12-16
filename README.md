# SaaS Image Generation App

A modern SaaS application for generating images using AI, built with React frontend and Node.js backend. Users can create accounts, generate images, and purchase credits for unlimited access.

## Features

- **User Authentication**: Secure login and signup with JWT tokens
- **Image Generation**: AI-powered image creation with customizable prompts
- **Credit System**: Purchase credits using Razorpay integration
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS
- **Real-time Notifications**: Toast notifications for user feedback
- **Admin Dashboard**: Manage users and transactions (backend support)

## Tech Stack

### Frontend
- **React 19** - Modern JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Declarative routing for React
- **Axios** - HTTP client for API requests
- **React Toastify** - Toast notifications
- **Motion** - Animation library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **Razorpay** - Payment gateway integration
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Razorpay account for payments
- AI image generation API (e.g., OpenAI DALL-E, Midjourney API, or similar)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/abhaygarg3504/saas-img-gen.git
   cd saas-img-gen
   ```

2. **Install backend dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup:**

   Create `.env` file in the `server` directory:
   ```env
   PORT=4000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   AI_API_KEY=your_ai_image_generation_api_key
   ```

## Running the Application

### Development Mode

1. **Start the backend server:**
   ```bash
   cd server
   npm run server
   ```
   Server will run on `http://localhost:4000`

2. **Start the frontend:**
   ```bash
   cd client
   npm run dev
   ```
   Frontend will run on `http://localhost:5173` (default Vite port)

### Production Build

1. **Build the frontend:**
   ```bash
   cd client
   npm run build
   ```

2. **Start the backend:**
   ```bash
   cd server
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `GET /api/user/credits` - Get user credits

### Image Generation
- `POST /api/image/generate` - Generate image with prompt
- `GET /api/image/history` - Get user's image generation history

### Payments
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment

## Project Structure

```
saas-img-gen/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context for state management
│   │   └── assets/
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js backend
│   ├── config/
│   │   └── db.js           # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middlewares/        # Custom middlewares
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── server.js           # Main server file
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For support, email abhaygarg5684@gmail.com or create an issue in this repository.

---

Built with ❤️ using React and Node.js
