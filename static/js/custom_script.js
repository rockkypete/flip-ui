//source to get theme name
let source = $('#source-option').val();

//value of theme choice
let uiDesign = $('#theme-options').val();
    

//async function (promise) to force browser delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//theme change handle with ajax call
$('#Ajax-btn').click((e)=> {
    if(source === 'from-file'){
        e.preventDefault();
        //make a GET request with ajax to the server
        $.ajax({
            method: 'GET',
            url: '/themes',
            contentType: 'application/json',
            dataType: 'json'
        }).done((data)=> {
            //convert the data to array
            console.log(data);
            $.each(data, (i, themes)=> {
                for (let theme of themes){
                    if(theme.name === uiDesign){
                        $('head link:first').attr('href', `${theme.cdn}`);
        
                        //console.log( `you selected ${theme.name} with a cdn of ${theme.cdn}`);
                    }    
                }
            })
        });    
    }else{
    
        //assign selected theme to ui variable
        let uiDesign = $('#theme-options').val();
        console.log(uiDesign);

        //make a GET request with ajax to bootswatch theme cdn endpoint
        $.ajax({
            method: 'GET',
            url: 'https://bootswatch.com/api/4.json',
            contentType: 'application/json',
            dataType: 'json'
        }).done((data)=> {
            $.each(data, (i, property)=> {
                let themesArray = property.themes;
                for (let theme of themesArray){
                    if(theme.name === uiDesign){
                        $('head link:first').attr('href', `${theme.cssCdn}`);
                        
                        //console.log( `you selected ${theme.name} with a cdn of ${theme.cdn}`);
                    }    
                }
            })
        });
    }    
});


//theme change handle with fetch method
$('#Fetch-btn').click((e)=> {
    if(source === 'from-file'){
        e.preventDefault();
     
        //make the fetch json call
        fetch('themes.json')
        .then((res)=> res.json())
        .then((data)=> {
            $.each(data, (i, themes)=>{
                for(let theme of themes){
                    if(theme.name === uiDesign){
                        $('head link:first').attr('href', `${theme.cdn}`);
                        //console.log( `you selected ${theme.name} with a cdn of ${theme.cdn}`);
                    }
                }
            });
        });   
    }else{
        //make the fetch theme from bootswatch theme cdn endpoint
        fetch('https://bootswatch.com/api/4.json')
        .then((res)=> res.json())
        .then((data)=> {
            $.each(data, (i, property)=>{
                let themesArray = property.themes;
                for(let theme of themesArray){
                    if(theme.name === uiDesign){
                        $('head link:first').attr('href', `${theme.cssCdn}`);
                        console.log( `you selected ${theme.name} with a cdn of ${theme.cdn}`);
                    }
                }
            });
        });
    }
});

/* wait 2seconds then reload the current page on skin button click
    sleep(2000).then(()=> {
        location.reload();
        alert(`${ uiDesign } theme is now active!`);     
    });*/