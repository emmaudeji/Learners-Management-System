import CourseIntro, { CourseContent, CourseOverview, InstructorInfo, Reviews, SimilarCourses } from "@/components/courses/CourseDetails";
import { courses, reviews, sections } from "@/data";

 
export default function CourseDetail({ params }: { params: { slug: string } }) {
  const course = courses.find((c) => c.slug === params.slug);
  if (!course) return <div>Course not found</div>;

  const courseReviews = reviews.filter((r) => r.courseSlug === course.slug);
//   const courseSections = sections[course.slug] || [];

  return (
    <main className="p-4 md:p-8 max-w-5xl mx-auto">
      <CourseIntro title={course.title} instructor={course.instructor} preview="/preview.mp4" />
      <CourseOverview description={course.description} learningPoints={["Build responsive websites", "Use React & Node", "Deploy to cloud platforms"]} />
      <CourseContent sections={sections["full-stack-web-development"]} />
      <InstructorInfo name={course.instructor} bio="Experienced full-stack developer with 10+ years in tech." photo="https://randomuser.me/api/portraits/women/44.jpg" />
      <Reviews reviews={courseReviews} />
      <SimilarCourses category={course.category} />
    </main>
  );
}
