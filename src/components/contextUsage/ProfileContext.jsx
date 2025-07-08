import  useAuth  from "../mycontext/AuthContext";

const ProfileContext = () => {
  const { user, logout } = useAuth();

  if (!user) return <p className="text-center">Not logged in</p>;

  return (
    <div className="max-w-sm mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-2">👤 Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Password:</strong> {user.password}</p>
      <button onClick={logout} className="mt-4 bg-red-500 text-white py-1 px-4 rounded">
        Logout
      </button>
    </div>
  );
};

export default ProfileContext;
