module.exports = filter;

function filter() {
  return segundos => {
    if (!Number.isInteger(segundos)) return "00:00:00";
    let tempo = new Date(segundos * 1000)
      .toISOString()
      .substr(11, 8)
      .split(":");
    let h = Number(tempo[0]);
    let m = Number(tempo[1]);
    let s = Number(tempo[2]);
    return `${h ? `${h}h ` : ""}${m ? `${m}m ` : ""}${s ? `${s}s ` : "0"}`;
  };
}
