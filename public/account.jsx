 
var AccountInfo = React.createClass({ 

  getInitialState: function () {
    return { username: '',password:'',id:'', data1: []};
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
    };
	
    $.ajax({
      url: "/api/getLogin",
      dataType: 'json',
      type: 'POST',
      data: accountdata,
      success: function(data) {  
		
          alert(data.data);       
		  location.href = "/home";
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
						</tr>
					))}
				</tbody>
			</table>
		</div>     
    </div>
    );
  }
});

ReactDOM.render(<AccountInfo  />, document.getElementById('root'))