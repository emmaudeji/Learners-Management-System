export const categorizedCourseCategories = {
  technicalDigital: [
    "Web Development",
    "Mobile App Development",
    "Data Science & Analytics",
    "Artificial Intelligence & Machine Learning",
    "Cybersecurity",
    "Cloud Computing",
    "DevOps & Infrastructure",
    "Software Engineering",
    "Blockchain & Web3",
    "UI/UX Design",
    "Game Development",
    "Product Management",
  ],
  businessFinance: [
    "Entrepreneurship",
    "Digital Marketing",
    "E-Commerce",
    "Finance & Investment",
    "Accounting",
    "Project Management",
    "Leadership & Management",
    "Sales & Negotiation",
    "Business Strategy",
    "Human Resources",
  ],
  creativeDesign: [
    "Graphic Design",
    "Video Production",
    "Photography",
    "Music & Audio Production",
    "Writing & Content Creation",
    "Animation & Motion Graphics",
    "Fashion Design",
    "Interior Design",
    "Architecture",
  ],
  healthWellness: [
    "Fitness & Nutrition",
    "Mental Health & Psychology",
    "Health & Safety",
    "First Aid & Emergency Response",
    "Yoga & Mindfulness",
    "Medical Training",
  ],
  academicEducation: [
    "Mathematics",
    "Science (Biology, Physics, Chemistry)",
    "Language Learning",
    "Test Preparation (e.g., IELTS, SAT)",
    "Academic Writing",
    "Early Childhood Education",
    "Special Needs Education",
  ],
  lifestylePersonalDevelopment: [
    "Productivity & Time Management",
    "Public Speaking",
    "Self Improvement",
    "Relationships & Communication",
    "Spirituality & Religion",
    "Travel & Culture",
    "Career Development",
    "Cooking & Culinary Arts",
  ],
  tradesSkilledWork: [
    "Electrical Engineering",
    "Mechanical Skills",
    "Construction & Carpentry",
    "Plumbing",
    "Welding",
    "Auto Repair & Maintenance",
    "Agriculture & Farming",
  ],
  otherGeneral: [
    "Technology Fundamentals",
    "Life Skills",
    "Legal & Compliance",
    "Real Estate",
    "Environmental Studies",
    "Political Science & Civics",
  ],
};

export const courseCategoryOptions = Object.entries(categorizedCourseCategories).map(
  ([key, subcategories]) => ({
    label: formatLabel(key),
    options: subcategories.map((subcategory) => ({
      label: subcategory,
      value: subcategory,
    })),
  })
);

function formatLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1") // add space before capital letters
    .replace(/^./, (str) => str.toUpperCase()); // capitalize first letter
}
