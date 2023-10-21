import { useState, useRef, useEffect } from "react";
import { db } from "../firebaseInit";
import { collection, doc, addDoc, onSnapshot, deleteDoc } from "firebase/firestore"; 

// Add a new document with a generated id.


// function blogsReducer(state, action){
//     switch(action.type){
//         case 'ADD':
//             return [action.blog, ...state]
//         case 'REMOVE':
//             return state.filter((blog, index)=>index !== action.index)
//         default:
//             return []
//     }
// }

//Blogging App using Hooks
export default function Blog(){
    let [formData, setFormData]=useState({title:'', content:''})
    let [blogs, setBlogs]=useState([])
    //let [blogs, dispatch]=useReducer(blogsReducer, [])

    const titleRef=useRef(null);
    useEffect(()=>{titleRef.current.focus()},[])

    //Passing the synthetic event as argument to stop refreshing the page on submi
    async function handleSubmit(e){
        e.preventDefault();
        const docRef = await addDoc(collection(db, "blogs"), {
            title: formData.title,
            content: formData.content,
            createdOn: new Date()
          });
        console.log("Document written with ID: ", docRef.id);
        //dispatch({type:'ADD', blog:{title: formData.title, content: formData.content}})
        changeTitle()
        setFormData({title:'', content:''})
        titleRef.current.focus()
    }

    function changeTitle(){
        document.title=formData.title
    }

    async function deleteBlog(id){
        // dispatch({type: 'REMOVE', index: i})
        let docRef=doc(db, "blogs", id);
        await deleteDoc(docRef);
    }
    



    useEffect(()=>{

        onSnapshot(collection(db, 'blogs'), (snapshot)=>{
            const blogs=snapshot.docs.map((doc)=>{
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })
            console.log(blogs)
            setBlogs(blogs)
        })
    },[])
    //title set to 'No Blogs' because of order of execution of useEffect
    
    return(
        <>
        {/* Heading of the page */}
        <h1>Write a Blog!</h1>

        {/* Division created to provide styling of section to the form */}
        <div className="section">

        {/* Form for to write the blog */}
            <form onSubmit={handleSubmit}>

                {/* Row component to create a row for first input field */}
                <Row label="Title">
                        <input className="input"
                                name="title"
                                placeholder="Enter the Title of the Blog here.." 
                                value={formData.title}
                                ref={titleRef}
                                onChange={(e)=>{setFormData({title: e.target.value, content: formData.content})}}
                                />
                </Row >

                {/* Row component to create a row for Text area field */}
                <Row label="Content">
                        <textarea className="input content"
                                name="content"
                                placeholder="Content of the Blog goes here.."
                                value={formData.content}
                                onChange={(e)=>{setFormData({title: formData.title, content: e.target.value})}}
                                required
                                />
                </Row >

                {/* Button to submit the blog */}            
                <button type="submit" className="btn">ADD</button>
            </form>
                     
        </div>

        <hr/>

        {/* Section where submitted blogs will be displayed */}
        <h2> Blogs </h2>
        {blogs.map((blog, i)=>
            (<div key={i} className="blog">
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
                <button onClick={()=>{deleteBlog(blog.id)}}>Delete</button>
            </div>
            )
        )}
        </>
        )
    }

//Row component to introduce a new row section in the form
function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr />
        </>
    )
}
