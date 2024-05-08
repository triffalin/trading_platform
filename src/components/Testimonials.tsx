const testimonials = [
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

const Testimonials = () => (
  <section className="testimonials bg-[#1E2329] p-6 rounded-lg mb-10">
    <h2 className="text-center font-bold text-2xl mb-4">
      Why Traders Choose Us
    </h2>
    {testimonials.map(testimonial => (
      <blockquote key={testimonial.name}>
        <p>`{testimonial.comment}`</p>
        <cite>— {testimonial.name}</cite>
      </blockquote>
    ))}
  </section>
);

export default Testimonials;
