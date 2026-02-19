import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { arrow } from '../assets/icons'

function parseRSS(xml) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');
  const items = doc.querySelectorAll('item');

  return Array.from(items).map((item) => {
    const title = item.querySelector('title')?.textContent || '';
    const link = item.querySelector('link')?.textContent || '';
    const pubDate = item.querySelector('pubDate')?.textContent || '';
    const description = item.querySelector('description')?.textContent || '';

    const temp = document.createElement('div');
    temp.innerHTML = description;
    const excerpt = temp.textContent?.slice(0, 200) || '';

    return { title, link, pubDate, excerpt };
  });
}

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/feed')
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch feed (${res.status})`);
        return res.text();
      })
      .then((xml) => {
        const parsed = parseRSS(xml);
        setPosts(parsed);
        setLoading(false);
      })
      .catch((err) => {
        console.error('RSS fetch error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <section className='max-container'>
      <Link
        to="/about"
        className='inline-flex items-center gap-2 text-slate-600 hover:text-blue-500 mb-8 transition-colors'
      >
        <img src={arrow} className='w-4 h-4 rotate-180' alt="" />
        Back to About
      </Link>

      <h1 className='head-text'>
        <span className='blue-gradient_text font-semibold drop-shadow'>Blog</span>
      </h1>
      <p className='mt-4 text-slate-500'>
        Thoughts on design, fashion, and code — straight from my Substack.
      </p>

      <div className='mt-12'>
        {loading && (
          <p className='text-slate-400 text-center'>Loading posts...</p>
        )}

        {error && (
          <p className='text-red-500 text-center'>
            Could not load posts. Make sure your Substack URL is configured.
          </p>
        )}

        {!loading && !error && posts.length === 0 && (
          <p className='text-slate-400 text-center'>No posts yet — stay tuned!</p>
        )}

        <div className='grid gap-6'>
          {posts.map((post, i) => (
            <a
              key={i}
              href={post.link}
              target='_blank'
              rel='noopener noreferrer'
              className='group block p-6 rounded-xl bg-white border border-slate-200 hover:border-blue-400/50 hover:shadow-md transition-all duration-200'
            >
              <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2'>
                <h2 className='text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors'>
                  {post.title}
                </h2>
                <time className='text-sm text-slate-400 whitespace-nowrap flex-shrink-0'>
                  {new Date(post.pubDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <p className='mt-3 text-slate-500 text-sm leading-relaxed'>
                {post.excerpt}{post.excerpt.length >= 200 ? '...' : ''}
              </p>
              <span className='mt-4 inline-flex items-center gap-2 text-blue-600 font-medium text-sm'>
                Read on Substack
                <img src={arrow} className='w-4 h-4' alt="" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog
