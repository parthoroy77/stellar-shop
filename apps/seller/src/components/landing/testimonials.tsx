import { LuStar } from "react-icons/lu";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Fashion Boutique Owner",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
    quote:
      "Joining this platform was the best business decision I've made. My sales have increased by 300% in just 6 months!",
  },
  {
    name: "Michael Chen",
    role: "Electronics Retailer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1770&auto=format&fit=crop",
    quote:
      "The analytics tools and customer insights have helped me optimize my store and grow my business exponentially.",
  },
];

export function Testimonials() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight">Loved by Sellers Worldwide</h2>
          <p className="text-accent-foreground mt-6 text-lg leading-8">
            Hear from our successful sellers who have transformed their businesses using our platform.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="flex flex-col justify-between rounded-2xl bg-white p-10 shadow-lg">
              <div className="flex items-center gap-4">
                <img src={testimonial.image} alt={testimonial.name} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                  <p className="text-accent-foreground text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="mt-4 flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <LuStar key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-lg italic text-gray-700">"{testimonial.quote}"</blockquote>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
