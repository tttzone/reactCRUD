 
var AccountInfo = React.createClass({ 

  getInitialState: function () {
    return { fullname:'',  username: '',email:'', password:'', id:'', Buttontxt:'Save', data1: []};
  },
   handleChange: function(e) {
        this.setState({[e.target.name]: e.target.value});
    },

  componentDidMount() {
 
    $.ajax({
       url: "api/getdata",
       type: "GET",
       dataType: 'json',
       ContentType: 'application/json',
       success: function(data) {         
         this.setState({data1: data}); 
         
       }.bind(this),
       error: function(jqXHR) {
         console.log(jqXHR);
           
       }.bind(this)
    });
  },

  DeleteData(id){
  var studentDelete = {
        'id': id
           };      
    $.ajax({
      url: "/api/Removedata/",
      dataType: 'json',
      type: 'POST',
      data: studentDelete,
      success: function(data) {
        alert(data.data);
         this.componentDidMount();

      }.bind(this),
      error: function(xhr, status, err) {
         alert(err); 
           
          
      }.bind(this),
      });
    }, 
    EditData(item){       
   this.setState({fullname: item.fullname, username: item.username, email: item.email, id:item._id,Buttontxt:'Update'});
     },

  handleClick: function() {
 
    var Url="";
    if(this.state.Buttontxt=="Save"){
      Url="/api/savedata";
       }
      else{
      Url="/api/Updatedata";
      }
      var accountdata = { 
        'fullname': this.state.fullname,
        'username': this.state.username,
        'email': this.state.email,
        'id':this.state.id,
    }
    $.ajax({
      url: Url,
      dataType: 'json',
      type: 'POST',
      data: accountdata,
      success: function(data) {       
          alert(data.data);       
          this.setState(this.getInitialState());
          this.componentDidMount();
         
      }.bind(this),
      error: function(xhr, status, err) {
         alert(err);     
      }.bind(this)
    });
  },

  render: function() {
    return ( 
      <div  className="container"  style={{marginTop:'50px'}}>
	  <div className="navbar-header"> 
		<a className="navbar-brand" href="#" align="center">List Account Recruitment</a>
	  </div> 
    <form>
      <div className="col-sm-12 col-md-12"  style={{marginLeft:'400px'}}> 
      <table className="table-bordered">
      <tbody>
        <tr> 
          <td><b>Full Name</b></td>
          <td>
             <input className="form-control" type="text" value={this.state.fullname} name="fullname" onChange={ this.handleChange } />
              <input type="hidden" value={this.state.id} name="id"  />
          </td>
        </tr>

        <tr> 
          <td><b>Username</b></td>
          <td>
             <input className="form-control" type="text" value={this.state.username} name="username" onChange={ this.handleChange } />
          </td>
        </tr>

        <tr> 
          <td><b>e-Mail</b></td>
          <td>
             <input className="form-control" type="text" value={this.state.email} name="email" onChange={ this.handleChange } />
          </td>
        </tr>

        <tr>
          <td></td>
            
          <td> 
        <input className="btn btn-primary" type="button" value={this.state.Buttontxt} onClick={this.handleClick} /> 
          </td>
        </tr>

     </tbody>
    </table>
  </div>
   
<div className="col-sm-12 col-md-12 "  style={{marginTop:'60px'}} >
 
 <table className="table table-striped">
 <thead className="thead-dark">
	<tr>
		<th scope="col"><b>No</b></th>
		<th scope="col"><b>FULLNAME</b></th>
		<th scope="col"><b>USERNAME</b></th>
		<th scope="col"><b>EMAIL</b></th> 
	</tr>
 </thead>
 <tbody>
    {this.state.data1.map((item, index) => (
        <tr key={index}>
          <td>{index+1}</td> 
          <td>{item.fullname}</td>                      
          <td>{item.username}</td>
          <td>{item.email}</td>  
          <td> 
            <button type="button" className="btn btn-success" onClick={(e) => {this.EditData(item)}}>Edit</button>    
          </td> 
          <td> 
            <button type="button" className="btn btn-info" onClick={(e) => {this.DeleteData(item._id)}}>Delete</button>
          </td> 
        </tr>
    ))}
    </tbody>
    </table>
     </div>
     </form>     
      </div>
    );
  }
});

ReactDOM.render(<AccountInfo  />, document.getElementById('root'))