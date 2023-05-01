import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import { ButtonComponent, ImageComponent, ParagraphText, SearchComponent, SwitchComponent, defineCustomElements } from 'react-library';
import toast, { Toaster } from 'react-hot-toast';

import axios from 'axios';
import Pagination from './Pagination/Pagination';

defineCustomElements();

interface Object {
  id: number;
  legend: string;
  image: string;
}

function App() {
  const [gifs,setGifs] = useState([]);
  const [history,setHistory] = useState<string[]>([]);
  const [historySize,setHiztorySize] = useState(6);
  const [searchTerm,setSearchTerm] = useState("");
  const [offsetNumber,setOffsetNumber] = useState(9);
  const [limit,setLimit] = useState(9)
  const [page,setPage] = useState(0);

  const[title,setTitle] = useState("Search Results");
  const[description,setDescription] = useState("You can favorite / unfavorite any image by clicking on it and add it to your collection!!");

  const [totalPages,setTotalPages] = useState(0);

  const [favorites, setFavorites] = useState<Object[]>(() => {
    const favoritesFromStorage = JSON.parse(localStorage.getItem("favorites") || "[]");
    return favoritesFromStorage;
  });
  const [selectedObjects, setSelectedObjects] = useState<{ [id: number]: boolean }>(() => ({}));

  const [showFavorites,setShowFavorites] = useState(false)
  const [showList,setShowList] = useState(true)
  const [loading,setLoading] = useState(false)

  const addFavorite = (newObject: Object) => {
    const isSelected = selectedObjects[newObject.id];
    if (isSelected) {
      const newFavorites = favorites.filter((object) => object.id !== newObject.id);
      setFavorites(newFavorites);
      toast.error(`Removed ${newObject.legend} from favorites!`);
    } else {
      const newFavorites = [...favorites, newObject];
      setFavorites(newFavorites);
      toast.success(`Added ${newObject.legend} to favorites!`);
    }
    setSelectedObjects((prevSelectedObjects) => ({
      ...prevSelectedObjects,
      [newObject.id]: !isSelected,
    }));
  };

  const searchUrl = useMemo(() => {
    return `https://api.giphy.com/v1/gifs/search?api_key=9tDABZFzGydlAa9oj9MRTyMnQ29EF13S&q=${searchTerm}&limit=${limit}&offset=${offsetNumber * page}&rating=g&lang=en`;
  }, [searchTerm, limit, offsetNumber, page]);

  const debounce = <F extends (...args: any[]) => any>(fn: F, delay: number) => {
    let timeout: any;
  
    return function(this: ThisParameterType<F>, ...args: Parameters<F>) {
      const context = this;
  
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    };
  };

  const searchEngine = useCallback(
    debounce((term: any) => {
      setSearchTerm(term.detail);
    }, 500),
    []
  );

  const bodyRef = useRef<HTMLBodyElement | null>(null);

  useEffect(() => {
    bodyRef.current = document.querySelector("body");
  }, []);

  const themeChanger = useCallback((theme: any) => {
    if(bodyRef.current) {
      if(theme.detail === "dark") {
        bodyRef.current.classList.add("dark");
      } else {
        bodyRef.current.classList.remove("dark")
      }
    }
  }, []);

  useEffect(() => {
    setShowFavorites(false);
    setShowList(true);
    if (searchTerm !== "" && searchTerm !== null) {
      handleHistory(searchTerm);
    }

    const getData = async () => {
      if (searchTerm !== "" && searchTerm !== null) {
        setLoading(true)
        const response = await axios.get(searchUrl);
        setLoading(false)
        setGifs(response.data.data);
        setTotalPages(Math.ceil(response.data.pagination.total_count / response.data.pagination.count));
      } else {
        setGifs([]);
      }
    };

    getData();
  }, [searchUrl, searchTerm]);

  function handleHistory(term: string) {
    let newHistory = [...history]
    const index = newHistory.indexOf(term);
    if (index !== -1) {
      newHistory.splice(index, 1);
    }
  
    newHistory.push(term);
  
    if (newHistory.length > historySize) {
      newHistory.splice(0, newHistory.length - historySize);
    }
    setHistory(newHistory);
  }

  const handlePageChange = (page: number) => {
    setPage(page);
    setOffsetNumber((page - 1) * limit);
  };


  useEffect( () => {
    console.log(favorites);
  },[favorites]);

  const handleFavorites = () => {
    setGifs([]);
    setShowFavorites(true);
    setShowList(false);
    setTitle("Favorite ones!")
    setDescription("Here are your favorite images!")
  }

  const handleReSearch = (term:string) => {
    setSearchTerm(term);
  } 

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className="bg-[#F0F0F0] dark:bg-[#121012] min-h-screen relative">
      <div className="container px-[15px] mx-auto py-4 justify-between flex items-center md:gap-16">
        <div className="flex items-center gap-4 w-full">
          <SearchComponent onInputCompleted={ ev => searchEngine(ev)} className='w-11/12' />
        </div>
        <div className="flex items-center gap-6">
          <SwitchComponent onChangeTheme={ ev => themeChanger(ev)} />
        </div>
      </div>
      <div className="pt-5">
        <div className="container px-[15px] mx-auto">
          <div className="flex gap-8">
            <div style={{ "height": "calc(100vh - 200px)" }} className="bg-white dark:bg-[#36373C] mt-5 w-[300px] rounded-xl sticky top-[20px] flex flex-col px-6 py-6">
              <ParagraphText text='History' size='subtitle' />
              {/* <ButtonComponent className='my-1' text='Lorem' status='inactive' /> */}
              {
                (history.length) ? 
                <>
                  {
                    [...history].reverse().map((item:string,index:number) => {
                      return(
                        <ButtonComponent className='my-1' text={item} status='inactive' key={index} onClick={() => handleReSearch(item)} />
                      )
                    })
                  }
                </> : ""
              }
              <ButtonComponent className='my-2 ml-3' text='Favorites' status='active' onClick={handleFavorites} />
            </div>
            <div className="w-full pt-5">
              <div className='mb-6 w-11/12'>
                <ParagraphText text={title} size='title' />
                <ParagraphText text={description} />
              </div>
              <div className='w-full grid gap-8 md:grid-cols-4 lg:grid-cols-3 pt-5'>
                {
                  (gifs.length && !showFavorites && showList) ?
                  <>
                    {
                      gifs.map( (item: any,index) => {
                        let imageData = {"legend": item.title, "image": item.images.fixed_height_downsampled.url, "id": item.id};
                        return <ImageComponent image={imageData} key={index} onClick={() => addFavorite(imageData)} className='cursor-pointer' />
                      })
                    }
                  </> : 
                  <>
                    {
                      (loading) ?
                      <div className='flex w-full md:col-span-4 lg:col-span-3 justify-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="57" height="57" viewBox="0 0 57 57" className='stroke-black dark:stroke-white'>
                            <g fill="none" fill-rule="evenodd">
                                <g transform="translate(1 1)" stroke-width="2">
                                    <circle cx="5" cy="50" r="5">
                                        <animate attributeName="cy" begin="0s" dur="2.2s" values="50;5;50;50" calcMode="linear" repeatCount="indefinite"/>
                                        <animate attributeName="cx" begin="0s" dur="2.2s" values="5;27;49;5" calcMode="linear" repeatCount="indefinite"/>
                                    </circle>
                                    <circle cx="27" cy="5" r="5">
                                        <animate attributeName="cy" begin="0s" dur="2.2s" from="5" to="5" values="5;50;50;5" calcMode="linear" repeatCount="indefinite"/>
                                        <animate attributeName="cx" begin="0s" dur="2.2s" from="27" to="27" values="27;49;5;27" calcMode="linear" repeatCount="indefinite"/>
                                    </circle>
                                    <circle cx="49" cy="50" r="5">
                                        <animate attributeName="cy" begin="0s" dur="2.2s" values="50;50;5;50" calcMode="linear" repeatCount="indefinite"/>
                                        <animate attributeName="cx" from="49" to="49" begin="0s" dur="2.2s" values="49;5;27;49" calcMode="linear" repeatCount="indefinite"/>
                                    </circle>
                                </g>
                            </g>
                        </svg>
                      </div> : 
                      <div className='flex w-full md:col-span-4 lg:col-span-3 justify-center items-center'>
                        {
                          (!showFavorites) ?
                          <p className='text-3xl font-bold'>Theres nothing actually on the results list!</p> : ""
                        }
                      </div>
                    }
                  </>
                }
                {
                  (favorites.length && showFavorites) ?
                  <>
                    {
                      favorites.map( (item: any,index) => {
                        let imageData = {"legend": item.legend, "image": item.image, "id": item.id};
                        return <ImageComponent image={imageData} key={index} onClick={() => addFavorite(imageData)} className='cursor-pointer' />
                      })
                    }
                  </> : 
                  <>
                    {
                      (!showList) ?
                      <div>
                        <p>You have no favorites at this moment!</p>
                      </div> : ""
                    }
                  </>
                }
              </div>
              {
                (gifs.length && !showFavorites) ? <Pagination totalPages={totalPages} currentPage={page} onPageChange={handlePageChange} /> : ""
              }
            </div>
          </div>
          <Toaster position="top-right" reverseOrder={false} />
          
        </div>
      </div>
    </div>
  );
}

export default App;
