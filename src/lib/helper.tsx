export  function format_date(d:any){
    var temp = new Date(d).toLocaleDateString();
    return temp;
}
export  function format_date2(d:any){
    if(d){
        var temp =  d.substring(0, 4) + '-' + d.substring(4);
        return temp;
    }
    return false;
}
export  function format_date3(d:any){
    var temp = d.substring(0, 10);
    return temp;
}
