 
var LoginAll = React.createClass({ 

  getInitialState: function () {
    return { username: '',password:'',id:'',Buttontxt:'Login', data1: []};
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

   handleClick: function() {
 
   // var Url="";
	// if(this.state.Buttontxt=="Login"){
      // Url="/api/getLogin";
	  // console.log(Url);
    // }
    
      var accountdata = { 
        'username':this.state.username,
        'password':this.state.password, 
    }
	
    $.ajax({
      url: "/api/getLogin",
      dataType: 'json',
      type: 'POST',
      data: accountdata,
      success: function(data) {   
          alert(data.data);
		  if(data.data === "Sukses Login"){location.href = "/home";}
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
		<a className="navbar-brand" href="/" align="center">Platform Recruitment</a>
	  </div> 
  <form>
    <div className="col-sm-12 col-md-12"  style={{marginLeft:'400px'}}> 
  <table className="table-bordered">
     <tbody> 
    <tr>
      <td><b>Username</b></td>
      <td>
      <input type="text" className="form-control" value={this.state.username}  name="username" onChange={ this.handleChange } />
      </td>
    </tr>

    <tr>
      <td><b>Password</b></td>
      <td>
        <input type="password"  className="form-control" value={this.state.password}  name="password" onChange={ this.handleChange } />
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
 
</form>        
      </div>
    );
  }
});

ReactDOM.render(<LoginAll  />, document.getElementById('login'))