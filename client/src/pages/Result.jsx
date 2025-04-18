import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Result = () => {
  const [image, setimage] = useState(assets.sample_img_1);
  const [isLoaded, setisLoaded] = useState(false);
  const [loading, setloading] = useState(false);
  const [input, setinput] = useState("");
  const { generateImage } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input) return;
  
    setloading(true);
    setisLoaded(false);
  
    try {
      const generatedImage = await generateImage({ prompt: input }); // Fix: Pass object
      if (generatedImage) {
        setimage(generatedImage);
        setisLoaded(true);
      } else {
        console.error("Image generation failed");
      }
    } catch (err) {
      console.error("Error generating image:", err);
    }
  
    setloading(false);
  };
  

  return (
    <form className="flex flex-col min-h-[90vh] justify-center items-center" onSubmit={onSubmitHandler}>
      <div>
        <div className="relative">
          <img src={image} className="max-w-sm rounded" alt="Generated result" />
          <span
            className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${
              loading ? "w-full transition-all duration-[10s]" : "w-0"
            } `}
          />
        </div>
        {loading && <p>Loading ...</p>}
      </div>

      {!isLoaded && (
        <div className="flex w-full max-w-full bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full">
          <input
            onChange={(e) => setinput(e.target.value)}
            value={input}
            placeholder="Describe what you want to generate"
            className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color"
            type="text"
          />
          <button type="submit" className="bg-zinc-900 px-10 sm:px-16 py-3 rounded-full">
            Generate
          </button>
        </div>
      )}

      {isLoaded && (
        <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
          <p
            onClick={() => setisLoaded(false)}
            className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer"
          >
            Generate Another
          </p>
          <a href={image} download className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer">
            Download
          </a>
        </div>
      )}
    </form>
  );
};

export default Result;
