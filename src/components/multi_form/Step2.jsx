
const Step2 = ({ formData, handleChange }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Step 2: Account Info</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-600 mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="johndoe123"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="••••••••"
          />
        </div>
      </div>
    </div>
  );
};

export default Step2;
