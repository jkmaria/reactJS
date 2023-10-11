
  import './App.css';
  import ContactForm from './components/ContactForm';
  import ContactList from './components/ContactList';
  import ContactView from './components/ContactView';
  import ContactEdit from './components/ContactEdit';
  import NotFound from './components/NotFound';
  
 


  import { BrowserRouter, Route, Routes } from 'react-router-dom';



  function App() {
    return (
      <div className="App">
          
      
        
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<ContactForm/>} />
      <Route path='/ContactList' element={<ContactList/>} />
      <Route path='/ContactList/:contactID' element={<ContactView />} />
      <Route path='/edit-contact/:id' element={<ContactEdit />} />
      <Route path='*' element={<NotFound />} />
    
  </Routes>
    </BrowserRouter>  
    </div>
  
          

    
      
    
    
 

  
    );
  
  }

  export default App;
