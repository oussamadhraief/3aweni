import { useState } from 'react';
import ReactDom from 'react-dom'
import EasyCrop from './EasyCrop'
import { IconContext } from 'react-icons';
import { GrFormClose } from 'react-icons/gr';

interface Props {
    show: boolean;
    onClose: () => void;
    image: string;
    handleImageUpload: (url: string) => void;
    setCroppedImage: React.Dispatch<React.SetStateAction<string>>;
}

export default function EditImageToUploadModal({ show, onClose, image, handleImageUpload, setCroppedImage }: Props) {



    if (!show) return null
  
    return ReactDom.createPortal(
      <>
        <div className='w-screen fixed top-0 left-0 h-screen bg-zinc-600/70 z-50' onClick={onClose}>
        </div>
        <div className='w-full max-w-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 bg-white shadow-xl z-50 py-2 px-1 slide-left flex flex-col flex-nowrap justify-start'>
        <button className='absolute top-0 right-2 w-fit' onClick={onClose}>
            <IconContext.Provider value={{ className: 'h-6 w-6 text-gray-700'}}>
              <GrFormClose />
            </IconContext.Provider>
          </button>
          <div className="h-5/6 w-full flex flex-col items-center justify-start text-white">
            <EasyCrop image={image} handleImageUpload={handleImageUpload} setCroppedImage={setCroppedImage} onClose={onClose}  />
          </div>
        </div>
      </>,
      document.getElementById('edit-user-fundraiser-modal')!
    )
  }