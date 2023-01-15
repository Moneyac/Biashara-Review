import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import LikeBiz from "./LikeBiz";
import Comment from './Comment';

export default function Biz() {
  const { id } = useParams();
  const [biz, setbiz] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const docRef = doc(db, "Biasharas", id);
    onSnapshot(docRef, (snapshot) => {
      setbiz({ ...snapshot.data(), id: snapshot.id });
    });
  },);
  return (
    <div className="container border bg-light" style={{ marginTop: 70 }}>
      {biz && (
        <div className="row">
          <div className="col-3">
            <img
              src={biz.imageUrl}
              alt={biz.title}
              style={{ width: "100%", padding: 10 }}
            />
          </div>
          <div className="col-9 mt-3">
            <h2>{biz.title}</h2>
            <h3>{biz.location}</h3>
            <h5>Owner: {biz.createdBy}</h5>
            <div> Posted on: {biz.createdAt.toDate().toDateString()}</div>
            <hr />
            <h4>{biz.description}</h4>

            <div className="d-flex flex-row-reverse">
              {user && <LikeBiz id={id} likes={biz.likes} />}
              <div className="pe-2">
                <p>{biz.likes.length}</p>
              </div>
            </div>
            {/* comment  */}
            <Comment id={biz.id} />
          </div>
        </div>
      )}
    </div>
  );
}
