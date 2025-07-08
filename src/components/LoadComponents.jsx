import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PasswordStrength from './password_strength/PasswordStrength'
import MultiStepForm from './multi_form/MultiStepForm'
import OtpInput from './otp/OtpInput'
import Combined from './Log_Register/Combined'
import ImageUpload from './Images_uploads_preview/ImageUpload'
import ImageSelectedPreview from './Images_uploads_preview/Image_1'
import MySliders from './image_sliders/MySliders'
import MySwiperSlider_2 from './image_sliders/MySliders_2'
import DragDropUploader from './dargdrop/DragDropUploader'
import DraggableWrapper , {MultiDraggable}  from './dargdrop/DraggableWrapper '

import AudioPlayer from './audioplayer/AudioPlayer'



function LoadComponents() {
  return (
    <>

    <ToastContainer position="bottom-right" autoClose={3000} pauseOnHover={false} hideProgressBar={true} />
    
      {/* <PasswordStrength /> */}
      {/* <MultiStepForm /> */}
      {/* <Combined /> */}
      
      {/* <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <OtpInput />
      </div> */}

      {/* <ImageSelectedPreview /> */}

      {/* <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <ImageUpload />
      </div> */}

      {/* <MySliders />
      <MySwiperSlider_2 /> */}

      {/* <DragDropUploader /> */}
      {/* <MultiDraggable />
      <DraggableWrapper /> */}

      <AudioPlayer />

    </>
  )
}

export default LoadComponents
