import React, {useState} from 'react'
import PropTypes from 'prop-types'



const Blog = ({ blog, like, deleteBlog, }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  
  
  

  
    

  
  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }
  
  return(
  <div>
  <div style={hideWhenVisible} className="onlyTitle">
  <div style={{border: "solid"}}>
    {blog.title}
    <button id="view-button" onClick={() => setDetailsVisible(true)}>view</button>
    
    <button style={{backgroundColor: "red", color: "white", border: "solid"}} onClick={deleteBlog}>delete</button>
    
  </div>
  <p></p>
  </div>
  <div style={showWhenVisible} className="alsoDetails">
    <div style={{border: "solid"}}>
    <p>
      {blog.title}
    </p>
    <p>
      author: {blog.author}
    </p>
    <p>
      {blog.url}
    </p>
    <p>
      likes: {blog.likes}
      <button id="like-button" onClick={like}>like</button> 
    </p>
    <p>
    <button onClick={() => setDetailsVisible(false)}>hide</button> 
    
    <button id="delete-button" style={{backgroundColor: "red", color: "white", border: "solid"}} onClick={deleteBlog}>delete</button>
    
    </p>
    </div>
    <p></p>
  </div>
  </div>
)}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

 
  
  


export default Blog
