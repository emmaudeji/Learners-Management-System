
import CheckoutPage from "@/components/common/Checkout";
import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";


const courseData = {
  title: "Master React in 2025",
  instructor: "Jane Doe",
  price: 199.99,
  discountPrice: 99.99,
  thumbnailUrl: "https://placeimg.com/80/48/tech",
};

export default function Page({searchParams}: { searchParams: { [key: string]: string } }) { 
  const courseId = searchParams.courseId || ''; 
  return (
    <>
      <Header/>
      <CheckoutPage course={courseData} courseAlias={courseId}/>
      <Footer/>
    </>
    );
}
