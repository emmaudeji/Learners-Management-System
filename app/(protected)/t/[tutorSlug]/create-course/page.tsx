
import CreateCourse from "@/components/courses/create/CreateCourse";
import Image from "next/image";

export default  function CreateCoursePage() {
  return (
    <div className="padding p-6 space-y-6 w-full">
      <Image src={'/'} alt="new-course" height={400} width={400} className="h-60 w-full max-w-56 pb-6" />
      
      <CreateCourse/>

    
    </div>
  );
}
