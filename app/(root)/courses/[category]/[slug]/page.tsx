// import CourseIntro, { CourseContent, CourseOverview, InstructorInfo, Reviews, SimilarCourses } from "@/components/courses/CourseDetails";
import CourseDetails from "@/components/courses/CourseDetails";
import { fields } from "@/constants";
import { courses, reviews, sections } from "@/data";
import { appwriteConfig } from "@/lib/actions/config";
import { getDocumentById } from "@/lib/appwrite";
import { Course } from "@/types";
import { redirect } from "next/navigation";

 
export default async function CourseDetailPage({ params }: { params: { slug: string, category:string } }) {
  const courseAlias =( await params).slug;
  const {data: course} = await getDocumentById<Course>(
    appwriteConfig.coursesCollectionId,
    courseAlias, 
    fields.courses
  )
  if(!course) redirect('/courses');
  // If course not found, redirect to courses page

  return (
    <CourseDetails course={course}  />
  );
}
