import React, { useCallback, useState } from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native";

const airports = [
  {
    start: "ISB",
    end: "LHR",
    cost: 1000
  },
  {
    start: "LHR",
    end: "NYC",
    cost: 750
  },
  {
    start: "CBS",
    end: "NYC",
    cost: 775
  },
  {
    start: "ISB",
    end: "CBS",
    cost: 575
  },
  {
    start: "CBS",
    end: "GRC",
    cost: 731
  },
  {
    start: "NYC",
    end: "GRC",
    cost: 459
  }
];

const Dashboard = () => {
  const [minPath, setminPath] = useState([]);
  const handleGetMinPath = useCallback((start, end) => {
    let minCost = 0;
    let finAr = [];
    const stAr = airports.filter(airport => airport.start === start);
    const enAr = airports.filter(airport => airport.end === end);
    for (let i = 0; i < stAr.length; i++) {
      if (stAr[i].start === start && stAr[i].end === end) {
        console.log(stAr[i]);
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
    console.log("minCost", minCost);
    console.log(finAr);
    setminPath(finAr);
  }, []);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          handleGetMinPath("ISB", "GRC");
        }}
      >
        <Text>Dashboard Screen</Text>
      </TouchableOpacity>
      <Text>
        {minPath}
      </Text>
    </View>
  );
};

export default Dashboard;
