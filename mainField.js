class InfoField extends React.Component{

    constructor(props){
      super(props);
      this.state = {
        headers : [],
        info: [],
        isTableShowed: false,
        availablePages: [],
 
      }           
   
   
 
 
 
    }
 
    componentDidMount() {
 
     socket.on('$getAdminInfo', (options)  => {  //param - параметр для switch
       let {resultOld:info,resetPages,availablePages} = options;
    
  
       if(resetPages)//нужно ли менять вкладку раздела
       {
 
       $(".page-item.active").removeClass('active');
        $('.page-item:nth-child(2)').addClass('active');
       }
       
       this.resetPages = resetPages;
     
        this.setState({
          headers: headers,
          info: info,
          isTableShowed: true,
          availablePages: availablePages,//количество доступных для просмотра страниц
        }); 
        
   
     });
 
 
     
  
 
    }
 
 
 
    render() {
 
 
     const {headers,info,isTableShowed,availablePages=[]} = this.state;
     
        
     
     
        return (
          <React.Fragment>
         
  
        { isTableShowed && <Pages  pages={availablePages} resetPages={this.resetPages} />}
         </React.Fragment>
           )
        //е
    } 
 
 
 }
 
 ReactDOM.render( <InfoField /> ,document.querySelector('#tableRender'));