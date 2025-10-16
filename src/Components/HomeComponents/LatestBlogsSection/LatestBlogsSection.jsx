import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
{motion}

const blogs = [
  {
    id: 1,
    title: "AI Revolution: Top 5 Tools Transforming 2025",
    desc: "Artificial Intelligence is reshaping industries — here are 5 tools leading the way.",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    date: "Oct 15, 2025",
    author: "TechOrbit Team",
  },
  {
    id: 2,
    title: "How SaaS Startups Are Dominating the Market",
    desc: "SaaS is no longer optional — discover how startups are leveraging it for rapid growth.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    date: "Oct 12, 2025",
    author: "Sarah Noor",
  },
  {
    id: 3,
    title: "The Rise of Indie Developers and Solo Makers",
    desc: "More solo founders are building million-dollar startups — here’s how they do it.",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    date: "Oct 10, 2025",
    author: "Arian Rahman",
  },
];

const LatestBlogsSection = () => {
  return (
    <section className="py-16 bg-base-100" id="blogs">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          📰 Latest Tech News & Blogs
        </h2>
        <p className="text-gray-500 mb-12">
          Stay informed with the latest innovations and tech stories from around the world.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden"
            >
              <figure>
                <img
                  src={blog.img}
                  alt={blog.title}
                  className="w-full h-56 object-cover"
                />
              </figure>
              <div className="card-body text-left">
                <p className="text-sm text-gray-400">
                  {blog.date} • By {blog.author}
                </p>
                <h3 className="card-title mt-1 text-xl font-semibold">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2">{blog.desc}</p>
                <div className="card-actions mt-4">
                  <button className="btn btn-sm btn-primary gap-2">
                    Read More <FaArrowRight />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBlogsSection;
