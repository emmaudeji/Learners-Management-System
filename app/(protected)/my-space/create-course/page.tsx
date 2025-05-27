
import CreateCourse from "@/components/courses/create/CreateCourse";
import Image from "next/image";

export default  function CreateCoursePage() {
  return (
    <div className="w-full max-w-xl mx-auto  p-4 py-14 pb-20 space-y-6 ">
      <Image src={'/'} alt="new-course" height={400} width={400} className="h-40 w-full   pb-6" />
      
      <CreateCourse/>

    
    </div>
  );
}
