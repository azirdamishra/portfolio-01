import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

const Contact = () => {
  const formRef = useRef(null);
  const [form, setform] = useState({name: '', email: '', message: ''});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value})
  };
  const handleFocus = () => {}; //when you click on it
  const handleBlur = () => {}; //when you click away from it
  const handleSubmit = (e) => {
    e.preventDefault(); //to not reload page post submission
    setIsLoading(true);

    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name:form.name,
        to_name: "Adriza",
        from_email: form.email,
        to_email: import.meta.env.VITE_APP_EMAILJS_MY_EMAIL,
        message:form.message
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setIsLoading(false);
      //TODO: to show success message
      //TODO: Hide an alert
      setform({name: '', email: '', message:''})
    }).catch((error) => {
      setIsLoading(false);
      console.log(error);
      //TODO: show error message
    })
  }; 

  return (
    <section className='relative flex lg:flex-row flex-col max-container'>
      <div className='flex-1 min-w-[50%] flex flex-col'>
        <h1 className='head-text'>Get in Touch!</h1>
        
        <form 
          className='w-full flex flex-col gap-7 mt-14'
          onSubmit={handleSubmit}
        >
          <label className='text-black-500 font-semibold'>
            Name
            <input
                type="text"
                name="name"
                className='input'
                placeholder='John Doe'
                required
                value={form.name}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
          </label>
          <label className='text-black-500 font-semibold'>
            Email
            <input
                type="email"
                name="email"
                className='input'
                placeholder='john@gmail.com'
                required
                value={form.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
          </label>
          <label className='text-black-500 font-semibold'>
            Your Message
            <textarea
                name="message"
                rows={4}
                className='textarea'
                placeholder='Let me know how I can help you!'
                required
                value={form.message}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
          </label>
          <button
            type='submit'
            className='btn'
            disabled={isLoading}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {isLoading? 'Sending...': 'Send Message'}

          </button>

        </form>
      </div>


    </section>
  )
}

export default Contact