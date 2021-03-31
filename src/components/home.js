

import React, { Component } from 'react';
import { Input, InputGroup, Label, FormGroup, Table ,Modal ,ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import axios from 'axios';


class Home extends Component {

  state = {
    posts: [],
    newUserData: {
      title: '',
      body: ''
    },
    editUserData: {
      id: '',
      title: '',
      body: ''
    },
    newUserModal: false ,
    editUserModal: false
  }

                                   // SHOW USERS

  componentDidMount() {
    this._refreshUsers();
  }


  toggleNewUserModal() {
    this.setState({
      newUserModal: ! this.state.newUserModal
    });
  }

  toggleEditUserModal() {
    this.setState({
      editUserModal: ! this.state.editUserModal
    });
  }


                                     //  ADD USER

  addUser() {
    axios.post('https://academy-training.appssquare.com/api/posts', this.state.newUserData)
    .then((response) => {
      let { posts } = this.state;
      posts.push(response.data.data);
      this.setState({
        posts,
        newUserModal:false,
        newUserData: {
          title: '',
          body: ''
        }
      });
    });
  }


                                     // EDIT USER

updateUser (){
let { title, body } = this.state.editUserData;
axios.put('https://academy-training.appssquare.com/api/posts/' + this.state.editUserData.id, {
  title, body
}).then((response) => {
  this._refreshUsers();
  this.setState ({
    editUserModal:false,
    editUserData: {
      id: '',
      title: '',
      body: ''
    }
  })
});
}                                     

editUser (id, title, body) {
  this.setState({
    editUserData: { id, title, body}, editUserModal: ! this.state.editUserModal
  });
}


                                      // REMOVE USER
deleteUser(id) {
  axios.delete('https://academy-training.appssquare.com/api/posts/' + id).then((response) => 
  {
    this._refreshUsers();
  });
}

                                      // refresh users

_refreshUsers (){
  axios.get('https://academy-training.appssquare.com/api/posts').then((response) => {
      console.log(response.data)
      this.setState({
        posts: response.data.data
      })
    });
}
  render (){

    return (
      <div className="App container">

                               {/* ADD USER   */}

        <Button className="add-button" color="primary" onClick={this.toggleNewUserModal.bind(this)}>Add User</Button>

        <Modal isOpen={this.state.newUserModal} toggle={this.toggleNewUserModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewUserModal.bind(this)}>ADD NEW USER</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input id="title" 
              value={this.state.newUserData.title}
              onChange={(e) => {
                let {newUserData} = this.state;
                newUserData.title = e.target.value;
                this.setState({ newUserData });
              }}
              />
            </FormGroup>

            <FormGroup>
              <Label for="body">Body</Label>
              <Input id="body" value={this.state.newUserData.body}
              onChange={(e) => {
                let {newUserData} = this.state;
                newUserData.body = e.target.value;
                this.setState({ newUserData });
              }}
               />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addUser.bind(this)}>ADD</Button>
            <Button color="secondary" onClick={this.toggleNewUserModal.bind(this)}>Cancel</Button>

          </ModalFooter>
        </Modal>

                               {/* EDIT USER */}

        <Modal isOpen={this.state.editUserModal} toggle={this.toggleEditUserModal.bind(this)}>
          <ModalHeader toggle={this.toggleEditUserModal.bind(this)}>Edit USER</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input id="title" 
              value={this.state.editUserData.title}
              onChange={(e) => {
                let {editUserData} = this.state;
                editUserData.title = e.target.value;
                this.setState({ editUserData });
              }}
              />
            </FormGroup>

            <FormGroup>
              <Label for="body">Body</Label>
              <Input id="body" value={this.state.editUserData.body}
              onChange={(e) => {
                let {editUserData} = this.state;
                editUserData.body = e.target.value;
                this.setState({ editUserData });
              }}
               />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateUser.bind(this)}>Update</Button> 
            <Button color="secondary" onClick={this.toggleEditUserModal.bind(this)}>Cancel</Button>

          </ModalFooter>
        </Modal>
                               {/* SHOW USERS  */}
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Body</th>
            <th>Operations</th>
          </tr>
        </thead>
        
        <tbody>
          {
            this.state.posts.length > 0 ?
            this.state.posts.map(data => {
              return (
               <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.title}</td>
                <td>{data.body}</td>
                <td>
                 <Button color="success" 
                 size="sm" 
                 className="mr-2"
                 onClick={this.editUser.bind(this, data.id, data.title, data.body)}
                 >Edit</Button>
                 <Button color="danger" size="sm" onClick={this.deleteUser.bind(this, data.id)}>Delete</Button>
                </td>
               </tr>
              )
            })
            :
            <h1>Waiting .....</h1>
          }
        </tbody>
      </Table>
    </div>
    )
  }
}

export default Home;
