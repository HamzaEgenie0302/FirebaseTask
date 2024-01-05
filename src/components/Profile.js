import { getAuth, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../helper/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { NavBar } from "./NavBar";

const Profile = () => {
  const history = useNavigate();
  const [user, setUser] = useState({});
  const [userDetail, setUserDetail] = useState({});
  const auth = getAuth();
  useEffect(() => {
    setUser(auth.currentUser);
    console.log("user ", auth.currentUser);

    getUserData(auth.currentUser);
  }, []);

  const getUserData = async (user) => {
    const q = query(collection(db, "users"), where("user_id", "==", user.uid));

    const querySnapshot = await getDocs(q);
    let arr = [];
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    setUserDetail(arr);
    console.log("doc.data() ", arr);
  };

  return (
    <div>
      <NavBar />
      <div className="home_container">
        <h2>Welcome to the Profile Page!</h2>
        <div style={{ textAlign: "left" }}>
          <h2>User Info!</h2>

          {userDetail.length > 0 &&
            userDetail.map((e, i) => {
              return (
                <>
                  <div className="card">
                    <div className="card-body">
                      <table>
                        <tbody>
                          <tr>
                            <td>Full Name</td>
                            <td>:</td>
                            <td>{e.first_name + " " + e.last_name}</td>
                          </tr>
                          <tr>
                            <td>Dob</td>
                            <td>:</td>
                            <td>{e.dob}</td>
                          </tr>
                          <tr>
                            <td>Phone</td>
                            <td>:</td>
                            <td>{e.phone}</td>
                          </tr>
                          <tr>
                            <td>Image</td>
                            <td>:</td>
                            <td>
                              <img width={100} src={e.image} />{" "}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
