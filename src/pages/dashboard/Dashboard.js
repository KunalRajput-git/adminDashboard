import BlogDisplayCard from "../../components/displayCard/BlogDisplayCard";
import { useDispatch, useSelector } from "react-redux";
import "./dashboard.css";
import { Link } from "react-router-dom";
import { logout } from "../../redux/userSlice";
import { setBlogs } from "../../redux/createBlogSlice";
import { getBlogsFromDatabase } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import { HourglassSplit } from "react-bootstrap-icons";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const [isLoading, setIsLoading] = useState(true);
  const getBlogs = async () => {
    const results = await getBlogsFromDatabase();
    if (results.length) {
      dispatch(setBlogs(results));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <>
      <div className="Dashboard_MainContainer">
        <div className="Dashboard_Container">
          <div className="L_Container">
            <h1 style={{ color: "grey" }}>Admin</h1>
            <h3>{user !== null ? user.user : "User"}</h3>
            <Link to="/create-blog">
              <button>Create Post</button>
            </Link>
            <button onClick={() => dispatch(logout())}>Logout</button>
          </div>
          <div className="R_Container">
            {isLoading ? (
              <h3>
                Fetching <HourglassSplit /> Blogs
              </h3>
            ) : (
              blogs.blogs.map((data) => (
                <BlogDisplayCard key={data.id} data={data} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
