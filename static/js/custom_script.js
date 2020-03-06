
//custom object for theme request handle
const themeRequestObj = {
    localSource: '/themes',
    extSource: 'https://bootswatch.com/api/4.json',
    servedData: {},
    ajaxTheme : function (source) {
        $.ajax({
            method: 'GET',
            url: `${ source }`,
            dataType: 'json'
        }).done((data)=> {
            this.servedData = data;
            console.log(this.servedData);
        });
    },
    fetchTheme: function(source){
        fetch(`${ source }`)
        .then((res)=> res.json())
        .then((data)=> {
            this.servedData = data;
            console.log(this.servedData);
        });
    }
}

$('#Ajax-btn').click((e)=> {
    //prevent form submmision since we're not persisting to db
    e.preventDefault();
    //ajax theme from local theme.json file
    themeRequestObj.ajaxTheme(themeRequestObj.localSource);
    let themes = themeRequestObj.servedData.themes;
    $('head link:first').attr('href', `${ themes[0].cdn }`)      
})

$('#Ajax-api').click((e)=> {
    //prevent form submmision since we're not persisting to db
    e.preventDefault();

    //ajax theme from bootswatch api
    themeRequestObj.ajaxTheme('https://bootswatch.com/api/4.json');
    let themesArray = themeRequestObj.servedData.themes;
    $('head link:first').attr('href', `${ themesArray[3].cssCdn }`);
});

$('#Fetch-btn').click((e)=> {
    //prevent form submmision since we're not persisting to db
    e.preventDefault();
    //fetch theme from local theme.json file
    themeRequestObj.fetchTheme(themeRequestObj.localSource);
    let themes = themeRequestObj.servedData.themes;
    $.each(themes, (i, theme) => {
        console.log(`you selected ${ theme.name } with a cdn of ${ theme.cdn }`);  
    });
});
       
$('#Fetch-api').click((e)=> {
    //prevent form submmision since we're not persisting to db
    e.preventDefault();

    //fetch theme from bootswatch api
    themeRequestObj.fetchTheme(themeRequestObj.extSource);
    let themesArray = themeRequestObj.servedData.themes;
    alert(themesArray);
    $,each(themesArray, (i, theme)=>{
        let attribute = $('head link:first').attr('href');
        console.log(attribute);
    });
});

//select onchange logic
$('select#theme').change((e)=> {
    themeRequestObj.ajaxTheme(themeRequestObj.localSource);
})

//async function (promise) to force browser delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/*
 wait 2seconds then reload the current page on skin button click
    sleep(2000).then(()=> {
        location.reload();
        alert(`${ uiDesign } theme is now active!`);     
    });
*/