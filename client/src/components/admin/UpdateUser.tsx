import React, { useEffect, useState } from 'react';
import validate from '../../utils/validate';
import axios from 'axios';
import PhotoIcon from '../../assets/PhotoIcon';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUser: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setErrors] = useState<string[]>([]);
  const [displayImage, setDisplayImage] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | ArrayBuffer | null>(null);
  const navigate=useNavigate()

  const fetchUser = async (userId: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/admin/getUser/${userId}`);
      const user = response.data.user;
      setName(user.name);
      setEmail(user.email);
     user.image && setDisplayImage(user.image);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    }
  }, [userId]);

  const handleSubmit = async () => {
    const data = { name, email, password, image: userImage };
    if (!validate({ data, setErrors })) return;

    try {
      const response = await axios.post(`http://localhost:3000/admin/profile-update/${userId}`, { name, email, password, image:userImage, });
      if (response.data.success) {
        navigate('/admin')
      }
    } catch (error: any) {
      setErrors([error.response.data.message]);
    }
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setDisplayImage(imageURL);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setUserImage(reader.result);
      };
    }
  };

  return (
    <div className="mx-auto w-full flex flex-col items-center justify-center">
      <p className="font-bold text-3xl mb-5" style={{ color: '#002F34' }}>
        UPDATE USER PROFILE
      </p>
      <div className="w-3/5 border flex flex-col border-black p-4">
        <div className="p-4 flex space-x-5 ml-5">
          <div className="w-1/2">
            <p className="font-bold text-xl mb-3">INCLUDE SOME DETAILS</p>
            <div className="mb-8">
              <p>Change Name</p>
              <input
                className="border border-black rounded w-full p-2"
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
              {error.includes('nameError') && (
                <p className="text-sm text-red-500">Enter a valid name</p>
              )}
            </div>
            <div className="mb-8">
              <p>Email</p>
              <input
                className="border border-black rounded w-full p-2"
                value={email}
                type="email"
                readOnly
              />
              {error.includes('emailError') && (
                <p className="text-red-700 text-sm pl-2">Enter a valid email</p>
              )}
              {error.includes('existingUser') && (
                <p className="text-red-700 pl-2 text-sm">Email already exists</p>
              )}
            </div>
            <div className="mb-8">
              <p>Admin Password</p>
              <input
                className="border border-black rounded w-full p-2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error.includes('passwordError') && (
                <p className="text-red-700 pl-2 text-sm">Invalid password</p>
              )}
            </div>
            <div>
              <label htmlFor="file_input">
                <PhotoIcon />
              </label>
              <input
                onChange={handlePhoto}
                id="file_input"
                style={{ display: 'none' }}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/png"
              />
              {error.includes('imageError') && (
                <p className="text-sm text-red-500">Please select an image</p>
              )}
            </div>
          </div>
          <div className="border p-5 w-96 h-96 border-black">
            <img
              className="w-full h-full object-cover"
              src={displayImage || 'https://res.cloudinary.com/daxr1ryey/image/upload/v1721921348/User_Avatar/qdv0ydnlseno2jklavil.png'}
              alt="Profile Image"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="text-white p-2 rounded-md font-bold"
            style={{ backgroundColor: '#002F34' }}
          >
            UPDATE
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
