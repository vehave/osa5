import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div style={{color: "red", border: "solid"}}>
      {message}
    </div>
  )
}

const SucceedNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div style={{color: "green", border: "solid"}}>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [succeedMessage, setSucceedMessage] = useState(null)
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [formVisible, setFormVisible] = useState(false)
  
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {    
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')    
    if (loggedUserJSON) {      
      const user = JSON.parse(loggedUserJSON)      
      setUser(user)      
      blogService.setToken(user.token)    
    }  
  }, 
  [])

  const handleLogin = async(event) => {    
    event.preventDefault()    
    console.log('logging in with', username, password)
    try {      
      const user = await loginService.login({        
        username, password,      
      })
      window.localStorage.setItem(        
        'loggedBlogappUser', JSON.stringify(user)      
      )
      blogService.setToken(user.token)       
      setUser(user) 
      setSucceedMessage(          
        `logging in succeed`        
        )        
        setTimeout(() => {          
          setSucceedMessage(null)        
        }, 5000)     
      setUsername('')      
      setPassword('')    
    } 
    catch (exception) {      
      setErrorMessage('wrong credentials')      
      setTimeout(() => {        
        setErrorMessage(null)      
      }, 5000)    
    }  
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    blogService.ereaseToken()
    setSucceedMessage(          
      `you are logged out`        
      )        
      setTimeout(() => {          
        setSucceedMessage(null)        
      }, 5000) 
  }

  const addBlog = (blogObject) => {
    
    blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setFormVisible(false)
      setSucceedMessage(          
        `a new blog ${blogObject.title} by ${blogObject.author} added`        
        )        
        setTimeout(() => {          
          setSucceedMessage(null)        
        }, 5000)
      
      })
    .catch(error => {
        
      setErrorMessage(          
        error.response.data.error       
        )  
        console.log(errorMessage)      
        setTimeout(() => {          
          setErrorMessage(null)        
        }, 5000)
    })
    
  }

  const like = blog => {
    const id = blog.id
    blog.likes = blog.likes + 1
    blogService
    .update(id, blog)      
    .then(returnedBlog => {        
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
    })
  }

  const deleteBlog = blog => {
    const id = blog.id
    if(window.confirm(`Delete ${blog.title} by ${blog.author}?`)){
      blogService      
        .deleteBlog(id)      
        .then(res => {        
          console.log(res)

          const updated = blogs.filter(blog => blog.id !==id)
          setBlogs(updated) 
          setSucceedMessage(          
            `Deleted ${blog.title} by ${blog.author}`        
            )        
            setTimeout(() => {          
              setSucceedMessage(null)        
            }, 5000)       
              
        })
        .catch(error => {
        
          setErrorMessage(          
            error.response.data.error       
            )  
            console.log(errorMessage)      
            setTimeout(() => {          
              setErrorMessage(null)        
            }, 5000)
        })
    }
    
  }

  
  const hideWhenVisible = { display: formVisible ? 'none' : '' }
  const showWhenVisible = { display: formVisible ? '' : 'none' }

  
  
  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <SucceedNotification message={succeedMessage} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>        
          <div>          
            username            
            <input 
            id="username"           
            type="text"           
            value={username}            
            name="Username"            
            onChange={({ target }) => setUsername(target.value)}          
            />        
          </div>        
          <div>          
            password            
            <input
            id="password"            
            type="password"            
            value={password}            
            name="Password"            
            onChange={({ target }) => setPassword(target.value)}          
            />        
          </div>        
          <button id="login-button" type="submit">login</button>      
        </form>
      </div>
    )
  }

  return (
    <div>
      <button onClick={handleLogout}>logout</button>
      <Notification message={errorMessage} />
      <SucceedNotification message={succeedMessage} />
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      
      
      <div style={hideWhenVisible}>
          <button id="new-blog-button" onClick={() => setFormVisible(true)}>new blog</button>
      </div>
      <div style={showWhenVisible}>
      <BlogForm
            createBlog={addBlog}
      />
      <button onClick={() => setFormVisible(false)}>cancel</button>
      </div>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} like={() => like(blog)} deleteBlog={() => deleteBlog(blog)}/>
        )}
    </div>
  )
}


export default App