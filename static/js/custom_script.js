//async function (promise) to force browser delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


//custom object for theme request handle
const themeRequestObj = {
    localSource: '/themes',
    extSource: 'https://bootswatch.com/api/4.json',
    servedData: {},
    ajaxTheme : function (source, attrib) {
        $.ajax({
            method: 'GET',
            url: `${ source }`,
            dataType: 'json'
        }).done((data)=> {
            this.servedData = data;
            let themes = themeRequestObj.servedData.themes;
            let theme = themes[Math.floor(Math.random()* themes.length)]
            console.log(`you selected ${ theme.name } with a cdn of ${ theme[attrib] }`);   
            
                    //$('head link:first').attr('href', `${theme[attrib]}`);                 
        
        });
    },
    fetchTheme: function(source, attrib){
        fetch(`${ source }`)
        .then((res)=> res.json())
        .then((data)=> {
            this.servedData = data;
            let themes = themeRequestObj.servedData.themes;
            let theme = themes[Math.floor(Math.random()* themes.length)]
            console.log(`you selected ${ theme.name } with a cdn of ${ theme[attrib] }`);            
        })
    }
}

$('#Ajax-btn').click((e)=> {
    //prevent form submmision since we're not persisting to db
    e.preventDefault();
    //ajax theme from local theme.json file
    themeRequestObj.ajaxTheme(themeRequestObj.localSource, 'cdn');
})

$('#Ajax-api').click((e)=> {
    e.preventDefault();

    //ajax theme from bootswatch api
    themeRequestObj.ajaxTheme(themeRequestObj.extSource, 'cssCdn');
});

$('#Fetch-btn').click((e)=> {
    e.preventDefault();

    //fetch theme from local theme.json file
    themeRequestObj.fetchTheme(themeRequestObj.localSource, 'cdn');
});
       
$('#Fetch-api').click((e)=> {
    e.preventDefault();

    //fetch theme from bootswatch api
    themeRequestObj.fetchTheme(themeRequestObj.extSource, 'cssCdn');
});

//select onchange logic
$('select#theme').change((e)=> {
    let themeChoice = e.target.value; 
    $.ajax({
        method: 'GET',
        url: `${ themeRequestObj.localSource }`,
        dataType: 'json'
    }).done((data)=> {
        let themeObjList = data.themes;
        $.each(themeObjList, (i, theme)=>{
            if (theme.name === themeChoice){
                //$('head link:first').attr('href', `${theme.cdn}`);
                console.log(`You selected ${theme.name} with a cdn of ${theme.cdn}`)
            }
        });
    });
});