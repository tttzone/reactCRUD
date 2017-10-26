 
var AccountAll = React.createClass({ 

  getInitialState: function () {
    return { fullname: '' ,username: '',password:'',email:'',id:'',Buttontxt:'Register', data1: []};
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
   this.setState({fullname: item.fullname,username:item.username,password:item.password,email:item.email,id:item._id,Buttontxt:'Update'});
     },
    renderLogin(){         
		location.href = "/login";
     },

   handleClick: function() {
 
   var Url="";
   if(this.state.Buttontxt=="Register"){
      Url="/api/savedata";
       }
      else{
      Url="/api/Updatedata";
      }
      var accountdata = {
        'fullname': this.state.fullname,
        'username':this.state.username,
        'password':this.state.password,
        'email':this.state.email,
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
      <div  className="container" > 
    	<div className="row">
			<div className="col-md-6 col-md-offset-3">
			<div className="navbar-header">
				<a className="navbar-brand" href="#" align="center">Registrasi Platform Recruitment</a>
			</div>
			  <form id="register-form" > 
					<div className="form-group">
						<input className="form-control" type="text" value={this.state.fullname} placeholder="Fullname" name="fullname" onChange={ this.handleChange } />
						<input type="hidden" value={this.state.id} name="id" />
					</div>
					<div className="form-group"> 
						<input type="text" className="form-control" value={this.state.username} placeholder="Username" name="username" onChange={ this.handleChange } />
					</div>
					<div className="form-group"> 
						<input type="password"  className="form-control" value={this.state.password}  name="password" onChange={ this.handleChange } placeholder="Password" />
					</div>
					<div className="form-group">
						<input type="text"  className="form-control" value={this.state.email}  name="email" onChange={ this.handleChange } placeholder="Email" />
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-sm-6 col-sm-offset-3">
								<input className="btn btn-primary" type="button" value={this.state.Buttontxt} onClick={this.handleClick} />
							</div>
						</div>
					</div>
					<div className="col-sm-6 col-sm-offset-6"   style={{marginTop:'50px',marginLeft:'300px'}}> 
						If You Already Registered <button type="button" className="btn btn-info" onClick={(e) => {this.renderLogin()}}>Login</button>
					</div>  
			</form>        
		</div> 
      </div> 
    </div>
    );
  }
});

ReactDOM.render(<AccountAll  />, document.getElementById('root'))