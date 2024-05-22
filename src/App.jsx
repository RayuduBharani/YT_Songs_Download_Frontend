import { createContext, useState, useEffect } from 'react';
import './App.css';
import Music from './components/Music';

export const userContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  });

  function handleInput(event) {
    setSearch(event.target.value);
  }

  function submitButton(event) {
    setIsLoading(true)
    // console.log(search);
    event.preventDefault();
    if (search) {
      fetch(`https://yt-songs-download.onrender.com/home/${search}`, {
        method: "GET",
      })
        .then(response => response.json())
        .then(data => {
          setSongs(data);
          console.log(data)
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log({ message: "First Search a song" });
    }
  }

  return (
    <userContext.Provider value={songs}>
      <div className='div flex justify-center items-center w-full h-screen bg-gray-200'>
        <div className='main w-10/12 h-[90%] bg-white rounded-xl overflow-hidden max-md:w-11/12 max-sm:w-11/12 max-sm:p-2'>
          <form className='search-div w-full h-16 mt-2 flex justify-center items-center max-sm:flex-wrap max-sm:gap-1'>
            <div className='icon w-12 h-[76%] bg-neutral-100 mr-2 rounded-lg flex justify-center items-center '>
              <i className="fa-brands fa-spotify text-4xl text-black cursor-pointer"></i>
            </div>
            <input type="text" onChange={handleInput} name='input' className='input-box w-4/5 h-[75%] bg-neutral-100 rounded-lg outline-none indent-4 text-black max-lg:w-[70%] max-md:w-[70%] max-sm:w-4/5'
              placeholder='Search or paste the URL for your Favourite Music'/>
            <button onClick={submitButton} className="btn bg-black text-white border-none text-base ml-5 hover:btn-accent hover:text-white max-sm:mr-6 max-sm:mt-1">
                Search
            </button>
          </form>

          <div className='music-component w-full h-full max-sm:mt-12 max-sm:w-full'>
            {isLoading ? (
              <div className="flex justify-center mt-48">
                <span className="loading loading-bars loading-xs text-orange-500"></span>
                <span className="loading loading-bars loading-sm text-teal-500"></span>
                <span className="loading loading-bars loading-md text-sky-500"></span>
                <span className="loading loading-bars loading-lg text-fuchsia-600"></span>
              </div>
            ) : (
              <Music />
            )}
          </div>
        </div>
      </div>
    </userContext.Provider>
  );
}

export default App;
