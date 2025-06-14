import PasswordStrength from './password_strength/PasswordStrength'
import MultiStepForm from './multi_form/MultiStepForm'
import OtpInput from './otp/OtpInput'
import Combined from './Log_Register/Combined'
import ImageUpload from './Images_uploads_preview/ImageUpload'

function LoadComponents() {
  return (
    <>
      {/* <PasswordStrength /> */}
      {/* <MultiStepForm /> */}
      {/* <Combined /> */}
      
      {/* <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <OtpInput />
      </div> */}

      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <ImageUpload />
    </div>

    </>
  )
}

export default LoadComponents
