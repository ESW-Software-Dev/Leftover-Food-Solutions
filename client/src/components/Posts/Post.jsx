import "./Post.css"
export default function Post({ post }) {
    return (<>
        <center className="post-container">
            <div className="img-container">
                <h1 className="name">{post.name}</h1>
            </div>
            <div className="post-info-container">
                <div className="header">
                    <div className="vertical left-align">
                        <div className="restaurant">{post.restaurant}</div>
                        <div className="organization">{post.org}</div>
                        <div className="location">{post.location}</div>
                    </div>
                    <div className=" right-align vertical">
                        <div className="posted-date"> {post.date} </div>
                        <div className="posted-time"> {post.time} </div>
                        <div className="duration">duration</div>
                    </div>
                </div>
                <div className="items-container">
                    <h3> Description </h3>
                    <div className="item-list">
                        {post.description}
                    </div>
                </div>
                <div className="contact-info">
                    <h3> Contact Info </h3>
                    <div className="name"> {post.name} </div>
                    <div className="netid">{post.netid}</div>
                </div>
            </div>
        </center>
    </>)
}



