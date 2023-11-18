import axios from "axios"
import { useState ,useEffect} from "react"

const App = () => {

  const API = "http://localhost:3000/posts"
  const [data,setData] =useState<number[]>([])
  const [text,setText] = useState<string>("")
  const [modal,setModal] = useState<boolean>(false)
  const [addModal,setAddModal] = useState<boolean>(false)
  const [title,setTitle] = useState<string>("")
  const [idx,setIdx] = useState< null | number | any >()
  async function get() {
    try {
      const {data} = await axios.get(API)
     setData(data)
     } catch (error) {
      
    }
  }
  async function deleted(id:number){
    try {
      let {data} = await axios.delete(`${API}/${id}`)
      get()
    } catch (error) {
      
    }
  }
  async function addTodo(user:any){
    if(text.trim().length == 0){
      alert("SOS")
    }
    else{

 
    user ={
title:text,
comp:false
    }

    try {
      const {data} = await axios.post(API,user)
      get()
    } catch (error) {
      
    }   }
  }
  async function editTodo(id:number) {
    const obj={
      title:title
    }
    try {
      const {data} = await axios.put(`${API}/${id}`,obj)
      get()
    } catch (error) {
      
    }
    
  }
  async function Done(e:any,id:number) {
    const obj ={
      title:e.title,
      comp:!e.comp
    }
    try {
      const {data} =  await axios.put(`${API}/${id}`,obj)
      get()
    } catch (error) {
      
    }
    
  }
  useEffect(()=>{
    get()
  },[])


 
  return (
    <div style={{width:"80%", marginLeft:"auto",paddingBottom:"50px", marginRight:"auto"}}>
      <span style={{display:'flex', justifyContent:'center',fontSize:"50px"}}>USERLIST</span>
      {
        addModal ?   
        <div style={{position:"fixed", background:"rgba(0, 0 ,0, 0.5)",left:0, right:0 , bottom:0,top:0}}>

       
        <div style={{textAlign:"center", marginTop:"150px", paddingTop:"120px", background:"white",width:"50%",height:"300px",margin:"auto",borderRadius:10}}>
        <p>Add</p>
        <div style={{display:"flex", alignItems:"center", justifyContent:"center",gap:10}}>
        <input style={{outline:"none", borderRadius:"5px", padding:"10px"}} value={text} onChange={(event)=>{setText(event.target.value)}} type="text" />
      <button style={{background:"rgb(26, 255, 0) ",color:"black",border:"none"}} onClick={()=>{addTodo(text),setText(""),setAddModal(false)}}>add</button>
      <button onClick={()=>{setAddModal(false)}} style={{background:"red",color:"white"}}>&times;</button>
        </div>
  
      </div> 
      </div>
      : null

      }
   
      
      <div className="" style={{marginTop:40, textAlign:"center",display:"grid",gap:10,gridTemplateColumns:"1fr 1fr"}}>

 
      {
        data.map((e:any)=>{
          return(
            <div className="" style={{background:e.comp?"rgb(6, 200, 0)":"", border:"dashed" ,borderRadius:"15 px",padding:20}} key={e.id}>
            <h1>{e.title}</h1>
            <button onClick={()=>{deleted(e.id)}}>Delete</button>
            <button onClick={()=>{setModal(true),setTitle(e.title),setIdx(e.id)}}>Edit</button>
            <input type="checkbox" checked={e.comp} onChange={()=>{Done(e,e.id)}} />
            </div>
          )
        })
      }
      <span style={{justifySelf:"start", alignSelf:"end"}}>      <button style={{background:"rgb(6, 200, 0)"}} onClick={()=>{setAddModal(!false)}}>+</button></span>

           </div>
      {
        modal ?(
          <div style={{position:"fixed",display:"flex", background:"rgba(0, 0 ,0, 0.5)",left:0, right:0 , bottom:0,top:0}}>

    
          <div style={{textAlign:"center", display:"grid", marginTop:"150px", gap:"10px", paddingTop:"120px", background:"white",width:"50%",height:"300px",margin:"auto",borderRadius:10}}>
            <span>Edit</span>
            <div>
                          <input style={{outline:"none", borderRadius:"5px", padding:"10px"}} value={title} onChange={(event) =>setTitle(event.target.value)} type="text" />
            <button onClick={()=>{editTodo(idx),setTitle(""),setModal(false)}}>Save</button>
<button  onClick={()=>{setModal(false)}}>&times;</button>
            </div>
            <span></span>
          </div>
          </div>
          
        ):null
      }
    </div>
  )
}

export default App