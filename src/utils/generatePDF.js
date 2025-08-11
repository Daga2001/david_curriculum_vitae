import jsPDF from 'jspdf';

export const generateResumePDF = () => {
  const resumeData = {
    name: 'David Alberto Guzmán Ardila',
    title: 'Software Engineer',
    email: 'davidalbertoguz@gmail.com',
    phone: '+57 317 527 0029',
    location: 'Cali, Valle del Cauca, Colombia',
    linkedin: 'https://www.linkedin.com/in/david-alberto-guzm%C3%A1n-ardila-35417a220/',
    github: 'https://github.com/Daga2001',
    
    summary: 'Experienced Software Engineer specializing in cloud-based applications for the financial sector using AWS. Expert in implementing secure software solutions with cybersecurity best practices and ISO 27001 standards.',
    
    experience: [
      {
        title: 'Software Engineer',
        company: 'TSI s.a.s',
        location: 'Cali, Valle del Cauca',
        period: 'Mar 2022 - Present',
        responsibilities: [
          'Design, develop, and maintain cloud-based applications for the financial sector using AWS',
          'Implement secure software solutions aligned with cybersecurity best practices and ISO 27001 standards',
          'Build and integrate AI models for data imputation, analysis, and automation',
          'Develop scalable full-stack applications with Angular, .Net Core, .Net Framework and Node.js',
          'Design and develop relational databases for leading financial institutions in Colombia'
        ]
      }
    ],
    
    skills: [
      'JavaScript', 'Next.js', 'Python', 'Generative AI', 'Django',
      'React', 'Angular', 'Node.js', '.NET Core',
      'AWS', 'Docker', 'PostgreSQL', 'Sql Server',
      'Git', 'CI/CD', 'Deep Learning', 'Machine Learning'
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
      }
    ]
  };

  const doc = new jsPDF();
  let yPosition = 20;

  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(resumeData.name, 105, yPosition, { align: 'center' });
  yPosition += 8;
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text(resumeData.title, 105, yPosition, { align: 'center' });
  yPosition += 10;
  
  // Contact info
  doc.setFontSize(10);
  doc.text(`${resumeData.email} | ${resumeData.phone} | ${resumeData.location}`, 105, yPosition, { align: 'center' });
  yPosition += 5;
  doc.text(`${resumeData.linkedin} | ${resumeData.github}`, 105, yPosition, { align: 'center' });
  yPosition += 15;
  
  // Summary
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('PROFESSIONAL SUMMARY', 20, yPosition);
  doc.line(20, yPosition + 2, 190, yPosition + 2);
  yPosition += 8;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const summaryLines = doc.splitTextToSize(resumeData.summary, 170);
  doc.text(summaryLines, 20, yPosition);
  yPosition += summaryLines.length * 4 + 10;
  
  // Experience
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('EXPERIENCE', 20, yPosition);
  doc.line(20, yPosition + 2, 190, yPosition + 2);
  yPosition += 8;
  
  resumeData.experience.forEach(job => {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(job.title, 20, yPosition);
    yPosition += 5;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`${job.company} | ${job.location} | ${job.period}`, 20, yPosition);
    yPosition += 8;
    
    job.responsibilities.forEach(resp => {
      const respLines = doc.splitTextToSize(`• ${resp}`, 160);
      doc.text(respLines, 25, yPosition);
      yPosition += respLines.length * 4;
    });
    yPosition += 5;
  });
  
  // Skills
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('TECHNICAL SKILLS', 20, yPosition);
  doc.line(20, yPosition + 2, 190, yPosition + 2);
  yPosition += 8;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const skillsText = resumeData.skills.join(' • ');
  const skillsLines = doc.splitTextToSize(skillsText, 170);
  doc.text(skillsLines, 20, yPosition);
  yPosition += skillsLines.length * 4 + 10;
  
  // Projects
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('KEY PROJECTS', 20, yPosition);
  doc.line(20, yPosition + 2, 190, yPosition + 2);
  yPosition += 8;
  
  resumeData.projects.forEach(project => {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(project.name, 20, yPosition);
    yPosition += 5;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const descLines = doc.splitTextToSize(project.description, 170);
    doc.text(descLines, 20, yPosition);
    yPosition += descLines.length * 4;
    
    doc.text(`Technologies: ${project.technologies.join(', ')}`, 25, yPosition);
    yPosition += 8;
  });
  
  // Download the PDF
  doc.save('David_Alberto_Resume.pdf');
};