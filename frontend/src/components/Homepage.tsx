import React, { useEffect, useRef, useContext } from 'react';
import './Homepage.css';
import "./Header.css";
import { AuthContext } from "../AuthContext"

const Homepage: React.FC = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("authContext missing");
  };
  const {user, loggedIn} = authContext;

  const imageRefs = useRef<HTMLImageElement[]>([]);
  const h1Refs = useRef<HTMLHeadingElement[]>([]);
  const pRefs = useRef<HTMLParagraphElement[]>([]);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[], index: number) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && imageRefs.current[index]) {
          imageRefs.current[index].classList.add("in-view");
          animateText(pRefs.current[index]);
		      pRefs.current[index].style.opacity = "1";
		      h1Refs.current[index].style.opacity = "1"
        } else if (imageRefs.current[index]) {
		      h1Refs.current[index].style.opacity = "0";
		      pRefs.current[index].style.opacity = "0";
          imageRefs.current[index].classList.remove("in-view");
        }
      });
    };

    const createObserver = (index: number) => {
      return new IntersectionObserver(entries => handleIntersection(entries, index), {
        root: null, // Use the document's viewport as the root
        rootMargin: '0px',
        threshold: 0.8 // Trigger when 50% of the target is visible
      });
    };

	  let observer:IntersectionObserver;
    for (let i = 0; i < imageRefs.current.length; i++) {
      observer = createObserver(i);
      if (imageRefs.current[i]) {
        observer.observe(imageRefs.current[i]);
      }
    }

    return () => {
      for (let i = 0; i < imageRefs.current.length; i++) {
        if (imageRefs.current[i]) {
          observer.unobserve(imageRefs.current[i]);
        }
      }
    };
  }, []);

  const animateText = (element: HTMLElement | null) => {
    if (!element) return;

    const words = element.textContent?.split(' ');
    if (!words) return;

    element.innerHTML = '';
    words.forEach((word, index) => {
      const wordElement = document.createElement('span');
      wordElement.textContent = word + ' ';
      wordElement.style.opacity = '0';
      setTimeout(() => {
        wordElement.style.transition = 'opacity 2s ease';
        wordElement.style.opacity = '1';
      }, index * 50); // Adjust the delay as needed
      element.appendChild(wordElement);
    });
  };

  const handleButtonClick = () => {
		const targetElement = document.getElementById("homepage-start")
		if (targetElement) {
			targetElement.scrollIntoView();
		};
    };

  return (
	<div className='Homepage'>
    <header>
        <h1>Welcome to senharald.com!</h1>
        <button onClick={handleButtonClick}>↓</button>
    </header>
    <div className="Homepage-content">
      <main id='homepage-start'>
        <img src={`${process.env.PUBLIC_URL}/assets/discord.png`} alt="Discord" ref={el => el && imageRefs.current.push(el)}/>
        <h1 ref={el => el && h1Refs.current.push(el)}>CHAT</h1>
        <p ref={el => el && pRefs.current.push(el)}>Introducing CHAT, a revolutionary platform designed to connect people from all corners of the globe through seamless and intuitive communication. With its sleek design and user-friendly interface, CHAT offers a dynamic space where users can engage in vibrant conversations, share ideas, and forge meaningful connections effortlessly. Whether you're catching up with friends, collaborating with colleagues, or meeting new people, our app provides the perfect environment for fostering dialogue and building relationships. Join the conversation today and experience the future of communication.</p>
		<button onClick={() => {window.location.href = "http://chat.senharald.com"}}>Check out  →</button>
      </main>
      <main>
        <img src={`${process.env.PUBLIC_URL}/assets/spaceship.jpg`} alt="Spaceship" ref={el => el && imageRefs.current.push(el)}/>
        <h1 ref={el => el && h1Refs.current.push(el)}>GAMES</h1>
        <p ref={el => el && pRefs.current.push(el)}>Welcome to GAMES, your destination for engaging and immersive gaming experiences! Dive into a world of excitement and adventure with our curated selection of games designed to captivate players of all ages and interests. Whether you're a seasoned gamer looking for a new challenge or a casual player seeking some fun, we have something for everyone. From action-packed adventures to mind-bending puzzles, our games are carefully crafted to provide hours of entertainment. Join our community today and let the gaming begin!</p>
		<button onClick={() => {window.location.href = "http://games.senharald.com"}}>Check out  →</button>
      </main>
      <main>
        <img src={`${process.env.PUBLIC_URL}/assets/github.png`} alt="github" ref={el => el && imageRefs.current.push(el)}/>
        <h1 ref={el => el && h1Refs.current.push(el)}>OTHER</h1>
        <p ref={el => el && pRefs.current.push(el)}>Step into the realm of innovation with our diverse portfolio of projects and apps at github. From cutting-edge utilities to groundbreaking software solutions, we're dedicated to pushing the boundaries of technology to enrich lives and streamline experiences. Whether it's revolutionizing productivity, enhancing entertainment, or simplifying everyday tasks, each of our projects is meticulously crafted with a commitment to quality and user satisfaction. Join us on our journey of discovery and empowerment as we continue to shape the digital landscape and make a difference in the world, one project at a time.</p>
		<button>Check out  →</button>
      </main>
    </div>
	</div>
  );
};

export default Homepage;
