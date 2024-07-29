import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';

interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  isBlocked: boolean;
  refreshToken: string;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/admin/getUser', {
        method: 'GET',
      });
      const data = await response.json();
        setUsers(data.userData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = async (userId: string) => {
    try {
      const response=await axios.delete(`http://localhost:3000/admin/delete_user/${userId}`)
      if (response.data.success) {
        fetchUser();
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Header />
      <div className="overflow-x-auto rounded-lg p-4 mx-52 bg-slate-400 mt-3">
        <Link to="/admin/add-user">
          <button className="py-2 px-3 bg-black text-white rounded-lg ml-auto mb-4 hover:shadow-2xl hover:scale-105">
            ADD USER
          </button>
        </Link>
        <table className="min-w-full divide-y divide-gray-200 text-center align-middle rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          {users.length > 0 && (
            <tbody className="bg-white divide-y divide-gray-300">
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td className="px-2 py-2 whitespace-nowrap">{index + 1}</td>
                  <td className="px-2 py-2 whitespace-nowrap">
                    <div className="flex items-center justify-center">
                      <div className="flex-shrink-0 h-20 w-20">
                        <img className="h-20 rounded-full" src={user.image || 'https://res.cloudinary.com/daxr1ryey/image/upload/v1721921348/User_Avatar/qdv0ydnlseno2jklavil.png'} alt={user.name} />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* Uncomment and implement the block/unblock functionality if needed */}
                    {/* {user.isBlocked ? (
                      <button
                        onClick={() => handleBlockUnblockUser(user._id)}
                        className="bg-green-500 text-white py-2 px-4 rounded-lg mx-2"
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBlockUnblockUser(user._id)}
                        className="bg-red-500 text-white py-2 px-4 rounded-lg mx-2"
                      >
                        Block
                      </button>
                    )} */}
                    <Link to={`/updateUser/${user._id}`}>
                      <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mx-2">Update</button>
                    </Link>
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded-lg mx-2"
                      title="Delete"
                      onClick={() => handleDeleteClick(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
};

export default AdminDashboard;
