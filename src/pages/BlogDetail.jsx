import { ArrowLeft, Clock, User, Calendar } from "lucide-react";

const blogContent = {
  1: `Technology is evolving faster than ever. In 2026, we are seeing incredible innovations in electronics that are transforming our daily lives.

From foldable smartphones to AI-powered laptops, the electronics industry is booming. Smart home devices have become more affordable and accessible to everyone.

Wireless technology has reached new heights with faster connectivity and better battery life. The integration of AI in everyday electronics has made our lives more convenient and productive.

Whether you are a tech enthusiast or just looking to upgrade your devices, 2026 is the perfect time to invest in new electronics. The prices have become more competitive and the quality has never been better.

Stay ahead of the curve by keeping up with the latest trends and innovations in the electronics world.`,

  2: `Fashion in 2026 is all about self-expression and sustainability. Designers are pushing boundaries while keeping the environment in mind.

Bold colors and patterns are dominating the runways this summer. From vibrant oranges to deep blues, this season is all about making a statement.

Sustainable fashion has become mainstream. More brands are using eco-friendly materials and ethical manufacturing processes.

Vintage and retro styles are making a huge comeback. Mix and match different eras to create your unique look.

Comfort is key this season. Relaxed fits and breathable fabrics are trending as people prioritize comfort without sacrificing style.`,

  3: `Working from home has become the new normal for many professionals. Creating the perfect home office can significantly boost your productivity.

Start with the right desk and chair. Investing in ergonomic furniture is crucial for your health and comfort during long work hours.

Lighting plays a huge role in productivity. Natural light is ideal, but if that is not possible, invest in good quality LED lights that mimic daylight.

Organize your cables and keep your desk clutter-free. A clean workspace leads to a clear mind and better focus.

Add personal touches to make your space inspiring. Plants, artwork, and photos can make your home office feel more welcoming and motivating.`,

  4: `Starting your fitness journey can be overwhelming, especially when it comes to choosing the right gear. Here is everything you need as a beginner.

A good pair of training shoes is the most important investment. Look for shoes with proper support and cushioning for your specific activity.

Comfortable workout clothes make a huge difference. Moisture-wicking fabrics keep you dry and comfortable during intense workouts.

A water bottle is essential for staying hydrated. Look for one that is durable, easy to clean, and keeps your water cold.

Resistance bands are versatile and affordable. They are perfect for beginners and can be used for a wide variety of exercises.`,

  5: `Reading is one of the most powerful habits an entrepreneur can develop. These five books have changed the lives of countless business owners.

Think and Grow Rich by Napoleon Hill teaches the power of mindset and persistence in achieving success.

The Lean Startup by Eric Ries revolutionized how modern businesses are built and scaled.

Zero to One by Peter Thiel challenges conventional thinking and encourages entrepreneurs to create truly innovative products.

Rich Dad Poor Dad by Robert Kiyosaki changes how you think about money and financial independence.

The E-Myth Revisited by Michael Gerber explains why most small businesses fail and how to build a business that runs without you.`,

  6: `Achieving glowing skin does not have to be complicated or expensive. With the right routine and products, anyone can have healthy, radiant skin.

Start with a gentle cleanser that suits your skin type. Cleansing twice a day removes dirt, oil and impurities without stripping natural moisture.

Toning is an often overlooked but crucial step. A good toner balances your skin pH and prepares it for the next steps.

Serums packed with vitamin C and hyaluronic acid are game changers. They target specific concerns and deliver powerful ingredients deep into the skin.

Moisturizing is non-negotiable regardless of your skin type. Even oily skin needs hydration to maintain its barrier function.

Never skip sunscreen during the day. SPF is the most important anti-aging product you can use.`,
};

const categoryColors = {
  Electronics: "bg-indigo-100 text-indigo-700",
  Fashion: "bg-pink-100 text-pink-700",
  "Home & Living": "bg-orange-100 text-orange-700",
  Sports: "bg-emerald-100 text-emerald-700",
  Books: "bg-violet-100 text-violet-700",
  Beauty: "bg-rose-100 text-rose-700",
};

export default function BlogDetail({ blog, darkMode, onNavigate }) {
  if (!blog) {
    onNavigate("blogs");
    return null;
  }

  const text = darkMode ? "text-white" : "text-slate-800";
  const subtext = darkMode ? "text-slate-400" : "text-slate-500";
  const card = darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100";

  const content = blogContent[blog.id] || "Content coming soon...";

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">

      {/* Back Button */}
      <button
        onClick={() => onNavigate("blogs")}
        className={`flex items-center gap-2 mb-6 text-sm font-medium transition-colors ${darkMode ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-800"}`}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Blogs
      </button>

      {/* Cover */}
      <div className={`h-64 rounded-3xl flex items-center justify-center text-8xl mb-8 ${blog.bgColor}`}>
        {blog.emoji}
      </div>

      {/* Category */}
      <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${categoryColors[blog.category]}`}>
        {blog.category}
      </span>

      {/* Title */}
      <h1 className={`text-3xl font-black mt-4 mb-4 leading-tight ${text}`}>
        {blog.title}
      </h1>

      {/* Meta */}
      <div className={`flex flex-wrap items-center gap-4 text-sm mb-8 pb-8 border-b ${subtext} ${darkMode ? "border-slate-700" : "border-slate-200"}`}>
        <div className="flex items-center gap-1.5">
          <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {blog.author.charAt(0)}
          </div>
          <span>{blog.author}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          {blog.date}
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          {blog.readTime}
        </div>
      </div>

      {/* Content */}
      <div className={`prose max-w-none ${card} rounded-2xl p-6`}>
        {content.split("\n\n").map((paragraph, index) => (
          <p key={index} className={`text-sm leading-relaxed mb-4 last:mb-0 ${subtext}`}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}