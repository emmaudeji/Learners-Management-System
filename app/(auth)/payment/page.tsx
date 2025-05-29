// Example usage in a page or parent component

import CheckoutPage from "@/components/common/Checkout";


const courseData = {
  title: "Master React in 2025",
  instructor: "Jane Doe",
  price: 199.99,
  discountPrice: 99.99,
  thumbnailUrl: "https://placeimg.com/80/48/tech",
};

export default function Page() {
  return <CheckoutPage course={courseData} />;
}
