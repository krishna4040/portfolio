import mongoose from "mongoose"
import Project from "../server/models/project.js"
import About from "../server/models/about.js"
import Skill from "../server/models/skill.js"
import WorkExperience from "../server/models/workExperience.js"
import ContactInfo from "../server/models/contactInfo.js"
import dotenv from "dotenv"

dotenv.config({ path: ".env.production" })

const seedData = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log("Connected to database")

    // Clear existing data
    await Promise.all([
      Project.deleteMany({}),
      About.deleteMany({}),
      Skill.deleteMany({}),
      WorkExperience.deleteMany({}),
      ContactInfo.deleteMany({}),
    ])

    console.log("Cleared existing data")

    // Seed About
    const aboutData = {
      name: "Krishna Jain",
      title: "Full Stack Developer",
      description:
        "Passionate developer with expertise in modern web technologies",
      bio: "I am a dedicated full-stack developer with a passion for creating innovative web solutions. Currently pursuing BE(IT) at UIET, Panjab University, I specialize in the MERN stack and have experience with Next.js and TypeScript.",
      profileImage: `${process.env.BASE_URL}/server/uploads/profiles/profile.jpg`,
      resumeUrl: `${process.env.BASE_URL}/server/uploads/resumes/resume.pdf`,
      socialLinks: {
        github: "https://github.com/krishna4040",
        linkedin: "https://www.linkedin.com/in/krishna-jain-842539205/",
        twitter: "https://x.com/krishna5048",
        email: "krishnajain5050@gmail.com",
      },
      isActive: true,
    }

    await About.create(aboutData)
    console.log("Seeded About data")

    // Seed Skills
    const skillsData = [
      // Frontend
      {
        name: "HTML",
        category: "frontend",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
        proficiency: 5,
        yearsOfExperience: 3,
        order: 1,
      },
      {
        name: "CSS",
        category: "frontend",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
        proficiency: 5,
        yearsOfExperience: 3,
        order: 2,
      },
      {
        name: "JavaScript",
        category: "frontend",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
        proficiency: 5,
        yearsOfExperience: 3,
        order: 3,
      },
      {
        name: "TypeScript",
        category: "frontend",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
        proficiency: 4,
        yearsOfExperience: 2,
        order: 4,
      },
      {
        name: "React",
        category: "frontend",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
        proficiency: 5,
        yearsOfExperience: 2,
        order: 5,
      },
      {
        name: "Next.js",
        category: "frontend",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
        proficiency: 4,
        yearsOfExperience: 1,
        order: 6,
      },
      {
        name: "Tailwind CSS",
        category: "frontend",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original-wordmark.svg",
        proficiency: 5,
        yearsOfExperience: 2,
        order: 7,
      },
      {
        name: "Redux",
        category: "frontend",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg",
        proficiency: 4,
        yearsOfExperience: 2,
        order: 8,
      },

      // Backend
      {
        name: "Node.js",
        category: "backend",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
        proficiency: 5,
        yearsOfExperience: 2,
        order: 1,
      },
      {
        name: "Express.js",
        category: "backend",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
        proficiency: 5,
        yearsOfExperience: 2,
        order: 2,
      },

      // Database
      {
        name: "MongoDB",
        category: "database",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
        proficiency: 4,
        yearsOfExperience: 2,
        order: 1,
      },

      // Tools
      {
        name: "Git",
        category: "tools",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
        proficiency: 5,
        yearsOfExperience: 3,
        order: 1,
      },
      {
        name: "GitHub",
        category: "tools",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
        proficiency: 5,
        yearsOfExperience: 3,
        order: 2,
      },
      {
        name: "Docker",
        category: "tools",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
        proficiency: 3,
        yearsOfExperience: 1,
        order: 3,
      },
      {
        name: "Vite",
        category: "tools",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
        proficiency: 4,
        yearsOfExperience: 1,
        order: 4,
      },

      // Cloud
      {
        name: "Vercel",
        category: "cloud",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
        proficiency: 4,
        yearsOfExperience: 1,
        order: 1,
      },

      // Other
      {
        name: "Socket.io",
        category: "other",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg",
        proficiency: 3,
        yearsOfExperience: 1,
        order: 1,
      },
      {
        name: "Firebase",
        category: "other",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
        proficiency: 3,
        yearsOfExperience: 1,
        order: 2,
      },
    ]

    await Skill.insertMany(skillsData)
    console.log("Seeded Skills data")

    // Seed Work Experience
    const workExperienceData = [
      {
        company: "Tech Solutions Inc.",
        position: "Senior Full Stack Developer",
        location: "Remote",
        startDate: new Date("2023-01-01"),
        endDate: null, // Current job
        description:
          "Leading development of scalable web applications using modern technologies.",
        responsibilities: [
          "Architected and developed full-stack web applications using MERN stack",
          "Led a team of 5 developers in agile development processes",
          "Implemented CI/CD pipelines reducing deployment time by 60%",
          "Mentored junior developers and conducted code reviews",
        ],
        technologies: [
          "React",
          "Node.js",
          "MongoDB",
          "AWS",
          "Docker",
          "TypeScript",
        ],
        achievements: [
          "Increased application performance by 40%",
          "Reduced deployment time by 60%",
          "Successfully delivered 5 major projects on time",
        ],
        employmentType: "full-time",
        companyLogo: "/company-logo.png",
        companyWebsite: "https://techsolutions.com",
        isVisible: true,
        order: 1,
      },
      {
        company: "StartupXYZ",
        position: "Frontend Developer",
        location: "San Francisco, CA",
        startDate: new Date("2021-06-01"),
        endDate: new Date("2022-12-31"),
        description:
          "Developed responsive web applications and improved user experience.",
        responsibilities: [
          "Built responsive React applications with modern UI/UX principles",
          "Collaborated with design team to implement pixel-perfect designs",
          "Optimized application performance and improved loading times",
          "Integrated RESTful APIs and managed application state",
        ],
        technologies: ["React", "TypeScript", "Tailwind CSS", "Redux", "Jest"],
        achievements: [
          "Improved user engagement by 25%",
          "Reduced page load times by 30%",
        ],
        employmentType: "full-time",
        companyLogo: "/company-logo.png",
        companyWebsite: "https://startupxyz.com",
        isVisible: true,
        order: 2,
      },
      {
        company: "Freelance",
        position: "Web Developer",
        location: "Remote",
        startDate: new Date("2020-01-01"),
        endDate: new Date("2021-05-31"),
        description: "Provided web development services to various clients.",
        responsibilities: [
          "Developed custom websites for small businesses",
          "Maintained and updated existing web applications",
          "Provided technical consultation and support",
        ],
        technologies: ["HTML", "CSS", "JavaScript", "WordPress", "PHP"],
        achievements: [
          "Successfully completed 15+ projects",
          "Maintained 100% client satisfaction rate",
        ],
        employmentType: "freelance",
        isVisible: true,
        order: 3,
      },
    ]

    await WorkExperience.insertMany(workExperienceData)
    console.log("Seeded Work Experience data")

    // Seed Contact Info
    const contactInfoData = {
      email: "krishnajain5050@gmail.com",
      phone: "+91 9997833253",
      location: {
        city: "Chandigarh",
        state: "Punjab",
        country: "India",
      },
      availability: "available",
      preferredContactMethod: "email",
      responseTime: "24 hours",
      workingHours: {
        timezone: "IST",
        start: "09:00",
        end: "18:00",
      },
      socialLinks: {
        github: "https://github.com/krishna4040",
        linkedin: "https://www.linkedin.com/in/krishna-jain-842539205/",
        twitter: "https://x.com/krishna5048",
        instagram: "https://www.instagram.com/_its__krish_/",
        website: `${process.env.BASE_URL}`,
      },
      isActive: true,
    }

    await ContactInfo.create(contactInfoData)
    console.log("Seeded Contact Info data")

    // Seed Projects (from existing seed)
    const projectsData = [
      {
        title: "Study Notion",
        description: "Its a modern Ed-tech platform for teachers and students",
        shortDescription:
          "Modern Ed-tech platform with course management and video streaming",
        longDescription:
          "A comprehensive education platform built with MERN stack featuring course management, video streaming, payment integration, and real-time communication. Students can enroll in courses, watch video lectures, take quizzes, and interact with instructors. The platform includes secure payment processing, progress tracking, and certificate generation.",
        githubUrl: "https://github.com/krishna4040/study-notion",
        liveUrl: "https://study-notion-ten-snowy.vercel.app/",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        imageUrl: `${process.env.BASE_URL}/server/uploads/backgrounds/study-notion.png`,
        images: [
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
          "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800",
        ],
        videos: [
          "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
        ],
        features: [
          "Course management system with video streaming",
          "Secure payment integration with Razorpay",
          "Real-time progress tracking and analytics",
          "Interactive quizzes and assignments",
          "Certificate generation upon completion",
          "Instructor dashboard with student management",
        ],
        collaborators: ["Krishna Jain", "Team Member 1"],
        startDate: new Date("2023-06-01"),
        endDate: new Date("2023-09-30"),
        status: "completed",
        technologies: [
          {
            name: "React",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
          },
          {
            name: "Node.js",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
          },
          {
            name: "MongoDB",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
          },
          {
            name: "Express",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
          },
          {
            name: "TypeScript",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
          },
        ],
        githubData: {
          stars: 45,
          forks: 12,
          language: "JavaScript",
          lastUpdated: new Date(),
        },
        isFeatured: true,
        isVisible: true,
        order: 1,
      },
      {
        title: "Together",
        description: "A platform for real time messaging audio and video call",
        shortDescription: "Real-time communication platform with video calling",
        longDescription:
          "Social media platform with real-time communication features including text messaging, voice calls, video calls, and file sharing using WebRTC technology. Built with modern web technologies to provide seamless communication experience with features like group chats, media sharing, and online status indicators.",
        githubUrl: "https://github.com/krishna4040/Together",
        liveUrl: "https://together-social-media.netlify.app/",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        imageUrl: `${process.env.BASE_URL}/server/uploads/backgrounds/together.png`,
        images: [
          "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800",
          "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800",
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
        ],
        videos: [
          "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
        ],
        features: [
          "Real-time text messaging with Socket.io",
          "Video and audio calling with WebRTC",
          "File and media sharing capabilities",
          "Group chat functionality",
          "Online status indicators",
          "Message encryption for security",
          "Mobile-responsive design",
        ],
        collaborators: ["Krishna Jain"],
        startDate: new Date("2023-03-01"),
        endDate: new Date("2023-05-30"),
        status: "completed",
        technologies: [
          {
            name: "React",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
          },
          {
            name: "Node.js",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
          },
          {
            name: "Socket.io",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg",
          },
          {
            name: "MongoDB",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
          },
        ],
        githubData: {
          stars: 32,
          forks: 8,
          language: "JavaScript",
          lastUpdated: new Date(),
        },
        isFeatured: true,
        isVisible: true,
        order: 2,
      },
      {
        title: "Portfolio Website",
        description: "Personal portfolio website with admin panel",
        shortDescription: "Modern portfolio with dark mode and admin dashboard",
        longDescription:
          "A comprehensive portfolio website built with MERN stack featuring a dynamic admin panel for content management. Includes dark mode support, responsive design, project showcase, skills management, and contact form integration. The admin panel allows for easy content updates without code changes.",
        githubUrl: "https://github.com/krishna4040/portfolio",
        liveUrl: "https://krishna-portfolio.vercel.app/",
        imageUrl: `${process.env.BASE_URL}/server/uploads/backgrounds/portfolio.png`,
        images: [
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
        ],
        features: [
          "Dynamic content management through admin panel",
          "Dark mode with smooth transitions",
          "Responsive design for all devices",
          "Project showcase with detailed pages",
          "Skills and experience management",
          "Contact form with email integration",
          "SEO optimized with meta tags",
        ],
        collaborators: ["Krishna Jain"],
        startDate: new Date("2024-01-01"),
        endDate: null,
        status: "in-progress",
        technologies: [
          {
            name: "React",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
          },
          {
            name: "Node.js",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
          },
          {
            name: "MongoDB",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
          },
          {
            name: "Tailwind CSS",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
          },
        ],
        githubData: {
          stars: 15,
          forks: 3,
          language: "JavaScript",
          lastUpdated: new Date(),
        },
        isFeatured: true,
        isVisible: true,
        order: 3,
      },
    ]

    await Project.insertMany(projectsData)
    console.log("Seeded Projects data")

    console.log("All data seeded successfully!")
    process.exit(0)
  } catch (error) {
    console.error("Error seeding data:", error)
    process.exit(1)
  }
}

seedData()
