import { getAuth, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../helper/firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { NavBar } from "./NavBar";

const InfoEntryForm = () => {
  const history = useNavigate();
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState([]);
  const [isImageUploading, setIsImageUploading] = useState(false);
  let fieldsArr = [
    { field_name: "first_name", type: "text", placeholder: "First name" },
    { field_name: "last_name", type: "text", placeholder: "Last name" },
    { field_name: "dob", type: "date", placeholder: "date of birth" },
    { field_name: "phone", type: "text", placeholder: "Phone" },
    { field_name: "image", type: "file", placeholder: "Image" },
  ];
  const auth = getAuth();
  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  const saveData = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "users"), {
        user_id: user.uid,
        ...userData,
      });
      setUserData({});
      history("/profile");
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target?.files[0];
    if (!file) return;
    setIsImageUploading(true);
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
         
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUserData({ ...userData, image: downloadURL });
          console.log(' setImageUploadProgress(0)')
          setIsImageUploading(false);
        });
        
      }
    );
  };

  return (
    <div>
      <NavBar />
      <div className="home_container">
        <div id="login-form-wrap">
          <h2>Please Enter Info</h2>
          {fieldsArr.map((ele) => {
            return (
              <input
                type={ele.type}
                placeholder={ele.placeholder}
                onChange={(e) => {
                  if (ele.type === "file") handleFileUpload(e);
                  setUserData({
                    ...userData,
                    [ele.field_name]: e.target.value,
                  });
                }}
              />
            );
          })}
          
          <button disabled={isImageUploading ? true : false} onClick={saveData}>{ isImageUploading  ? "uploading Image..." : 'Submit' }</button>
        </div>
      </div>
    </div>
  );
};

export default InfoEntryForm;
