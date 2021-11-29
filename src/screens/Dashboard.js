import React, { useCallback, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import airports from "../Data";
import calculatePath from "../components/calculateMinPath";

const Dashboard = () => {
  const [minPath, setminPath] = useState([]);
  const [cost, setcost] = useState("");
  const [selectedStartPoint, setSelectedStartPoint] = useState("ISB");
  const [selectedDestinationPoint, setSelectedDestinationStartPoint] = useState(
    "LHR"
  );
  const [ap, setAp] = useState([]);
  const [ep, setEp] = useState([]);
  useEffect(() => {
    setAp(["ISB", "LHR", "CBS", "NYC"]);
    setEp(["LHR", "CBS", "NYC", "GRC"]);
    return () => {};
  }, []);

  const handleGetMinPath = useCallback((start, end) => {
    // console.log(start, end, airports);
    const result = calculatePath(start, end, airports);
    // console.log(result);
    setminPath(result.finAr);
    setcost(result.minCost);
  }, []);

  return (
    <View>
      <View style={{}}>
        <Text style={styles.header}>Select Starting Point </Text>
        <Picker
          selectedValue={selectedStartPoint}
          onValueChange={(itemValue, itemIndex) => {
            setminPath([""]);
            setcost("");
            setSelectedStartPoint(itemValue);
          }}
        >
          {ap.map(airport =>
            <Picker.Item key={airport} label={airport} value={airport} />
          )}
        </Picker>
        <Text style={styles.header}>Select Destination </Text>

        <Picker
          selectedValue={selectedDestinationPoint}
          onValueChange={(itemValue, itemIndex) => {
            setminPath([""]);
            setcost("");
            setSelectedDestinationStartPoint(itemValue);
          }}
        >
          {ep.map(airport =>
            <Picker.Item key={airport} label={airport} value={airport} />
          )}
        </Picker>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleGetMinPath(selectedStartPoint, selectedDestinationPoint);
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Find Path
        </Text>
      </TouchableOpacity>
      {cost || cost > 0
        ? <View style={{ marginTop: "10%", padding: 10 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.result}>Path: </Text>
              {minPath.map((path, index) =>
                <Text key={index} style={styles.result}>
                  {index > 0 ? " --> " : ""}
                  {path}
                </Text>
              )}
            </View>
            <Text style={styles.result}>
              Minimum cost : {cost}
            </Text>
          </View>
        : cost === 0 ? Alert.alert("Flight record not found") : null}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "blue",
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    // textAlign: "center",
    padding: 20
  },
  button: {
    width: 300,
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10
  },
  result: {
    fontSize: 24,
    fontWeight: "bold"
  }
});
export default Dashboard;
