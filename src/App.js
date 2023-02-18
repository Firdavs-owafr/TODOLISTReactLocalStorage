import React,{ useState,useEffect } from 'react';
import './App.scss';
import moon from './img/moon.png';
import sun from './img/sun.png';


function App() {

    const [input, setInput] = useState('')

    const [noswitch, setSwitch] = useState('All')
    
    const getTheme = () => {
        return false || JSON.parse(localStorage.getItem('theme')) 
    }
        
        const [icon, setIcon] = useState(getTheme())
    
    
    
    useEffect(() => {
        localStorage.setItem('theme',JSON.stringify(icon))
    }, [icon])
    
    
    const getTodos = () => {
        return JSON.parse(localStorage.getItem('todos')) ||  [{
            id: 1,
            title: 'Hello',
            fulfilled: false
        }]
    }

    const [text, setText] = useState(getTodos())
    
    useEffect(() => {
        localStorage.setItem('todos',JSON.stringify(text))
    }, [text])

    const primer = (id,) => {
        setText([...text, {
            id:text.length+1,
            title: input,
            fulfilled: false,
        } ])
    }
    
    // console.log(setText);    
    
    const onClickFulfilled = (id) => {
        let a = text.map((item) => {
            if(item.id === id){
                item.fulfilled = !item.fulfilled
            }
            return item
         })
         setText(a)
    }
    
    const darkModeICon = () => {
        setIcon(!icon)
    }
    

    const onDelete = (id) => {
        let eff = text.filter(pre => pre.id !== id )
        setText(eff)
        // localStorage.clear()   
    }


    const inputValue = (e) => {
        setInput(e.target.value)
        
    }


    const notDefault = (e) => {
        e.preventDefault()
        
    if(e.target['0'].value.length > 0){
            primer()
            setInput('')
            console.log(true);
    }
    }
    

    const clearCompletedBtn = () => {
        let filter = text.filter(se => !se.fulfilled )
        setText(filter)
        // localStorage.clear()
    }

    

    const switchCaseThree = (filt) => {

        switch(noswitch){
            case 'Active':
                // console.log('active');
                return text.filter((item) => !item.fulfilled );
            case 'Completed':
                // console.log('completed');
                return text.filter((item) => item.fulfilled );
                default: 
            return text
        }   


    }

    

    let fil = text?.filter(item => !item.fulfilled).length;

    
  return (

    <>
        <div className={ icon ? 'body lightMode' : 'body' }>
        <div className="App">
            <div className="image"></div>
                <div className="wrapper">
                    <header>
                            <h1 className='title'>TODO</h1>
                            <div className='icon' onClick={darkModeICon}>
                                    {
                                        icon ? <img src={moon} alt="" /> : <img src={sun} alt="" />
                                    }
                            </div>
                    </header>
                    <form className="SearchPanel" onSubmit={notDefault} >
                        <div className="oval"></div>
                        <input type="text" placeholder='Create a new todo…' onChange={inputValue} value={input}  />
                    </form>
                    <section>
                        <ul>
                                {
                                    text && switchCaseThree('').map((item,index) => 
                                    <div key={item.id}>
                                        <div className='df'  >
                                     <div className='text'>
                                    <span className={item.fulfilled ? 'ovalClick' : 'crOval' } onClick={() => onClickFulfilled(item.id)}></span>
                                                <li className={item.fulfilled ? 'li cherta' : 'li' }> {item.title} </li>
                                </div>
                                    <div className="close" onClick={() => onDelete(item.id)}>&#10006;</div>
                                    
                                   </div>
                            <div className="linie"></div>   
                                    </div>

                                )
                                }
                        </ul>
                                <footer>
                                <div className="count">{ fil } items left</div>
                                <div className="clickActive">
                                    <span className='active' onClick={() => setSwitch('')} >All</span>
                                    <span className='active' onClick={() => setSwitch('Active')} >Active</span>
                                    <span className='active' onClick={() => setSwitch('Completed')} >Completed</span>
                                </div>
                                <span className='clearCompleted' onClick={clearCompletedBtn} >Clear Completed</span>
                            </footer>
                    </section>
                    <div className="clickActive">
                        <div className='mobildis'>
                        <span className='active' onClick={() => setSwitch('')} >All</span>
                                    <span className='active' onClick={() => setSwitch('Active')} >Active</span>
                                    <span className='active' onClick={() => setSwitch('Completed')} >Completed</span>
                        </div>
                    </div>
                </div>  
        </div>
    </div>
    </>
  );
}

export default App;
