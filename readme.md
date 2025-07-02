# CodeLeap 🚀

<div align="center">
  <img src="logo.png" alt="CodeLeap Logo" width="200"/>
  
  **Enhance Your Coding Skills Today!**
  
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
  [![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](package.json)
  [![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](builds)
</div>

## 📖 About

CodeLeap is an interactive coding practice platform designed to help developers enhance their programming skills through practical challenges. Master coding problems with hands-on experience and improve your problem-solving abilities with expert-led tutorials across multiple programming languages.

## ✨ Features

- **🎯 Interactive Coding Challenges** - Solve problems ranging from Easy to Hard difficulty levels
- **📊 Progress Tracking** - Monitor your coding journey with detailed statistics and streaks
- **💻 Multi-Language Support** - Practice in JavaScript, Python, Java, and more
- **⚡ Real-time Code Execution** - Test your solutions instantly with our online code editor
- **📈 Performance Analytics** - Track your success rate, average completion time, and improvement over time
- **🏆 Achievement System** - Maintain coding streaks and unlock achievements
- **📚 Problem Categories** - Organized by topics like algorithms, data structures, mathematics, and more
- **💾 Solution Bookmarking** - Save and revisit your favorite problems
- **👥 Community Features** - Share solutions and discuss approaches with other developers

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Modern web browser

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/sanketsingh01/CodeLeap
   cd codeleap
   ```

2. **Backend Setup**

   ```bash
   cd BACKEND
   npm install
   # Set up environment variables
   cp .env.example .env
   # Edit .env with your database and API configuration

   # Set up Prisma database
   npx prisma generate
   npx prisma db push
   npx prisma db seed

   # Start the backend server
   npm start
   # Backend will run on http://localhost:5000
   ```

3. **Frontend Setup**

   ```bash
   cd ../FRONTEND
   npm install
   # Start the frontend development server
   npm run dev
   # Frontend will run on http://localhost:5173
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
codeleap/
├── FRONTEND/
│   ├── public/
│   │   ├── images/
│   │   ├── favicon.ico
│   │   └── index.html
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── styles/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── CodeEditor/
│   │   │   ├── ProblemList/
│   │   │   ├── UserProfile/
│   │   │   └── UI/
│   │   ├── layout/
|   |   |    └── Layout.jsx
│   │   ├── pages/
│   │   │   ├── Profile/
│   │   │   ├── Problems/
│   │   │   ├── Profile/
│   │   │   ├── Auth/
│   │   │   └── Landing/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── App.js
│   |   ├── package.json
│   └── README.md
├── BACKEND/
│   ├── src/
│   │   ├── models/
│   │   │   ├── auth.js
│   │   │   ├── Problem.js
│   │   │   └── Submissions.js
│   │   ├── assets
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── problemController.js
│   │   │   └── userController.js
│   │   ├── middlewares/
│   │   │   ├── auth.js
│   │   │   ├── validation.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── problems.js
│   │   │   └── users.js
│   │   ├── utils/
│   │   │   ├── database.js
│   │   │   └── constants.js
│   │   └── validators/
│   │       ├── authValidator.js
│   │       ├── problemValidator.js
│   │       └── userValidator.js
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seed.js
│   ├── index.js
│   ├── package.json
│   └── .env.example
├── .gitignore
├── docker-compose.yml
└── README.md
```

## 🎮 How to Use

### For Beginners

1. **Create an Account** - Sign up to track your progress
2. **Start with Easy Problems** - Begin with fundamental coding challenges
3. **Use the Code Editor** - Write your solution in the integrated editor
4. **Test Your Code** - Run test cases to verify your solution
5. **Submit and Learn** - Submit your solution and review explanations

### For Advanced Users

1. **Filter by Difficulty** - Challenge yourself with Medium and Hard problems
2. **Track Your Streaks** - Maintain daily coding practice
3. **Explore Different Languages** - Switch between JavaScript, Python, and Java
4. **Analyze Performance** - Review your success rate and improvement metrics
5. **Create Custom Sheets** - Organize problems into personalized study lists

## 📊 User Dashboard Features

- **Progress Overview**: Visual representation of solved problems (1 of 22 completed)
- **Difficulty Breakdown**: Track Easy, Medium, and Hard problem completion
- **Statistics Panel**:
  - Languages practiced
  - Average completion time
  - Total submissions
  - Success rate
- **Streak Tracking**: Current streak and best streak
- **Language Proficiency**: JavaScript, Python, Java support

## 🛠️ Technologies Used

### Frontend

- **React.js** - User interface framework
- **Tailwind CSS** - Styling and responsive design
- **Monaco Editor** - Code editing experience
- **React Router** - Navigation and routing
- **Axios** - API communication

### Backend

- **Node.js** - Server runtime
- **Express.js** - Web application framework
- **Prisma** - Database ORM and query builder
- **PostgreSQL/MySQL** - Database (configurable via Prisma)
- **JWT** - Authentication and authorization
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Development Tools

- **Webpack** - Module bundling
- **Babel** - JavaScript compilation
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework

## 🚀 Deployment

### Production Build

```bash
npm run build
# or
yarn build
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy automatically on push to main branch

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📝 API Documentation

### Authentication Endpoints

- `POST /api/v1/v1/auth/register` - User registration
- `POST /api/v1/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout

### Problem Endpoints

- `GET /api/v1/problems` - Fetch all problems
- `GET /api/v1/problems/:id` - Get specific problem
- `POST /api/v1/problems/:id/submit` - Submit solution

### User Endpoints

- `GET /api/v1/user/profile` - Get user profile
- `PUT /api/v1/user/checkAuth` - checks the authenticated user

## 🐛 Known Issues

- [ ] Code editor occasionally loses focus on mobile devices
- [ ] Performance optimization needed for large problem sets
- [ ] Pricing page is in development

## 📋 Roadmap

### Version 1.1.0

- [ ] Advanced code debugging tools
- [ ] Video solution explanations
- [ ] Mobile app development
- [ ] Social coding features

### Version 1.2.0

- [ ] AI-powered hint system
- [ ] Contest mode
- [ ] Team challenges
- [ ] Advanced analytics dashboard

## 📞 Support

If you encounter any issues or have questions:

- **Email**: support@codeleap.com
- **GitHub Issues**: [Create an issue](https://github.com/sanketsingh01/CodeLeap/issues)
- **Discord**: [Join our community](https://discord.gg/EbhvYvCV)
- **Documentation**: [Visit our docs](https://docs.codeleap.in)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape CodeLeap
- Inspired by popular coding platforms like LeetCode and HackerRank
- Special thanks to the open-source community for tools and libraries

## 📈 Statistics

- **Active Users**: 10+
- **Problems Available**: 20+
- **Solutions Submitted**:
- **Languages Supported**: 3

---

<div align="center">
  <p>Made with ❤️ by the CodeLeap Team</p>
  <p>
    <a href="https://codeleap.in">Website</a> •
    <a href="https://x.com/SinghSanket78">Twitter</a> •
    <a href="https://www.linkedin.com/in/sanket-singh-5359732b8/">LinkedIn</a>
  </p>
</div>
