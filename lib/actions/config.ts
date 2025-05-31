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
  attachmentsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_ATTACHMENTS as string,
  notesCollectionId: process.env.NEXT_PUBLIC_APPWRITE_NOTES as string,

  quizesCollectionId: process.env.NEXT_PUBLIC_APPWRITE_QUIZES as string,
  answersCollectionId: process.env.NEXT_PUBLIC_APPWRITE_QUIZE_RESPONSE as string,

  learnersCertificatesCollectionId: process.env.NEXT_PUBLIC_APPWRITE_LEARNERS_CERTIFICATES as string,
  badgesTemplatesCollectionId: process.env.NEXT_PUBLIC_APPWRITE_BADGES_TEMPLATES as string,
  learnersBadgeCollectionId: process.env.NEXT_PUBLIC_APPWRITE_LEARNERS_BADGE as string,
  certificateTemplateCollectionId: process.env.NEXT_PUBLIC_APPWRITE_CERTIFICATE_TEMPLATE as string,

  secretKey: process.env.APPWRITE_SECRETE_KEY as string,
};


export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string,
  apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string,
  lmsPreset: process.env.NEXT_PUBLIC_CLOUDINARY_LMS_PRESET as string,
  apiSecrete: process.env.CLOUDINARY_API_SECRET as string,
  secureUrl: process.env.CLOUDINARY_URL as string, // Optional: full Cloudinary URL if needed
};



// NEXT_PUBLIC_APPWRITE_QUIZES=682ef664001745da094e
// NEXT_PUBLIC_APPWRITE_QUIZE_RESPONSE=682ef94500308f30fb31
// NEXT_PUBLIC_APPWRITE_ATTACHMENTS=682f3e0800278eb6a005

// NEXT_PUBLIC_APPWRITE_NOTES=6835264700235561506b
// NEXT_PUBLIC_APPWRITE_LEARNERS_CERTIFICATES=6837108a003677d1f908
// NEXT_PUBLIC_APPWRITE_BADGES_TEMPLATES=68371591003186769669
// NEXT_PUBLIC_APPWRITE_LEARNERS_BADGE=683716a5000981c3c1b7
// NEXT_PUBLIC_APPWRITE_CERTIFICATE_TEMPLATE=683718660000010718c2