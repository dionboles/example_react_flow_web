import React,{useState,useEffect} from 'react';
import ReactFlow,{ReactFlowProvider} from "react-flow-renderer";
import axios from "axios"
// const elements = [
//   { id: '1', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
//   // you can also pass a React component as a label
//   { id: '2', data: { label: <div>Node 2</div> }, position: { x: 100, y: 100 } },
//   { id: 'e1-2', source: '1', target: '2', animated: true },
// ];


const onElementClick = (_, element) => console.log('click', element);

function App() {
  const [box, setBox] = useState([])
  const getData = async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts")
      const data = res.data.map((e) =>{
        return {
          id: e.id,
          data: {
            label: e.title
          },
          position: { x: Math.floor(Math.random()*1000), y: Math.floor(Math.random()*1000) },
          
        }
      })
      let box = []
      for (let index = 0; index < data.length; index++) {
        let next = data[ (index+1) % data.length ]; // <= THE MAGIC

        let current_id = data[index].id
        let conntion = { id: `e1-${current_id}`, source:`${current_id}` , target: `${next.id}`, animated: true }
        box.push(
        data[index]
        )
        box.push(conntion)
      }
     return box
  }
  useEffect(() => {
    const getPosts = async () => {
     const postData = await getData()
     setBox(postData)
    }
    getPosts()
  }, [])
  const BasicFlow = () =>{
   
    console.log(box)
  return(
  <ReactFlowProvider>
  <ReactFlow 
    elements={box} 
    onElementClick={onElementClick}
  
  />
  </ReactFlowProvider>
  )
}

  return (
    <div className="App" style={{height:"100vh",width:"100vw"}}>
      <BasicFlow />
    </div>
  );
}

export default App;
