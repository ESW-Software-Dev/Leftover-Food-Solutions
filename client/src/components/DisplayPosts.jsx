import Post from "./Posts/Post.jsx"
import './DisplayPosts.css'
export default function DisplayPosts ({
    posts
}) {
    const listItems = posts.map (post => 
        <li key={post.id}>
            <Post post={post}/>
        </li>
    );
    return <ul className="post-list">{listItems}</ul>
}