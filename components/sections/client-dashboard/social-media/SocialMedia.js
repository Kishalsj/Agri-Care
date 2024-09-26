'use client'
import React, { useState, useEffect ,useContext } from 'react';
import axios from 'axios';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { AuthContext } from "@/components/contexts/AuthContext";

export default function SocialMedia() {
  const [user] = useContext(AuthContext);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [link, setLink] = useState('');
  const [name, setName] = useState('');
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);

  useEffect(() => {
    fetchSocialMediaLinks();
  }, []);

  const fetchSocialMediaLinks = async () => {
    // Fetch social media links from backend
    await axios.post(`${process.env.NEXT_PUBLIC_AXIOS_URL}/api/v1/auth/getSocialMedia`,{
      email: user.email,
      token: user.token
    } )
      .then(response => {
        setSocialMediaLinks(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching social media links:', error);
      });
  };

  const handleSave = async () => {
    // Send data to backend to save
    await axios.post(`${process.env.NEXT_PUBLIC_AXIOS_URL}/api/v1/auth/addSocialMedia`, { email : user.email, token: user.token, socialMedia : selectedPlatform , value : link })
      .then(response => {
        fetchSocialMediaLinks(); // Fetch updated links
        setSelectedPlatform('');
        setLink('');
        setName('');
      })
      .catch(error => {
        console.error('Error saving social media link:', error);
      });
  };

  const handleDelete = async (id) => {
    // Send request to backend to delete social media link
    await axios.post(`${process.env.NEXT_PUBLIC_AXIOS_URL}/api/v1/auth/deleteSocialMedia`, { id })
      .then(response => {
        fetchSocialMediaLinks(); // Fetch updated links
      })
      .catch(error => {
        console.error('Error deleting social media link:', error);
      });
  };


  return (
    <div className='space-y-[30px]'>
      
    <div className="w-full flex justify-between md:flex-row flex-col gap-3 md:gap-1.5">
    <select className="w-1/3 md:w-auto py-3 text-sm text-black border-gray-300 border-[1px] px-3 rounded-md  focus:outline-none cursor-pointer" onChange={e => setSelectedPlatform(e.target.value)} value={selectedPlatform}>
      <option value="">Select Platform</option>
      <option value="facebook">Facebook</option>
      <option value="twitter">Twitter</option>
      <option value="linkedin">Linkedin</option>
      <option value="discord">Discord</option>
      <option value="line">Line</option>
      <option value="instagram">Instagram</option>
    </select>
    <input
              className="py-3 w-2/3 text-sm text-black border-gray-300 border-[1px]  rounded-md pl-2 focus:outline-none"
              type="text" placeholder="Enter link" value={link} onChange={e => setLink(e.target.value)} />
    <button
    className={`bg-[#1893F8] rounded-md font-bold py-3 px-4 text-white `} onClick={() => handleSave()}>Save</button>
    
  </div>
  {socialMediaLinks && Array.isArray(socialMediaLinks) && socialMediaLinks.length > 0 && socialMediaLinks.map(link => (
      <div key={link.id} className='flex justify-between items-center'>
        <span className='flex gap-2 items-center capitalize'>{link.social_media_name === 'facebook' && <FaFacebook />} {link.social_media_name}</span> <a className='text-[#1893F8]' href={link.social_media_link} target="_blank" rel="noreferrer">{link.social_media_link}</a>
        <button className={`bg-[#1893F8] rounded-md  py-1.5 px-2 text-white `} onClick={() => handleDelete(link.id)}>Delete</button>
      </div>
    ))}
    </div>
  )
}
