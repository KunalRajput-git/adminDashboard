import { initializeApp } from "firebase/app";

import {
  getFirestore,
  getDocs,
  collection,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

// Firestore
const database = getFirestore();

// Fetch Admins Data
export const getAdminsFromDatabase = async () => {
  try {
    let Admins = [];
    await (
      await getDocs(collection(database, `Admin`))
    ).forEach((doc) => {
      Admins.push({ ...doc.data() });
    });
    return Admins;
  } catch (err) {
    console.log("Err: ", err);
  }
};

// getDocs
export const getBlogsFromDatabase = async () => {
  try {
    let blogs = [];
    await (
      await getDocs(collection(database, `Blogs`))
    ).forEach((doc) => {
      blogs.push({ ...doc.data() });
    });
    return blogs;
  } catch (err) {
    console.log("Err: ", err);
  }
};

// addDocs

export const addBlogInDatabase = async (bid, data) => {
  try {
    return await setDoc(doc(database, "Blogs", bid), data);
  } catch (err) {
    console.log("Err: ", err);
  }
};
// deleteDocs

export const deleteBlogInDatabse = async (bid) => {
  try {
    return await deleteDoc(doc(database, "Blogs", bid));
  } catch (err) {
    console.log("Err: ", err);
  }
};

// Storage
const storage = getStorage(app);

export const uploadMedia = async (img) => {
  try {
    await uploadBytesResumable(
      ref(storage, `Images/reverrBlogImages/${img.name}`),
      img
    );
    const getImg = await ref(storage, `Images/reverrBlogImages/${img.name}`);
    const imgLink = await getDownloadURL(getImg);
    return imgLink;
  } catch (err) {
    console.log("Err: ", err);
  }
};

export const deleteMedia = (imgName) => {
  deleteObject(ref(storage, `Images/reverrBlogImages/${imgName}`));
};
