import { useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Row, Col } from 'react-bootstrap';
import { useUtilizadorQuery, useUpdateUtilizadorMutation} from "../services/utilizadorAPI";

const initialState = {
  
  name: "",
  address:"",
  email: ""

};



const Editar = () => {


  const { id } = useParams();
  const { data, error } = useUtilizadorQuery(id!); 
  
  const [formValue, setFormValue] = useState(initialState);

  const { name, address, email } = formValue;
  
  const [updateUtilizador] = useUpdateUtilizadorMutation();

  useEffect(() => {
    if (id) {
      if (data) {
        setFormValue({ ...data });
      }else{

        setFormValue({...initialState})
      }
    }
  }, [id, data]);

  const formAlterSubmit = async (e: any) => {
    e.preventDefault();
    if (window.confirm("your data was updated successfull")) {
      await updateUtilizador(formValue)
    }
  };

  const onInputChange = (e: any) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };


  useEffect(() => {
    if (error) {
      alert("algo está errado");
    }
  }
  , [error])

 
  return (
    <div>
    <div className='alert-success '>
      <h3>TAREFA PT: Um simples CRUD com reactjs-jsonServer para a matrícula do aluno numa universidade</h3>
    <h6>TASK EN: A simple CRUD with reactjs-jsonServer for university student enrollment</h6>
    </div>
  
      <h2>UPDATE THE USER INFORMATION</h2>

  <div className='container form-group'>
    <Row className='m-lg-3'> 
      <form onSubmit={formAlterSubmit}>
            <label htmlFor="name">Name</label>
    
            <input type="text" onChange={onInputChange} placeholder='insert your name' className='form-control' id="name" name="name"  value={ name || ""}/>
    <label>Address</label>
            <input type="text" onChange={onInputChange} placeholder='insert your address' className='form-control' id="address" name="address" value={ address || ""}/>
    <label>Email</label>
            <input type="email" onChange={onInputChange}  placeholder='insert your  email' className='form-control' id="email" name="email"  value={ email || ""}/>
 


            <Button type='submit' variant="primary" className='m-sm-4' value={"alter"}>ALTER</Button>
            <Link to="/">
            <Button type='submit' variant="success" className='m-sm-4'  >BACK</Button>
            </Link>
  

   
  </form>
        </Row>

  </div>
</div>
  );
};
export default Editar;