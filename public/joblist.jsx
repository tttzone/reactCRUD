 
var JobList = React.createClass({ 

  getInitialState: function () {
    return { loker: '' ,perusahaan: '',divisi:'',jobdesc:'',kota:'',id:'',Buttontxt:'Save', data1: []};
  },
   handleChange: function(e) {
        this.setState({[e.target.name]: e.target.value});
    },

  componentDidMount() {
 
    $.ajax({
       url: "api/getjob",
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
      url: "/api/Removejob/",
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
   this.setState({loker: item.loker, perusahaan:item.perusahaan,divisi:item.divisi,jobdesc:item.jobdesc,kota:item.kota,id:item._id,Buttontxt:'Update'});
     }, 

   handleClick: function() {
 
   var Url="";
   if(this.state.Buttontxt=="Save"){
      Url="/api/savejob";
       }
      else{
      Url="/api/Updatejob";
      }
      var accountdata = { 
        'loker': this.state.loker,
        'perusahaan':this.state.perusahaan,
        'divisi':this.state.divisi,
        'jobdesc':this.state.jobdesc,
        'kota':this.state.kota,
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
		<a className="navbar-brand" href="#" align="center">Job List</a>
	  </div> 
  <form> 
    <div className="col-sm-12 col-md-12"  style={{marginLeft:'400px'}}> 
	<table className="table-bordered">
     <tbody>
    <tr> 
      <td><b>Loker</b></td>
      <td>
         <input className="form-control" type="text" value={this.state.loker}    name="loker" onChange={ this.handleChange } />
          <input type="hidden" value={this.state.id}    name="id"  />
      </td>
    </tr>

    <tr>
      <td><b>Perusahaan</b></td>
      <td>
      <input type="text" className="form-control" value={this.state.perusahaan}  name="perusahaan" onChange={ this.handleChange } />
      </td>
    </tr>

    <tr>
      <td><b>Divisi</b></td>
      <td>
        <input type="text"  className="form-control" value={this.state.divisi}  name="divisi" onChange={ this.handleChange } />
      </td>
    </tr>

    <tr>
      <td><b>Job Desc</b></td>
      <td>
        <input type="text"  className="form-control" value={this.state.jobdesc}  name="jobdesc" onChange={ this.handleChange } />
      </td>
    </tr>

    <tr>
      <td><b>Kota</b></td>
      <td>
        <input type="text"  className="form-control" value={this.state.kota}  name="kota" onChange={ this.handleChange } />
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
		<th scope="col"><b>Loker</b></th>
		<th scope="col"><b>Perusahaan</b></th>
		<th scope="col"><b>Divisi</b></th>
		<th scope="col"><b>Job Desc</b></th>
		<th scope="col"><b>Kota</b></th>
		<th scope="col"><b>Delete</b></th>
	</tr>
 </thead>
 <tbody>
    {this.state.data1.map((item, index) => (
        <tr key={index}>
          <td>{index+1}</td> 
          <td>{item.loker}</td>                      
          <td>{item.perusahaan}</td>
          <td>{item.divisi}</td>               
          <td>{item.jobdesc}</td>
          <td>{item.kota}</td> 
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

ReactDOM.render(<JobList  />, document.getElementById('root'))