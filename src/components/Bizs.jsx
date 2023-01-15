import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import DeleteBiz from "./DeleteBiz";
import { useAuthState } from "react-firebase-hooks/auth";
import LikeArticle from "./LikeBiz";
import { Link } from "react-router-dom";

export default function Bizs() {
  const [bizs, setBizs] = useState([]);
  const [user] = useAuthState(auth);
  useEffect(() => {
    const bizRef = collection(db, "Biasharas");
    const q = query(bizRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const bizs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBizs(bizs);
      console.log(bizs);
    });
  }, []);
  return (
    <div>
      {bizs.length === 0 ? (
        <p>No Business found!</p>
      ) : (
        bizs.map(
          ({
            id,
            title,
            location,
            description,
            imageUrl,
            createdAt,
            createdBy,
            userId,
            likes,
            comments,
          }) => (
            <div className="border mt-3 p-3 bg-light" key={id}>
              <div className="row">
                <div className="col-3">
                  <Link to={`/biashara/${id}`}>
                    <img
                      src={imageUrl}
                      alt="title"
                      style={{ height: 180, width: 180 }}
                    />
                  </Link>
                </div>
                <div className="col-9 ps-3">
                  <div className="row">
                    <div className="col-6">
                      {createdBy && (
                        <span className="badge bg-primary">{createdBy}</span>
                      )}
                    </div>
                    <div className="col-6 d-flex flex-row-reverse">
                      {user && user.uid === userId && (
                        <DeleteBiz id={id} imageUrl={imageUrl} />
                      )}
                    </div>
                  </div>
                  <h3>{title}</h3>
                  <p>{location}</p>
                  <p>{createdAt.toDate().toDateString()}</p>
                  <h6>{description}</h6>

                  <div className="d-flex flex-row-reverse">
                    {user && <LikeArticle id={id} likes={likes} />}
                    <div className="pe-2">
                      <p>{likes?.length} likes</p>
                    </div>
                    {comments && comments.length > 0 && (
                      <div className="pe-2">
                        <p>{comments?.length} comments</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
}
