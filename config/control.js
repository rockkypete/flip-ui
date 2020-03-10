//custom object for theme request handle
const themeRequestObj = {
    extSource: 'https://bootswatch.com/api/4.json',
    servedData: [],
    ajaxTheme : function (source) {
        $.ajax({
            method: 'GET',
            url: `${ source }`,
            dataType: 'json'
        }).done((data)=> {
            this.servedData = data.themes;           
        });
    },
    fetchTheme: function(source){
        fetch(`${ source }`)
        .then((res)=> res.json())
        .then((data)=> {
            this.servedData = data.themes;            
        })
    },
    sleep: function(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = themeRequestObj
