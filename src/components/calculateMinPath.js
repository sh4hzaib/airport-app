const calculatePath = (start, end, airports) => {
  let minCost = 0;
  let finAr = [];
  const stAr = airports.filter(airport => airport.start === start);
  const enAr = airports.filter(airport => airport.end === end);
  for (let i = 0; i < stAr.length; i++) {
    if (stAr[i].start === start && stAr[i].end === end) {
      //   console.log(stAr[i]);
      minCost = stAr[i].cost;
      finAr.push(stAr[i].start, stAr[i].end);
      break;
    }
  }
  // if direct path is not possible, find the indirect path
  if (minCost === 0) {
    stAr.forEach(element => {
      let cost = 0;
      for (let i = 0; i < enAr.length; i++) {
        if (element.end === enAr[i].start) {
          cost = element.cost + enAr[i].cost;
          if (minCost === 0) {
            minCost = cost;
            finAr = [element.start, element.end, enAr[i].end];
          } else if (cost < minCost) {
            minCost = cost;
            finAr = [element.start, element.end, enAr[i].end];
          }
        }
      }
    });
  }
  //   console.log("minCost", minCost);
  //   console.log(finAr);
  //   setminPath(finAr);
  //   setcost(minCost);
  return { finAr, minCost };
};
export default calculatePath;
