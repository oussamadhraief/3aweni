import { useCallback, useState } from "react";
import Slider from '@mui/material/Slider';
import Cropper from "react-easy-crop";
import getCroppedImg from "./Crop";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@emotion/react";

const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    }
  },
});

const EasyCrop = ({ image, handleImageUpload, setCroppedImage, onClose }: { image: string; handleImageUpload: (url: string) => void; setCroppedImage: React.Dispatch<React.SetStateAction<string>>; onClose: () => void;  }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number | number []>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getNewCroppedImage = useCallback(async () => {
    try {
      // const croppedImage: any = await getCroppedImg(
      //   image,
      //   croppedAreaPixels
      // );
      const canvas = await getCroppedImg(image, croppedAreaPixels)
      canvas?.toBlob((file) => {
    
        // resolve(URL.createObjectURL(file!));
          const reader = new FileReader();
          reader.onload = async function () {
            setCroppedImage(reader.result as string)
            handleImageUpload(reader.result as string)
            setCroppedImage('')
            onClose()
          }
          if(file)
              reader.readAsDataURL(file)
      }, "image/jpeg");
      
      
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, image]);

  return (
    <div className="w-full h-full">
      
      <div
        className="w-full h-full flex flex-col relative items-center justify-center"
        >
        <div className="w-full rounded-full overflow-hidden mt-5">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom as number}
            zoomSpeed={4}
            maxZoom={3}
            zoomWithScroll={true}
            showGrid={true}
            aspect={7 / 4}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            
          />
        </div>
        <div className="flex flex-col w-[90%] absolute bottom-2 left-[5%] text-white">
        {/* BsFillImageFill */}
          <ThemeProvider theme={theme}>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="zoom"
                onChange={(e: Event, zoom) => setZoom(zoom)}
                className="range"
                color="primary"
              />
            </ThemeProvider>
        </div>
      </div>
      <div className="w-full mt-5 flex justify-center">
        <button className="z-2 cursor-pointer w-24 py-1 bg-secondary_color rounded self-center text-white"
          onClick={getNewCroppedImage}
        >
          Importer
        </button>
      </div>
    </div>
  );
};

export default EasyCrop;