function Page(props) {

    return  <li class="page-item"><a class="page-link" href="#"
            onClick ={props.onClick}
    > {props.value}</a></li>
  }
  
   
  class Pages extends React.Component{
    
    constructor(props) {
      super(props);
      this.state = {
        pages: props.pages||[1],
       
 
      }
       
      this.currentPage = 1;
      this.resetPages = props.resetPages;
     
      this.onPageClick = this.onPageClick.bind(this);
      this.onArrowClick = this.onArrowClick.bind(this);
    }


    componentDidMount() {
     $('.page-item:nth-child(2)').addClass('active');

    
   }
      
  
    componentWillReceiveProps(nextProps) {
        


      this.resetPages = this.props.resetPages;
       this.setState({
          pages: nextProps.pages,
       });
       
       this.resetPages = nextProps.resetPages;



    }






    onArrowClick=(number)=>{//передвижение по стрелке
      
           if( !(number==1||number==-1) )  return;
           
           
           let $menuActiveItemValue = $(".list-group-item.list-group-item-action.active").attr('value');
       


           if(number==1){
             if(this.currentPage>=+this.state.pages[this.state.pages.length-1]) return;
             this.currentPage+=1;
            socket.emit("getAdminInfo", {param:$menuActiveItemValue,page: this.currentPage});
         } else if(number==-1)
         {
           if(this.currentPage==1) return;
           this.currentPage-=1;
           socket.emit("getAdminInfo", {param:$menuActiveItemValue,page:this.currentPage});
          } 
          
          this.changePagination(this.currentPage);
  
            
           
       
   }

    
    
    onPageClick(e) { //появление разных таблиц
      const currentValue = +e.target.innerHTML; //значение текущего выбранного элемента
      this.changePagination(currentValue); 
      
      let $menuActiveItemValue = $(".list-group-item.list-group-item-action.active").attr('value');
      this.currentPage = currentValue; //текущая страница
    
      socket.emit("getAdminInfo", {param:$menuActiveItemValue,page:currentValue});
      
    }
     

      changePagination(currentValue) { //изменить вид страниц

         switch(true) {
            case currentValue==1:
            $('.page-item').removeClass('active');
            $('.page-item:nth-child(2)').addClass('active');
            break;
             
            default: 
            $('.page-item').removeClass('active');
            $('.page-item:nth-child(3)').addClass('active');
         }
      }
      
      
      
   
 
   render() {
       if(this.resetPages){
            this.currentPage = 1;
            console.log("Изменил страницу");
       }

     const {pages} = this.state;
   
   
   return (<nav>
   <ul class="pagination">
     <li class="page-item" onClick={this.onArrowClick.bind(this,-1)}>
       <a class="page-link" href="#" aria-label="Previous">
         <span aria-hidden="true" >&laquo;</span>
         <span class="sr-only">Previous</span>
       </a>
     </li>
     {pages.map((item)=>{
          return   <Page value={item} onClick={this.onPageClick} />
     })}
     
  
 
     <li class="page-item"  onClick={this.onArrowClick.bind(this,1)}>
       <a class="page-link" href="#" aria-label="Next">
         <span aria-hidden="true">&raquo;</span>
         <span class="sr-only">Next</span>
       </a>
     </li>
   </ul>
 </nav>);
   } // конец render
 }
 
 

