import React from 'react'

const blogForm = ({addBlog, handleTitleChange, handleAuthorChange, handleUrlChange, newTitle, newAuthor, newUrl}) => {
    return(
    <form onSubmit={addBlog}>
    <p>title: 
    <input
      value={newTitle}
      onChange={handleTitleChange}
    />
    </p>
    <p>
    author: 
    <input
      value={newAuthor}
      onChange={handleAuthorChange}
    />
    </p>
    <p>
    url: 
    <input
      value={newUrl}
      onChange={handleUrlChange}
    />
    </p>
    <button type="submit">save</button>
    </form>
   
    )
}
    
    

export default blogForm