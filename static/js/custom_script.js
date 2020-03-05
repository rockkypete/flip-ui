//source to get theme name
let method = $('#source-options').val();

//value of theme choice
let uiDesign = $('#theme-options').val();

//custom object for theme request handle
const themeRequestObj = {
    localSource: 'localhost:3000/themes',
    extSource: 'https://bootswatch.com/api/4.json',
    servedData: {},
    ajaxTheme : function (source) {
        $.ajax({
            method: 'GET',
            url: `${ source }`,
            contentType: 'application/json',
            dataType: 'json'
        }).done((data)=> {
            this.servedData = data;
        });
    },
    fetchTheme: function(source){
        fetch(`${ source }`)
        .then((res)=> res.json())
        .then((data)=> {
            this.servedData = data;
        });
    }
}

//using Ajax call
$('Ajax-btn').click((e)=> {
    //prevent form submmision since we're not persisting to db
    e.preventDefault();
    if(method === 'from-file'){
        //fetch theme from local theme.json file
        themeRequestObj.ajaxTheme(themeRequestObj.localSource);
        $.each(themeRequestObj.servedData, (i, themes)=> {
            for (let theme of themes){
                if(theme.name === uiDesign){
                    $('head link:first').attr('href', `${theme.cdn}`);
                }    
            }
        });
    }else{
        //fetch theme from bootswatch api
        themeRequestObj.ajaxTheme(themeRequestObj.extSource);
        let themesArray = themeRequestObj.servedData.themes;
        $,each(themesArray, (i, theme)=>{
            if(theme.name === uiDesign){
                $('head link:first').attr('href', `${theme.cdn}`);
            }
        });
    }
       
});

//using fetch call

$('#Fetch-btn').click((e)=> {
    //prevent form submmision since we're not persisting to db
    e.preventDefault();
    if (method === 'from-file'){
        //fetch theme from local theme.json file
        themeRequestObj.fetchTheme(themeRequestObj.localSource);
        $.each(themeRequestObj.servedData, (i, themes)=> {
            for (let theme of themes){
                if(theme.name === uiDesign){
                    $('head link:first').attr('href', `${theme.cdn}`);
                }    
            }
        });
    }else{
        //fetch theme from bootswatch api
        themeRequestObj.fetchTheme(themeRequestObj.extSource);
        let themesArray = themeRequestObj.servedData.themes;
        $,each(themesArray, (i, theme)=>{
            if(theme.name === uiDesign){
                $('head link:first').attr('href', `${theme.cdn}`);
            }
        });
    }
});