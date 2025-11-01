function solution(data) {
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dayMap = {};

  
  for (let [date, value] of data) {
    const day = new Date(date).toLocaleString("en-US", { weekday: "short" });
    if (dayMap[day] === undefined) {
      dayMap[day] = value;
    }
  }

 
  const result = {};
  for (let i = 0; i < 7; i++) {
    const day = dayNames[i];

    if (dayMap[day] !== undefined) {
      result[day] = dayMap[day];
    } else {
      
      let prevIdx = i - 1;
      while (prevIdx >= 0 && dayMap[dayNames[prevIdx]] === undefined) prevIdx--;

      let nextIdx = i + 1;
      while (nextIdx < 7 && dayMap[dayNames[nextIdx]] === undefined) nextIdx++;

      if (prevIdx >= 0 && nextIdx < 7) {
        const prevVal = dayMap[dayNames[prevIdx]];
        const nextVal = dayMap[dayNames[nextIdx]];
        const gap = nextIdx - prevIdx;
        result[day] = prevVal + ((nextVal - prevVal) / gap) * (i - prevIdx);
      } else if (prevIdx >= 0) {
        result[day] = dayMap[dayNames[prevIdx]];
      } else if (nextIdx < 7) {
        result[day] = dayMap[dayNames[nextIdx]];
      } else {
        result[day] = null;
      }
    }
  }

  return result;
}


function test(name, input, expected) {
  const result = solution(input);
  const isEqual = JSON.stringify(result) === JSON.stringify(expected);
  if (isEqual) console.log(`✅ Test Passed: ${name}`);
  else {
    console.log(`❌ Test Failed: ${name}`);
    console.log(`   Expected: ${JSON.stringify(expected)}`);
    console.log(`   Got:      ${JSON.stringify(result)}`);
  }
}


test("Basic Case (all days present)", [
  ["2024-11-04", -6],
  ["2024-11-05", 2],
  ["2024-11-06", 4],
  ["2024-11-07", 4],
  ["2024-11-08", 6],
  ["2024-11-09", 8],
  ["2024-11-10", 2]
], {"Mon":-6,"Tue":2,"Wed":4,"Thu":4,"Fri":6,"Sat":8,"Sun":2});


test("Missing Thu and Fri", [
  ["2024-11-04", 2],
  ["2024-11-05", 4],
  ["2024-11-06", 6],
  ["2024-11-09", 12],
  ["2024-11-10", 14]
], {"Mon":2,"Tue":4,"Wed":6,"Thu":8,"Fri":10,"Sat":12,"Sun":14});


test("Random duplicate dates", [
  ["2024-11-04", 5],
  ["2024-11-04", 7.5], 
  ["2024-11-05", 20],
  ["2024-11-06", 30],
  ["2024-11-07", 40],
  ["2024-11-08", 50],
  ["2024-11-09", 60],
  ["2024-11-10", 70]
], {"Mon":5,"Tue":20,"Wed":30,"Thu":40,"Fri":50,"Sat":60,"Sun":70});
