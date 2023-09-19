export const formatDate = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return (date.getDate() < 10 ? ('0'+date.getDate()) : date.getDate()) + "-" + (date.getMonth() + 1 < 10 ? ('0'+(date.getMonth() + 1)) : (date.getMonth() + 1)) + "-" + (date.getFullYear());
}

export const downloadBase64File = (contentBase64, fileName) => {
    const linkSource = `${contentBase64}`;
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);

    downloadLink.href = linkSource;
    downloadLink.target = '_self';
    downloadLink.download = fileName;
    downloadLink.click(); 
}