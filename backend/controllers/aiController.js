const suggestSkills = async (req, res) => {
  try {
    const { skills } = req.body;
    
    if (!skills || !Array.isArray(skills)) {
      return res.status(400).json({ message: 'Please provide an array of skills.' });
    }

    const skillsLower = skills.map(s => s.toLowerCase().trim());
    let potentialSkills = [];
    let careerPath = "Software Engineer";

    const hasFrontend = skillsLower.some(s => ['html', 'css', 'react', 'vue', 'angular', 'javascript'].includes(s));
    const hasBackend = skillsLower.some(s => ['node', 'node.js', 'python', 'java', 'express', 'django'].includes(s));
    const hasDevOps = skillsLower.some(s => ['aws', 'docker', 'kubernetes', 'git', 'ci/cd', 'linux'].includes(s));
    const hasData = skillsLower.some(s => ['sql', 'pandas', 'machine learning', 'data analysis', 'mongodb'].includes(s));

    if (hasDevOps && !hasFrontend && !hasBackend) {
      potentialSkills = ['Kubernetes', 'Terraform', 'CI/CD Pipelines', 'Linux Admin', 'Ansible', 'Prometheus'];
      careerPath = "DevOps Engineer";
    } else if (hasDevOps && hasBackend) {
      potentialSkills = ['Kubernetes', 'Microservices', 'Terraform', 'System Design', 'Redis'];
      careerPath = "Cloud / Backend Engineer";
    } else if (hasFrontend && hasBackend) {
      potentialSkills = ['GraphQL', 'Redis', 'System Design', 'WebSockets', 'Next.js', 'Docker'];
      careerPath = "Full-Stack Developer";
    } else if (hasFrontend) {
      potentialSkills = ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Redux', 'Web Accessibility'];
      careerPath = "Frontend Developer";
    } else if (hasBackend) {
      potentialSkills = ['Node.js', 'MongoDB', 'PostgreSQL', 'Docker', 'REST APIs', 'GraphQL'];
      careerPath = "Backend Developer";
    } else if (hasData) {
      potentialSkills = ['Python', 'Machine Learning', 'Data Visualization', 'Apache Spark', 'TensorFlow'];
      careerPath = "Data Scientist";
    } else {
      potentialSkills = ['JavaScript', 'Python', 'Git', 'Data Structures', 'SQL'];
      careerPath = "Software Engineer";
    }

    // Filter out skills the user already entered
    let missingSkills = potentialSkills.filter(
      skill => !skillsLower.some(userSkill => skill.toLowerCase().includes(userSkill) || userSkill.includes(skill.toLowerCase()))
    );

    // If we filtered out everything, give some advanced generic ones
    if (missingSkills.length === 0) {
      missingSkills = ['System Architecture', 'Cloud Native Patterns', 'Agile Leadership', 'Advanced Security'];
      careerPath = `Senior ${careerPath}`;
    }

    // Limit to top 4 suggestions
    missingSkills = missingSkills.slice(0, 4);

    // Simulate API delay
    setTimeout(() => {
      res.json({
        suggestedSkills: missingSkills,
        suggestedCareerPath: careerPath,
        message: "This is a simulated AI response based on your current skills."
      });
    }, 1000);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { suggestSkills };
