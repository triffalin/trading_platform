import React from 'react';

interface Testimonial {
  name: string;
  comment: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'John Doe',
    comment:
      'This platform has revolutionized the way I trade. Absolutely love the automated features!'
  },
  {
    name: 'Jane Smith',
    comment:
      'Very intuitive and powerful. I feel more confident in my trading decisions.'
  }
];

const Testimonials: React.FC = () => (
  <section className="testimonials bg-[#1E2329] p-6 rounded-lg mb-10">
    <h2 className="text-center font-bold text-2xl mb-4">
      Why Traders Choose Us
    </h2>
    {testimonials.map(testimonial => (
      <figure key={testimonial.name} className="mb-4">
        <blockquote className="italic bg-gray-800 p-4 rounded-lg">
          <p>&quot;{testimonial.comment}&quot;</p>
        </blockquote>
        <figcaption className="text-right text-yellow-500 mt-2">
          — {testimonial.name}
        </figcaption>
      </figure>
    ))}
  </section>
);

export default Testimonials;
