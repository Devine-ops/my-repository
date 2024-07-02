import { useEffect, useState } from 'react';
import './style.css';
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [editingEmail, setEditingEmail] = useState('');
  const [editingAge, setEditingAge] = useState('');

  async function signUp() {
    try {
      await api.post('/usuarios', { name, age, email });
      alert("Usuário criado com sucesso!");
      getUsers();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }

  async function getUsers() {
    try {
      const usersFromApi = await api.get('/usuarios');
      if (Array.isArray(usersFromApi.data)) {
        setUsers(usersFromApi.data);
      } else {
        console.error('API response is not an array:', usersFromApi.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  async function deleteUsers(id) {
    try {
      await api.delete(`/usuarios/${id}`);
      getUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  async function editarUsers(id) {
    try {
      await api.put(`/usuarios/${id}`, { name: editingName, age: editingAge, email: editingEmail });
      setEditingUserId(null);
      getUsers();
    } catch (error) {
      console.error('Error editing user:', error);
    }
  }

  function startEditing(user) {
    setEditingUserId(user.id);
    setEditingName(user.name);
    setEditingEmail(user.email);
    setEditingAge(user.age);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de usuários</h1>
        <input type="text" placeholder='Nome completo' value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="number" placeholder='Idade' value={age} onChange={(e) => setAge(e.target.value)} />
        <button type="button" onClick={signUp}>Cadastrar</button>
      </form>

      {Array.isArray(users) ? (
        users.map((user) => (
          <div className='saves' key={user.id}>
            {editingUserId === user.id ? (
              <div className='edit'>
                <input type="text" value={editingName} onChange={(e) => setEditingName(e.target.value)} />
                <input type="email" value={editingEmail} onChange={(e) => setEditingEmail(e.target.value)} />
                <input type="number" value={editingAge} onChange={(e) => setEditingAge(e.target.value)} />
                <div className='botoes'>
                  <button className='salvar' onClick={() => editarUsers(user.id)}>Salvar</button>
                  <button className='cancelar' onClick={() => setEditingUserId(null)}>Cancelar</button>
                </div>
              </div>
            ) : (
              <div className='listar'>
                <p>Nome: {user.name}</p>
                <p>Idade: {user.age}</p>
                <p>E-mail: {user.email}</p>
                <div className='botoes'>
                  <button className='btn-delet' onClick={() => deleteUsers(user.id)}>
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                  <button className='btn-editar' onClick={() => startEditing(user)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
}

export default Home;
