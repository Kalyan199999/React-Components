
const Step1 = ({ formData, handleChange }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Step 1: User Info</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-600 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="john@example.com"
          />
        </div>
      </div>
    </div>
  );
};

export default Step1;
