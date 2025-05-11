import Link from "next/link";

// components/HeroSection.tsx
export const HeroSection = () => (
  <section className="bg-gradient-to-br from-green-900 to-green-700 text-white py-24 px-4 text-center">
    <div className="max-w-screen-xl mx-auto">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">Empower Your Learning Journey</h1>
      <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto">
        Discover top-rated courses from expert instructors. Build in-demand skills, earn certificates,
        and unlock new career opportunities—anytime, anywhere.
      </p>
      <Link href={'/courses'} className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 shadow-md transition">
        Start Learning Today
      </Link >
    </div>
  </section>
);


// components/TrustedBy.tsx
export const TrustedBy = () => (
  <section className="py-12 px-4 text-center bg-gray-50 padding">
    <h2 className="text-xl font-semibold mb-6 text-gray-700">Trusted by learners and teams at</h2>
    <div className="flex justify-center gap-6 flex-wrap">
      {['Google', 'Meta', 'Microsoft', 'Amazon', 'Tesla'].map(brand => (
        <span key={brand} className="text-lg font-medium text-gray-500">{brand}</span>
      ))}
    </div>
  </section>
);

// components/FeaturedCourses.tsx
export const FeaturedCourses = () => (
  <section id="courses" className="py-16 px-4 bg-white padding">
    <h2 className="text-3xl font-bold text-center mb-12">Explore Our Top Courses</h2>
    <div className="grid md:grid-cols-3 gap-8">
      {[{
        title: 'Full-Stack Web Development',
        instructor: 'Jane Doe',
        image: 'https://source.unsplash.com/featured/?coding',
        rating: 4.8,
        learners: '28,500+',
        description: '',
        ctegory: '',
      }, {
        title: 'Digital Marketing Mastery',
        instructor: 'John Smith',
        image: 'https://source.unsplash.com/featured/?marketing',
        rating: 4.7,
        learners: '19,000+',
      }, {
        title: 'Data Science & Machine Learning',
        instructor: 'Sarah Lee',
        image: 'https://source.unsplash.com/featured/?data',
        rating: 4.9,
        learners: '34,200+',
      }].map(({ title, instructor, image, rating, learners },i) => (
        <div key={i}  className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img src={image} alt={title} className="w-full h-48 object-cover" />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 text-sm mb-1">Instructor: {instructor}</p>
            <p className="text-yellow-500 font-medium mb-2">⭐ {rating} ({learners})</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Enroll Now</button>
          </div>
        </div>
      ))}
    </div>
  </section>
);
 
// components/HowItWorks.tsx
export const HowItWorks = () => (
  <section className="bg-gray-100 py-16 px-4  ">
    <div className="padding">
    
    <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
    <div className="grid md:grid-cols-3 gap-8 text-center">
      {[{
        title: 'Browse & Enroll',
        description: 'Find the perfect course for you and enroll with just a few clicks.',
        icon: '📚',
      }, {
        title: 'Learn at Your Pace',
        description: 'Access lessons anytime, with lifetime access and flexible deadlines.',
        icon: '⏱️',
      }, {
        title: 'Earn Certificates',
        description: 'Showcase your achievements with industry-recognized certifications.',
        icon: '🎓',
      }].map(({ title, description, icon },i) => (
        <div key={i} className="bg-white p-6 rounded shadow">
          <div className="text-4xl mb-4">{icon}</div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      ))}
    </div>
    </div>
  </section>
);

// components/Testimonials.tsx
export const Testimonials = () => (
  <section className="py-20 px-4 bg-white ">
    <div className="padding">
    <h2 className="text-3xl font-bold text-center mb-12">What Our Learners Say</h2>
    <div className="grid md:grid-cols-3 gap-8">
      {[{
        name: 'Amaka I.',
        review: 'This platform changed my life! The courses are well-structured, easy to follow, and incredibly insightful.',
        role: 'Product Manager',
      }, {
        name: 'Chinedu A.',
        review: 'I was able to switch careers thanks to the Full-Stack Development course. Highly recommend!',
        role: 'Frontend Developer',
      }, {
        name: 'Ngozi M.',
        review: 'Great instructors, top-quality content, and a very supportive community.',
        role: 'Marketing Specialist',
      }].map(({ name, review, role }) => (
        <div key={name} className="bg-gray-100 p-6 rounded shadow">
          <p className="text-gray-700 italic mb-4">“{review}”</p>
          <p className="text-sm font-semibold text-gray-900">{name}</p>
          <p className="text-xs text-gray-500">{role}</p>
        </div>
      ))}
    </div>
    </div>
  </section>
);

// components/CallToAction.tsx
export const CallToAction = () => (
  <section className="bg-green-700 text-white py-20 px-4 text-center">
    <h2 className="text-3xl font-bold mb-4">Join Over 1 Million Learners</h2>
    <p className="text-lg mb-6">Start learning with us today and achieve your personal and professional goals.</p>
    <button className="bg-white text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">Create Your Free Account</button>
  </section>
);

// pages/index.tsx
// import { HeroSection } from '@/components/HeroSection';
// import { TrustedBy } from '@/components/TrustedBy';
// import { FeaturedCourses } from '@/components/FeaturedCourses';
// import { HowItWorks } from '@/components/HowItWorks';
// import { Testimonials } from '@/components/Testimonials';
// import { CallToAction } from '@/components/CallToAction';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      {/* <TrustedBy /> */}
      <FeaturedCourses />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
    </>
  );
}