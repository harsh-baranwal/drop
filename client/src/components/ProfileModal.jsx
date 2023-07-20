import { Modal, useMantineTheme } from "@mantine/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from '../actions/uploadAction';
import { updateUser } from "../actions/userAction";

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme();

  const {user} = useSelector((state) => state.authReducer.authData)

  const {password, ...other} = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleImage = (event) => {
    if(event.target.files && event.target.files[0]) {
      let img = event.target.files[0]
      event.target.name === "profileImage" ? setProfileImage(img) : ""
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(updateUser(param.id, UserData));
    setModalOpened(false);
  };

  return (
    <Modal
      overlaycolor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayopacity={0.55}
      overlayblur={10}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
        <h2 className="text-center text-2xl font-bold">Your Info</h2>
        <form action="">
            <div className="flex justify-between my-3">
                <input type="text" onChange={handleChange} value={formData.fullname} name="fullname" className="border-[1px] w-[49%] border-gray-400 p-3" placeholder="Your Name" />
                <input type="text" onChange={handleChange} value={formData.location} name="location" className="border-[1px] w-[49%] border-gray-400 p-3" placeholder="Location" /></div>
                <input type="text" onChange={handleChange} value={formData.about} name="about" className="border-[1px] w-full block border-gray-400 p-3" placeholder="Tell something about yourself..." />
            <div className="flex justify-between my-3">
                <input type="file" onChange={handleImage} name="profileImage" className="w-[49%]" />
                <input type="text" onChange={handleChange} value={formData.profession} name="profession" className="border-[1px] w-[49%] border-gray-400 p-3" placeholder="Profession" />
            </div>
                <button type="submit" onClick={handleSubmit} className="bg-primary text-white p-2 px-3">Save</button>
        </form>
    </Modal>
  )
}

export default ProfileModal;