const Step3 = ({ formData }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Step 3: Review</h2>
      <div className="space-y-3 text-gray-700">
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Username:</strong> {formData.username}</p>
        <p><strong>Password:</strong> {formData.password.replace(/./g, '•')}</p>
      </div>
    </div>
  );
};

export default Step3;
