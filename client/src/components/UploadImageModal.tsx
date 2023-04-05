import { useState } from 'react';
import ReactDom from 'react-dom'
import EasyCrop from './EasyCrop'
import { IconContext } from 'react-icons';
import { BsUpload } from 'react-icons/bs';
import { GrFormClose } from 'react-icons/gr';
import { AiOutlineDelete } from 'react-icons/ai';
import { fundraiserInt } from '../utils/interfaces';

interface Props {
    open: boolean;
    onClose: () => void;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    setImage: React.Dispatch<React.SetStateAction<string>>;
    handleDeleteCurrentImage: (image: string) => void;
    currentImage: string | null;
    setFundraiser: React.Dispatch<React.SetStateAction<fundraiserInt>>;
}

export default function UploadImageModal({ open, onClose, setShow, setImage, handleDeleteCurrentImage, currentImage, setFundraiser }: Props) {


  const handleImageUpload = async (e: any) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setShow(true)
    onClose()
  };

  const handleDeleteImage = async () => {
    await handleDeleteCurrentImage(currentImage!)

      setFundraiser(pre => {
        return {
        ...pre,
        image: null
        }})

    onClose()
  }

    if (!open) return null
  
    return ReactDom.createPortal(
      <>
        <div className='w-screen fixed top-0 left-0 h-screen bg-zinc-600/70 z-50' onClick={onClose}>
        </div>
        <div className='w-full max-w-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 bg-white shadow-xl z-50 py-2 px-4 flex flex-nowrap items-end justify-center gap-3 rounded-xl'>
          <button className='absolute top-0 right-2 w-fit' onClick={onClose}>
            <IconContext.Provider value={{ className: 'h-6 w-6 text-gray-700'}}>
              <GrFormClose />
            </IconContext.Provider>
          </button>
          <label htmlFor="main-fundraiser-image" className='cursor-pointer w-1/2 h-40 text-secondary_color'>
            <div className='w-full h-full flex flex-col items-center justify-center border-2 border-secondary_color rounded'>
              <IconContext.Provider value={{ className: 'h-10 w-10 '}}>
                <BsUpload />
              </IconContext.Provider>
              <span>Importer une photo</span>
            </div>
            <input 
                type="file" 
                id='main-fundraiser-image'
                name="cover"
                onChange={handleImageUpload}
                accept="img/*"
                style={{ display: "none" }} 
                className="sr-only" 
            />
          </label>
          <button disabled={currentImage === null} className='w-1/2 h-40 text-secondary_color disabled:text-gray-400 flex flex-col items-center justify-center border-2 border-secondary_color disabled:border-gray-400 rounded' onClick={handleDeleteImage}>
              <IconContext.Provider value={{ className: 'h-10 w-10 '}}>
                <AiOutlineDelete />
              </IconContext.Provider>
              <span>Supprimer cette photo</span>
          </button>
        </div>
      </>,
      document.getElementById('edit-user-fundraiser-modal')!
    )
  }