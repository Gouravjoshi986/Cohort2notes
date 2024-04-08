import {useState,useEffect,useMemo,useCallback,useRef} from 'react'
import {BrowserRouter,Routes,Route,useNavigate} from 'react-router-dom'

/* useState - > to define state variables and updation function*/
const [count,setCount] = useState(0);

/* useEffect - > for lifecycle operations like when mounted when removed etc (first time rendering )*/
useEffect(()=>{
    setInterval(()=>{
        console.log("Hello World!");
    },2000)
},[])

/* useMemo - > to remember a computed value in form of cache (performance enhancing hook)*/
const ans1 = useMemo(()=>{
    let value = 0;
    value++;
    return value;
},[])

/* useCallback - > to remember a computed function effectively not re-rendering it if its a unchanging function during the complete operation cycle */
const func = useCallback(()=>{
    for(let i=0;i<=4;i++)console.log(`value is ${i}`);
},[])

/* useRef - > used to give refrence to a dom element or a value/string */
function GreetParent(){
    const focus = useRef();       //use case 1
    const count = useRef(0);      //use case 2

    function handleClick1(){
        focus.current.focus();
    }

    function handleClick2(){
       count.current = count.current + 1;            
    }

    return (
        <div>
            <Greet handleClick1={handleClick1} handleClick2={handleClick2}></Greet>
        </div>
    )
}
function Greet(){
    return (
        <div>
            <button ref={focus} onClick={handleClick1}>Click focus</button>
            {/* refrence needed for dom element */}
            <button onClick={handleClick2}>Click countValue</button>
            {/* refrence not needed for value element */}
        </div>
    )
}

/* useNavigate - > used in routing imported from react router dom used to change routes through client side routing (not re requesting whole index files in case of route change) */
import {Suspense,lazy} from 'react'
// WHEN WE ARE FETCHING ASYNCHRONOUS COMPONENT OR DATA. the call takes some time to execute 
// In order to render those components and data we use suspense api  
// just like lazy,suspense is also imported  
const Landing = lazy(()=> import('./components/Landing')); 
const About = lazy(()=> import('./components/About'));     
// THIS IS REACT LAZY LOADING. IMPORTING LIKE THIS WILL NOT SEND THE WHOLE WEBSITE BUNDLE
// IT WILL ONLY SEND THE CURRENT PAGE THAT THE USER IS VISITING. (OPTIMIZATION) 

function App(){                           // A dummy code snippet no-render or components made
    // const navigate = useNavigate();
    return (
        <> 

         {/* This code snippet wont run with the commented portion as The condition of using 
         useNavigate is that its container Parent must be the BrowserRouter if not that 
         you cant invoke or use the useNavigate */}

            {/* <button onClick={()=>{
                navigate('/');
            }}>Home</button>

            <button onClick={()=>{
                navigate('/about');
            }}>About</button> */}

            <BrowserRouter>
                <Appbar/>
                    <Routes>
                        <Route path='/' element={<Suspense fallback={"loading..."}><Landing/></Suspense>}/>
                        <Route path='/about' element={<Suspense fallback={"loading..."}><About/></Suspense>}/>
                    </Routes>
            </BrowserRouter>
        </>
    )
}
//    This routing code will work fine after making useNavigate's parent as BrowserRouter
function Appbar(){
    const navigate = useNavigate();
    return (
        <>
          <button onClick={()=>{
            navigate('/');
          }}>Home</button>
          <button onClick={()=>{
            navigate('/about');
          }}>About</button>  
        </>
    )
}

// Prop Drilling is the process of creating components and passing the state varaibles or 
// props down to child which passes it to 2nd layer of child and so on till the required 
// component which will use it.   This process of using other child components as a mediator
// when passing props is called prop drilling and it makes code ugly and hard to read 
// prop drilling is not bad as it causes re renders  its bad due to its effect on code's readability

// Context API - > A way around prop drilling   
// by using this you can teleport the props from a parent to child without passing it as props
// when using this we push state management outside react core components
