# AI-Based Portfolio Generator

A production-ready, secure AI-powered portfolio generator built with React and OpenAI. **Describe yourself in one prompt, and AI generates your complete professional portfolio in seconds!**

## ✨ Features

- **🚀 One-Prompt Generation**: Just describe yourself, AI does the rest!
- **🔐 Secure Authentication**: Login/Signup system to protect your portfolios
- **🏠 Professional Landing Page**: Beautiful home page with feature showcase
- **🤖 AI-Powered**: Uses mock AI (no API costs!) to generate complete portfolios
- **🎨 3 Professional Themes**: Minimal, Modern, and Creative designs
- **📤 Multiple Export Formats**: HTML, React Component, and PDF
- **🔒 Secure by Design**: Authentication required, input sanitization, XSS protection
- **📱 Responsive Design**: Works perfectly on all devices
- **⚡ Lightning Fast**: Get your portfolio in 3-5 seconds
- **✨ No Manual Work**: AI generates everything automatically
- **💯 100% Free**: No API costs, completely free to use

## 🔒 Security Features

- **User Authentication**: Login/Signup required to access portfolio generator
- **Protected Routes**: Only authenticated users can create portfolios
- **Local Storage**: Secure data storage in browser (no server required)
- Input sanitization to prevent XSS attacks
- Rate limiting protection
- Safe API calls with timeout protection
- Environment variable protection
- No sensitive data in exports

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- **No API key needed!** (Using free mock AI)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Riya123rohilla/portfoliogenratorAI.git
   cd portfoliogenratorAI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:3000
   ```
   
   Edit `.env` and add your OpenAI API key:
   ```
   VITE_OPENAI_API_KEY=sk-your-api-key-here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
portfoliogenratorAI/
├── src/
│   ├── components/
│   │   ├── forms/
│   │   │   ├── PersonalInfoForm.jsx
│   │   │   ├── ExperienceForm.jsx
│   │   │   ├── EducationForm.jsx
│   │   │   ├── SkillsForm.jsx
│   │   │   ├── ProjectsForm.jsx
│   │   │   └── CertificationsForm.jsx
│   │   ├── preview/
│   │   │   ├── PortfolioPreview.jsx
│   │   │   └── themes/
│   │   │       ├── MinimalTheme.jsx
│   │   │       ├── ModernTheme.jsx
│   │   │       └── CreativeTheme.jsx
│   │   ├── MainApp.jsx
│   │   ├── StepIndicator.jsx
│   │   └── PreviewExport.jsx
│   ├── context/
│   │   └── PortfolioContext.jsx
│   ├── utils/
│   │   ├── aiService.js
│   │   ├── security.js
│   │   └── exportUtils.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── .env.example
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 Available Themes

1. **Minimal**: Clean, professional design with simple layouts
2. **Modern**: Bold gradients and contemporary styling
3. **Creative**: Vibrant colors and unique visual elements

## 📤 Export Options

### HTML Export
- Standalone HTML file with embedded CSS
- No dependencies required
- Ready to host anywhere

### React Component Export
- Full React component with Tailwind classes
- Drop into any React project
- Customizable and maintainable

### PDF Export
- Print-ready document
- Professional formatting
- Perfect for applications

## 🛠️ Technologies Used

- **React 18**: Modern UI library
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **OpenAI API**: AI-powered content enhancement
- **html2canvas**: HTML to canvas conversion
- **jsPDF**: PDF generation
- **Lucide React**: Beautiful icons
- **React Hot Toast**: Elegant notifications

## 🔧 Development

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

### Lint code
```bash
npm run lint
```

## 🌟 Usage Guide

### Step-by-Step: Create Your Portfolio in 30 Seconds

1. **Visit the Home Page** at `http://localhost:3000`
   - View features and "How It Works" section
   - Click "Get Started" or "Sign In"

2. **Create an Account** (or Login)
   - Enter your name, email, and password
   - Your data is stored securely on your device
   - Click "Create Account"

3. **Describe Yourself** (50+ characters)
   Include:
   - Your role/title (e.g., "Software Engineer", "Designer")
   - Years of experience
   - Key skills and technologies
   - Companies you've worked at
   - Education background
   - Notable projects or achievements
   - Your passions and interests

4. **Generate Portfolio**
   - Click "Generate My Portfolio with AI"
   - Watch as AI creates your complete portfolio in 3-5 seconds
   
5. **Customize & Export**
   - Choose from 3 professional themes (Minimal, Modern, Creative)
   - Preview your portfolio in real-time
   - Export as:
     - **HTML**: Standalone website file
     - **React Component**: Ready to use in React apps
     - **PDF**: Professional document (perfect for sharing!)

6. **Start Over** (Optional)
   - Click "Start Over" to create a new portfolio
   - All your portfolios are saved automatically

4. **Wait 10-20 seconds** while AI creates:
   - Personal information and professional bio
   - 2-3 detailed work experiences
   - Education history
   - 8-15 relevant skills
   - 3-5 impressive projects
   - Professional certifications

5. **Choose a theme** (Minimal, Modern, or Creative)

6. **Export** in your preferred format (HTML, React, or PDF)

### Example Prompts

**Software Engineer:**
```
I'm a Senior Full Stack Developer with 5 years of experience in React, Node.js, 
and AWS. I've worked at tech startups building scalable web applications, led a 
team of 4 developers, and contributed to open-source projects. I have a Computer 
Science degree from MIT and am passionate about clean code and mentoring.
```

**Data Scientist:**
```
Experienced Data Scientist with 6 years in machine learning, Python, and big data. 
Worked at Google and Facebook on recommendation systems and user analytics. PhD in 
Statistics from Stanford. Published 5 research papers in AI/ML conferences. Built 
models serving millions of users.
```

**Designer:**
```
Creative UI/UX Designer with 7 years designing mobile apps and web platforms. 
Proficient in Figma, Adobe XD, and user research. Led design at Apple and Airbnb, 
improving user engagement by 40%. Masters in Design from Parsons. Love creating 
accessible, beautiful experiences.
```

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_OPENAI_API_KEY` | Your OpenAI API key | Yes |

## 🚨 Important Security Notes

### For Production Deployment:

1. **Never expose API keys in frontend**: Use a backend proxy
2. **Implement server-side validation**: Don't trust client-side only
3. **Add authentication**: Protect user data with proper auth
4. **Use HTTPS**: Always encrypt data in transit
5. **Set up CORS properly**: Restrict API access to your domain

### Recommended Backend Setup:

```javascript
// Example Express.js backend proxy
app.post('/api/refine', async (req, res) => {
  // Validate request
  // Check user authentication
  // Rate limit by user
  // Call OpenAI API
  // Return sanitized response
});
```

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on GitHub.

## 🎯 Roadmap

- [ ] Backend API for secure OpenAI integration
- [ ] User authentication and data persistence
- [ ] More theme options
- [ ] Additional export formats (Markdown, JSON)
- [ ] Template marketplace
- [ ] Collaborative editing
- [ ] SEO optimization for exported portfolios

## 👏 Acknowledgments

- OpenAI for the GPT-3.5 API
- Tailwind CSS for the amazing utility framework
- React team for the excellent library
- All contributors and users

---

**Built with ❤️ for developers by developers**
