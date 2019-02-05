//подключен модуль mysql и socket.io


socket.on('getAdminInfo', function(options) { //получить полную информацию на вкладках
        
    //если resetPages true, то страницы возвращаются в исходное состояние
    let {page,resetPages=false} = options;
    const fieldsPerPage = 15;//записей на странице
    let sqlQuery = "myQuery";
    
      
 
      return new Promise(function(resolve, reject){
      conn.query(sqlQuery, function(err, result) {
          if(err) console.log("Ошибка получения полной информации для админ панели");
          if(result===undefined||result.length==0) return;
           

          resolve([{result, resetPages},+page,+fieldsPerPage]); //перевели в числа
    
     

        })
    
    })//конец промиса
      
     .then(function(data) { //вычислить количество страничек
          let [clientInfo, page, fieldsPerPage] = data;
          let {result:resultOld, resetPages } = clientInfo;

          let sqlQuery = "";
         
          sqlQuery = `SELECT COUNT(*) FROM someTable`; //
     
    


          return new Promise(function(resolve, reject){
            conn.query(sqlQuery, function(err, result) {
                console.log(result);
                if(err) console.log("Ошибка получения полной информации для админ панели");
                if(result===undefined||result.length==0) return;
              
                let availablePages = [];
               
                let allFields = +result[0]["COUNT(*)"];
                 let numberOfPages = 1;//количество страниц

                while (allFields>fieldsPerPage) //пока количество страниц больше чем на одной странице
                {
                 numberOfPages++;
                 allFields-=fieldsPerPage;
                }
                    
                  console.log(page);
                switch(true) { //вариации страниц
                                           

                    case page==1&&numberOfPages==1: //если есть только первая страница
                    availablePages=[1];
                    break;
                    
                    case page==1&&numberOfPages==2: //если первая страница и впереди 1 доступная
                    availablePages=[1,2];
                    break;

                    case page==1&&numberOfPages>=3: //если первая страница и впереди 2 доступных
                    availablePages=[1,2,3];
                    break;

                    case page==numberOfPages: //впереди нет страниц, конечная
                    availablePages=[page-1,page]
                    break;

                    case page!=1&&page!=numberOfPages: //одна доступная впереди
                    availablePages = [page-1,page,page+1]; 
                    break;

                 

                }
 
        socket.emit('$getAdminInfo', {resultOld,  resetPages, availablePages});

              });
          
          }); //конец промиса


    })

     .catch((err) => {console.log(err)});

});