import { Link, Route, Routes, useParams } from "react-router-dom";
import { Button, Row, Col } from 'react-bootstrap';
import { useAddUtilizadorMutation, useDeleteUtilizadorMutation, useUtilizadoresQuery } from "../services/utilizadorAPI";


import { useState, useEffect} from "react";

const initialState = {
  
  name: "",
  address:"",
  email: ""

};

const Home = () => {

  const { data, error, isLoading, isSuccess, isFetching } = useUtilizadoresQuery();  
  const [deleteUtilizador] = useDeleteUtilizadorMutation();
  const [addUtilizador] = useAddUtilizadorMutation();

  const [formValue, setFormValue] = useState(initialState);

  const { name, address, email } = formValue;

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
 
  const onDelete = async (id: any) => {
    if (window.confirm("are you sure to delete it?")) {
      await deleteUtilizador(id);
    }
  };

  
  const formSubmit = async (e: any) => {
    e.preventDefault();
    if (window.confirm("your data was saved successfull")) {
      await addUtilizador(formValue)
    }
  };

  return (
    <div> 
       
    <div className='alert-success '>
      <h3>TAREFA PT: Um simples CRUD com reactjs-jsonServer para registar utilizadores</h3>
    <h6>TASK EN: A simple CRUD with reactjs-jsonServer for users register</h6>
 
        <h1 className='alert-primary'>KRITEK.eu</h1>
    </div>
  

<div className='container form-group'>
<Row className='m-lg-3'> 
  <form onSubmit={formSubmit}>
    <label htmlFor="name">Name</label>
            <input type="text" placeholder='insert your name' className='form-control' id="name" name="name" onChange={onInputChange} value={ name || ""}/>
    <label>Address</label>
            <input type="text" placeholder='insert your address' className='form-control' id="
    address" name="address" onChange={onInputChange} value={ address || ""}/>
    <label>Email</label>
            <input type="email" placeholder='insert your  email' className='form-control' id="email" name="email" onChange={onInputChange} value={ email || ""}/>
 


    <Button type='submit' variant="primary" className='m-sm-4'  value={"save"}>Save</Button>

   
  </form>
</Row>

<table className="table table-hover">
<thead>
  <tr>
    <th scope="col">id</th>
    <th scope="col">Name</th>
    <th scope="col">Address</th>
    <th scope="col">Email</th>   
    <th scope="col">Action</th>
  </tr>
</thead>
<tbody>
{data &&
            data.map((item: any, index: any) => {
              return (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.email}</td>
                  <td>
                    <Link to={`/editar/${item.id}`}>
                      <button className="btn btn-success sm">Edit</button>
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => onDelete(item.id)}
                    >
                      Delete
                    </button>
                 
                  </td>
                </tr>
              );
            })}
</tbody>
</table>
</div>
  </div>

);
}
export default Home;