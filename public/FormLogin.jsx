 
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
      <div className="container" > 
    	<div className="row">
			<div className="col-md-6 col-md-offset-3">
			<div className="navbar-header">
				<a className="navbar-brand" href="#" align="center">Login Platform Recruitment</a>
			</div>
			<form id="login-form" >  
				<div className="form-group"> 
					<input type="text" className="form-control" value={this.state.username}  name="username" onChange={ this.handleChange } placeholder="Username" />
				</div>
				<div className="form-group">
					<input type="password"  className="form-control" value={this.state.password}  name="password" onChange={ this.handleChange } placeholder="Password" />
				</div>  
				<div className="form-group">
					<div className="row">
						<div className="col-sm-6 col-sm-offset-3">
							<input className="btn btn-primary" type="button" value={this.state.Buttontxt} onClick={this.handleClick} />
						</div>
					</div>
				</div>
			 
				</form>        
			</div>  
		</div>  
    </div>
    );
  }
});

ReactDOM.render(<LoginAll  />, document.getElementById('login'))