export const appwriteConfig = {
  endpointUrl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,

  usersCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USERS_ID as string,
  transactionsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_TRANSACTIONS_ID as string,
  coursesCollectionId: process.env.NEXT_PUBLIC_APPWRITE_COURSES_ID as string,
  teachersCollectionId: process.env.NEXT_PUBLIC_APPWRITE_TEACHERS_ID as string,
  categoryCollectionId: process.env.NEXT_PUBLIC_APPWRITE_CATEGORY_ID as string,
  pricingCollectionId: process.env.NEXT_PUBLIC_APPWRITE_PRICING_ID as string,
  levelsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_LEVELS_ID as string,
  sectionsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_SECTIONS_ID as string,
  chaptersCollectionId: process.env.NEXT_PUBLIC_APPWRITE_CHAPTERS_ID as string,
  reviewsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_REVIEWS_ID as string,
  feedbacksCollectionId: process.env.NEXT_PUBLIC_APPWRITE_FEEDBACKS_ID as string,
  progressCollectionId: process.env.NEXT_PUBLIC_APPWRITE_PROGRESS_ID as string,

  secretKey: process.env.APPWRITE_SECRETE_KEY as string,
};

export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string,
  apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string,
  researchPreset: process.env.NEXT_PUBLIC_CLOUDINARY_RESEARCH_PRESET as string,
  secureUrl: process.env.CLOUDINARY_URL as string, // Optional: full Cloudinary URL if needed
};
