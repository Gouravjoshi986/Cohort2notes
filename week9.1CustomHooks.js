// hooks that we can create ourselves using other system hooks or other custom hooks are called hooks . they must start with use 
// examples are data fetching hook or browser functionality hooks 

//IDEALLY you should create a differant folder called hooks and create .jsx files for hooks and export them to use 

// eg of DATA FETCHING HOOKS 
//  SWR GOOD REACT LIBRARY FOR DATA FETCHING 
import {useState,useEffect} from "react"

function useTodos(n){
    const [todos,setTodos] = useState([]);
    const [loading,setLoading] = useState(true);
    
    useEffect(() => {
      const value = setInterval(()=>{
          axios.get('/').then(res =>{
            setTodos(res.data.todos);
            setLoading(false);
          });  
        },n*1000)
        // run once before n seconds 
        axios.get('/').then(res =>{
          setTodos(res.data.todos);
          setLoading(false);
        });
        //clear function to clear old interval when new interval starts 
        return ()=>{
            clearInterval(value);
        }
    },[n])
    
    return {todos,loading};
}

function App(){
    const {todos,loading} = useTodos(n);
    
    return (
        <>
           {loading ? <div>loading...</div>:todos.map((todo)=><Todo todo={todo}/>)}
        </>
    )
}

function Todo({todo}){
    return(
        <>
        <div>{todo.title}</div>
        <div>{todo.description}</div>
        </>
    )
}

//  BROWSER FUNCTIONALITY HOOKS 
// window.navigator.online (Dom method) returns true if you are online. 

//  useIsOnline 

function useIsOnline(){
    const [isOnline,setIsOnline] = useState(window.navigator.onLine);
    useEffect(()=>{
        window.addEventListener("online",()=>{
            setIsOnline(true);
        })
        window.addEventListener("offline",()=>{
            setIsOnline(false);
        })
    },[])
}

function App2(){
    const isOnline = useIsOnline();
    if(isOnline)return <div>You are online</div>
    else return <div>You are offline</div>
}

//  window.addEventListener("mousemove",()=>{})  will trigger the callback function whenever the mouse moves   
// useMousePointer

function useMousePointer(){
    const [position,setPosition] = useState({x:0,y:0});

    function handleMouse(e){
        setPosition({x:e.clientX,y:e.clientY})
    }
    useEffect(()=>{
        window.addEventListener("mousemove",handleMouse);
        return ()=>{
            window.removeEventListener("mousemove",handleMouse);
        }
    },[])
    return position;
}
function App3(){
    const mousePosition = useMousePointer();
    return <div>Your mouse position is {mousePosition.x} {mousePosition.y}</div>;
}

// Performace timer based hooks  
// useInterval

function useInterval(){
    useEffect(()=>{
        const interval = setInterval(()=>{
            // function to run 
        },timer)
        return ()=>[
            clearInterval(interval)
        ]
    },[])
}

// useDebounce 

function useDebounce(value,delay){
    const [debouncedValue,setDebouncedValue] = useState(value);
    useEffect(()=>{
        const tout = setTimeout(()=>[
            setDebouncedValue(debouncedValue)
        ],delay)

        return ()=>[    
            clearTimeout(tout)
        ]
    },[value])
    return debouncedValue;
}

function app4(){
    const [value,setValue] = useState(0);
    const debouncedValue = useDebounce(value,delay)
    return <input type="text" onChange={(e)=>setValue(e.target.value)}>{value}</input>
}