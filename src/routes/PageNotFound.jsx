const PageNotFound = () => {
    return (
      <div>
          <div className="bg-mtgray relative overflow-hidden h-screen">
          <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzU4MmNjNzliZmRmZDEwOGJhODZkMDcxYWYyZGI5ZTBkYjBhZDIxZSZjdD1n/3o7aTskHEUdgCQAXde/giphy.gif"
           className="absolute h-full w-full object-cover"/>
          <div className="inset-0 bg-black opacity-70 absolute">
          </div>
          <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
            <div className="w-full font-mono flex flex-col items-center relative z-10">
              <h1 className="font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-5xl text-center text-white leading-tight mt-4">
                "I'm sorry dave. I'm afraid I can't do that"<br/> -2001: A Space Odyssey
              </h1>
              <p className="font-extrabold text-6xl my-44 text-white animate-bounce text-center">
                Page Not Found <br/> 404
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default PageNotFound