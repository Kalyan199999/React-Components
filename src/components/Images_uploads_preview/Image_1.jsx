import { toast } from "react-toastify"

import { useState } from "react"

const ImageSelectedPreview = ()=>{

    const [images , setImages] = useState([])
    const [index , setIndex] = useState(0)

    const handleImageUpload = (e)=>{

        const allfiles = Array.from( e.target.files ) ;

        const allfiles2 = allfiles.map(
            (file)=>(
                {
                    file,
                    preview: URL.createObjectURL(file)

                }
            )
         )
         
        setImages(allfiles2)

        toast.success("Image uploaded successfully")
       
    }

    const handleIndex = (idx)=>{

        setIndex(idx)

        toast.success('Image updated!')
    }

    return (

        <div className="h-screen w-screen bg-gray-400 flex flex-col items-center pt-4">


            <label className="cursor-pointer flex items-center gap-3 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition">
                <span>📷 Upload Images</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
            </label>


            <div 
            className="w-[40vw] flex flex-row gap-2 justify-center items-center p-3"
            >

                {/* main image */}
                <div>

                    {
                        images.length > 0 && (
                            <img 
                            src={images[index].preview} 
                            alt={images[index].file.name} 
                            
                            className="h-[70vh] w-[70vw] object-contain "
                            
                            />
                        )
                    }

                </div>

                {/* all images */}
                <div className="grid grid-cols-3  gap-1 ">
                    {
                        images.length >0 && (
                            images.map( (image , idx) =>{
                                
                                return(
                                    <img 

                                    src={image.preview} 
                                    alt={image.file.name} 
                                    key={idx}
                                    onClick={()=>handleIndex(idx)}
                                    className={`h-32 w-48 cursor-pointer border-2 ${ index === idx ? "border-red-500" : "border-transparent" }`}

                                    />
                                )
                            } )
                        )
                    }
                </div>

            </div>

        </div>

    )

}

export default ImageSelectedPreview