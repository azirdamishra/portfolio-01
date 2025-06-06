import React, { Suspense, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { Canvas } from '@react-three/fiber';

import Fox from '../models/Fox'
import Loader from '../components/Loader';
import useAlert from '../hooks/useAlert';
import Alert from '../components/Alert';

const Contact = () => {
  const formRef = useRef(null);
  const [form, setform] = useState({name: '', email: '', message: ''});
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnimation, setcurrentAnimation] = useState('idle')

  const {alert, showAlert, hideAlert} = useAlert(); //whenever we need to alert something

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value})
  };
  const handleFocus = () => setcurrentAnimation('walk'); //when you click on it
  const handleBlur = () => setcurrentAnimation('idle'); //when you click away from it
  const handleSubmit = (e) => {
    e.preventDefault(); //to not reload page post submission
    setIsLoading(true);
    setcurrentAnimation('hit');

    console.log("PUBLIC KEY: ", import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY);

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
      showAlert({show: true, text:'Message sent successfully!', type:'success'});

      setTimeout(() => {
        hideAlert();
        setcurrentAnimation('idle')
        setform({name: '', email: '', message:''});
      }, [2000])
    }).catch((error) => {
      setIsLoading(false);
      setcurrentAnimation('idle');
      console.log(error);
      showAlert({show: true, text:'I didnt receive your message!', type:'danger'});
    })
  }; 

  return (
    <section className='relative flex lg:flex-row flex-col max-container h-[100vh]'>
        {alert.show && <Alert {...alert} />}

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
      <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]'>
        <Canvas
          camera = {{
            position: [0,0,5],
            fov: 75,
            near: 0.1,
            far: 1000
          }}
        >
          <directionalLight intensity={2.5} position={[0,0,1]}/>
          <ambientLight intensity={0.5}/>

          <Suspense fallback={Loader}>
            <Fox 
              currentAnimation={currentAnimation}
              position={[0.5, 0.35, 0]}
              rotation={[12.6, -0.85, 0]}
              scale={[0.5, 0.5, 0.5]}
            />
          </Suspense>
        </Canvas>

      </div>

    </section>
  )
}

export default Contact