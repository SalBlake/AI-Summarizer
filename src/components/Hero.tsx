import bibot from '../assets/bibot.png';
import { BsGithub } from 'react-icons/bs';

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={bibot} alt={bibot} className="w-28 object-contain" />
        <button 
          type="button"
          onClick={() => {
            window.open('https://github.com/KJ3RO')
          }}
          className='black_btn flex '
        >
          <BsGithub className="mt-0.5"/> 
          <p className="pl-2">Github</p>
        </button>
      </nav>
      <h1 className="head_text">
        Generate Annotated <br/>Bibliographies with <br />
        <span className="blue_gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Summurize and analyze your artices with Bibot, an open source annotated bibliogrphy generator. You won't get caught because it uses multiple rephrasers!
      </h2>
    </header>
  )
}

export default Hero