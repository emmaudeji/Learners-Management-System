import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import PaymentSuccessMessage from "@/components/common/PaymentFeedback";

export default async function PaymentSuccess({searchParams}: { searchParams: { [key: string]: string } }) {   
    // You can access searchParams to get any query parameters if needed
    // const paymentId = (await searchParams).paymentId || '';
    const courseId = (await searchParams).courseId || '';

  return (
    <>
        <Header/>
        <PaymentSuccessMessage courseAlias={courseId} />
        <Footer/>
    </>
  );
}
