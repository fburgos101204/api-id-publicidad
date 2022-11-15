function getDateTime(format = "f")
{
    this.format = format;
    process.env.TZ = "America/Santo_Domingo";
    const d = new Date();
    var result = "";

  switch(format)
  {
    case "date":
      result = d.getDate().toString().padStart(2, '0') + '-' + (d.getMonth() + 1).toString().padStart(2, '0') + '-' + d.getFullYear();
      break;
    case "time":
      result = d.getHours().toString().padStart(2, '0') + ':' +
      d.getMinutes().toString().padStart(2, '0') + ':' +
      d.getSeconds().toString().padStart(2, '0');
    break;
    case "datetime":
      result = d.getFullYear() + '-' +
      (d.getMonth() + 1).toString().padStart(2, '0') + '-' +
      d.getDate().toString().padStart(2, '0') + 'T' +
      d.getHours().toString().padStart(2, '0') + ':' +
      d.getMinutes().toString().padStart(2, '0') + ':' +
      d.getSeconds().toString().padStart(2, '0');
    break;
    case "f":
      result = d.getFullYear() + '-' +
      (d.getMonth() + 1).toString().padStart(2, '0') + '-' +
      d.getDate().toString().padStart(2, '0') + 'T' +
      d.getHours().toString().padStart(2, '0') + ':' +
      d.getMinutes().toString().padStart(2, '0') + ':' +
      d.getSeconds().toString().padStart(2, '0') + '.' + d.getMilliseconds().toString().substring(0, 3) + 'Z';
    break;
  }

  return result;
}

function formatDateTime(d)
{
return d.getFullYear() + '-' +
(d.getMonth() + 1).toString().padStart(2, '0') + '-' +
d.getDate().toString().padStart(2, '0') + 'T' +
d.getHours().toString().padStart(2, '0') + ':' +
d.getMinutes().toString().padStart(2, '0') + ':' +
d.getSeconds().toString().padStart(2, '0') + '.' + d.getMilliseconds().toString().substring(0, 3) + 'Z';
}

module.exports = {
    getDateTime: getDateTime,
    formatDateTime: formatDateTime
};