import jsPDF from 'jspdf';
import { getImageAsBase64 } from './imageToBase64';

export const generateResumePDF = async () => {
  const resumeData = {
    name: 'David Alberto Guzmán Ardila',
    title: 'Software Engineer & Security Analyst',
    email: 'davidalbertoguz@gmail.com',
    phone: '+57 317 527 0029',
    location: 'Cali, Valle del Cauca, Colombia',
    linkedin: 'https://www.linkedin.com/in/david-alberto-guzm%C3%A1n-ardila-35417a220/',
    github: 'https://github.com/Daga2001',
    anexes: 'https://drive.google.com/drive/folders/11HETfasREel5kZgTxfvZatfKrITk8M72?usp=drive_link',
    
    summary: 'Experienced Software Engineer specializing in cloud-based applications for the financial sector using AWS. Expert in implementing secure software solutions with cybersecurity best practices and ISO 27001 standards. Passionate about leveraging AI and machine learning to drive innovation, improve operational efficiency, and enhance decision-making in financial systems. My goal is to design intelligent, scalable, and secure systems that make a real-world impact.',
    
    experience: [
      {
        title: 'Software Engineer',
        company: 'TSI s.a.s',
        location: 'Cali, Valle del Cauca',
        period: 'Mar 2022 - Present',
        responsibilities: [
          'Design, develop, and maintain cloud-based applications for the financial sector using AWS',
          'Implement secure software solutions aligned with cybersecurity best practices and ISO 27001 standards',
          'Build and integrate AI models for data imputation, analysis, and automation within company-specific applications',
          'Develop scalable full-stack applications with Angular, .Net Core, .Net Framework and Node.js, ensuring high performance and maintainability',
          'Collaborate with cross-functional teams to translate business requirements into technical solutions.',
          'Design and develop relational databases for web applications dedicated to leading financial institutions in Colombia'
        ]
      }
    ],
    
    skills: [
      'Machine Learning', 'Deep Learning', 'English (B1)', 'Critical Thinking', 
      'Communication', 'React', 'Angular', 'Generative AI',
      'AWS', 'Docker', 'PostgreSQL', 'Sql Server',
      'PyTorch', 'Django', 'REST APIs'
    ],
    
    projects: [
      {
        name: 'BioSentinel-UV',
        description: 'AI-powered satellite imagery analysis for ecosystem monitoring using machine learning models',
        technologies: ['Python', 'PyTorch', 'Google Earth Engine', 'Three.js']
      },
      {
        name: 'SIREG',
        description: 'Regulatory Reporting System for Financial Entities in Colombia',
        technologies: ['ASP.NET', 'VB.NET', 'jQuery', 'SQL Server']
      },
      {
        name: 'Freelearning',
        description: 'An educational platform designed for schools to help children improve soft and basic skills through interactive and entertaining games.',
        technologies: ['Html', 'Css', 'JavaScript']
      },
    ],
    
    education: [
      {
        degree: 'Systems Engineering',
        institution: 'Universidad del Valle',
        location: 'Cali, Colombia',
        period: '2019 - 2024'
      }
    ],
    
    hobbies: [
      'Software Development',
      'Cybersecurity Research',
      'AI/ML Projects',
      'Chess and Strategy Games',
      'Jogging',
    ]
  };

  const doc = new jsPDF();
  const primaryColor = [0, 168, 120]; // Darker green-teal
  const darkColor = [15, 23, 42]; // Darker navy
  const accentColor = [30, 41, 59]; // Slate
  const lightGray = [248, 250, 252]; // Very light gray
  const mediumGray = [100, 116, 139]; // Medium gray
  
  let yPosition = 30;

  // Modern header with gradient effect
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, 210, 50, 'F');
  
  // Accent line
  doc.setFillColor(...primaryColor);
  doc.rect(0, 45, 210, 3, 'F');
  
  // Add profile picture in upper right corner
  try {
    const imgSize = 35;
    const imgX = 160;
    const imgY = 8;
    
    // White circular background
    doc.setFillColor(255, 255, 255);
    doc.circle(imgX + imgSize/2, imgY + imgSize/2, imgSize/2, 'F');
    
    // Load and add the actual image
    const imgData = getImageAsBase64();
    doc.addImage(imgData, 'JPEG', imgX + 7, imgY + 4.5, imgSize - 14, imgSize - 9);
    
  } catch (error) {
    // Fallback to initials if image fails
    doc.setFillColor(...primaryColor);
    doc.circle(imgX + imgSize/2, imgY + imgSize/2, (imgSize/2) - 2, 'F');
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('DG', imgX + imgSize/2, imgY + imgSize/2 + 3, { align: 'center' });
  }
  
  // Name with better typography (adjusted for image)
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(26);
  doc.setFont('helvetica', 'bold');
  doc.text(resumeData.name, 95, yPosition, { align: 'center' });
  yPosition += 12;
  
  // Title with accent color
  doc.setTextColor(...primaryColor);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text(resumeData.title, 95, yPosition, { align: 'center' });
  
  // Reset position and color
  doc.setTextColor(0, 0, 0);
  yPosition = 65;
  
  // Professional contact section
  doc.setFillColor(...lightGray);
  doc.rect(20, yPosition - 3, 170, 18, 'F');
  doc.setDrawColor(...mediumGray);
  doc.setLineWidth(0.5);
  doc.rect(20, yPosition - 3, 170, 18, 'S');
  
  doc.setFontSize(9);
  doc.setTextColor(...accentColor);
  doc.text(`Email: ${resumeData.email}`, 25, yPosition + 3);
  doc.text(`Phone: ${resumeData.phone}`, 25, yPosition + 8);
  doc.text(`Location: ${resumeData.location}`, 25, yPosition + 13);
  
  const Offset = 3.2
  doc.setTextColor(0, 102, 204); // hyperlink blue
  doc.textWithLink('LinkedIn: David Guzmán', 110, yPosition + Offset, { url: resumeData.linkedin });
  
  doc.setTextColor(0, 102, 204); // hyperlink blue
  doc.textWithLink('GitHub: Daga2001', 110, yPosition + Offset + 5, { url: resumeData.github });

  doc.setTextColor(0, 102, 204); // hyperlink blue
  doc.textWithLink('Anexes: Certificates & More', 110, yPosition + Offset + 10, { url: resumeData.anexes });
  
  yPosition += 28;
  
  // Column layout variables
  const leftColumnX = 20;
  const rightColumnX = 110;
  const columnWidth = 80;
  let leftColumnY = yPosition;
  let rightColumnY = yPosition;
  
  // Enhanced section helper function for columns
  const addSection = (title, content, isRightColumn = false) => {
    const currentX = isRightColumn ? rightColumnX : leftColumnX;
    const currentY = isRightColumn ? rightColumnY : leftColumnY;
    
    // Modern section header
    doc.setFillColor(...darkColor);
    doc.rect(currentX, currentY - 2, columnWidth, 8, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(title, currentX + 5, currentY + 3);
    
    // Accent line under header
    doc.setFillColor(...primaryColor);
    doc.rect(currentX, currentY + 6, columnWidth, 1, 'F');
    
    const contentY = currentY + 14;
    doc.setTextColor(0, 0, 0);
    const newY = content(currentX, contentY);
    
    if (isRightColumn) {
      rightColumnY = newY + 10;
    } else {
      leftColumnY = newY + 10;
    }
  };
  
  // Full-width summary section
  const addFullWidthSection = (title, content) => {
    doc.setFillColor(...darkColor);
    doc.rect(20, yPosition - 2, 170, 10, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(title, 25, yPosition + 4);
    
    doc.setFillColor(...primaryColor);
    doc.rect(20, yPosition + 8, 170, 1, 'F');
    
    yPosition += 18;
    doc.setTextColor(0, 0, 0);
    content();
    leftColumnY = rightColumnY = yPosition + 12;
  };
  
  // Full-width summary
  addFullWidthSection('PROFESSIONAL SUMMARY', () => {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...accentColor);
    const summaryLines = doc.splitTextToSize(resumeData.summary, 150);
    
    doc.setFillColor(...lightGray);
    doc.rect(25, yPosition - 5, 160, summaryLines.length * 5, 'F');
    
    doc.text(summaryLines, 30, yPosition);
    yPosition += summaryLines.length * 3;
  });
  
  // Left Column - Experience
  addSection('EXPERIENCE', (x, y) => {
    let currentY = y;
    resumeData.experience.forEach(job => {
      doc.setFillColor(...lightGray);
      doc.rect(x, currentY - 3, columnWidth, 10, 'F');
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...darkColor);
      doc.text(job.title, x + 3, currentY + 2);
      
      doc.setFontSize(8);
      doc.setTextColor(...primaryColor);
      doc.text(job.period, x + 3, currentY + 6);
      currentY += 12;
      
      doc.setFontSize(8);
      doc.setTextColor(...mediumGray);
      doc.text(`${job.company}`, x + 3, currentY);
      currentY += 6;
      
      doc.setFontSize(7);
      doc.setTextColor(0, 0, 0);
      job.responsibilities.slice(0, job.responsibilities.length-1).forEach(resp => {
        const respLines = doc.splitTextToSize(`• ${resp}`, columnWidth - 6);
        doc.text(respLines, x + 3, currentY);
        currentY += respLines.length * 3;
      });
      currentY += -3;
    });
    return currentY;
  });
  
  // Right Column - Skills
  addSection('SKILLS', (x, y) => {
    let currentY = y;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    
    resumeData.skills.forEach((skill, index) => {
      const row = Math.floor(index / 2);
      const col = index % 2;
      
      doc.setFillColor(...primaryColor);
      doc.rect(x + 3 + col * 35, currentY + row * 6 - 0.4, 32, 4, 'F');
      
      doc.setTextColor(...darkColor);
      doc.setFont('helvetica', 'bold');
      doc.text(skill, x + 19 + col * 35, currentY + row * 6 + 2.5, { align: 'center' });
    });
    
    return currentY + Math.ceil(resumeData.skills.length / 2) * 6 ;
  }, true);
  
  // Left Column - Projects
  addSection('PROJECTS', (x, y) => {
    let currentY = y;
    resumeData.projects.forEach(project => {
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      const descLines = doc.splitTextToSize(project.description, columnWidth - 6);
      const projectHeight = 12 + (descLines.length * 3);
      
      doc.setFillColor(...lightGray);
      doc.rect(x, currentY - 2, columnWidth, projectHeight, 'F');
      
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...darkColor);
      doc.text(project.name, x + 3, currentY + 2);
      
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...accentColor);
      doc.text(descLines, x + 3, currentY + 6);
      
      // Add technologies in very small font
      doc.setFontSize(6);
      doc.setTextColor(...mediumGray);
      const techText = project.technologies.join(', ');
      doc.text(techText, x + 3, currentY + 6 + (descLines.length * 3) + 2);
      
      currentY += projectHeight + 3;
    });
    return currentY;
  });
  
  // Right Column - Education
  addSection('EDUCATION', (x, y) => {
    let currentY = y;
    resumeData.education.forEach(edu => {
      doc.setFillColor(...lightGray);
      doc.rect(x, currentY - 2, columnWidth, 12, 'F');
      
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...darkColor);
      doc.text(edu.degree, x + 3, currentY + 2);
      
      doc.setFontSize(8);
      doc.setTextColor(...mediumGray);
      doc.text(edu.institution, x + 3, currentY + 6);
      doc.text(edu.period, x + 3, currentY + 9);
      
      currentY += 7;
    });
    return currentY;
  }, true);
  
  // Right Column - Hobbies
  addSection('HOBBIES', (x, y) => {
    let currentY = y;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    
    resumeData.hobbies.forEach(hobby => {
      doc.text(`• ${hobby}`, x + 3, currentY);
      currentY += 4;
    });
    
    return currentY + 5;
  }, true);
  
  // Professional footer
  const finalY = Math.max(leftColumnY, rightColumnY);
  doc.setFillColor(...darkColor);
  doc.rect(0, finalY + 10, 210, 17, 'F');
  
  doc.setFontSize(8);
  doc.setTextColor(...primaryColor);
  doc.text('Generated dynamically • David Guzmán Resume', 105, finalY + 20, { align: 'center' });
  
  // Download the PDF
  doc.save('David_Guzman_Resume.pdf');
  doc.rect(0, 280, 210, 17, 'F');
  
};