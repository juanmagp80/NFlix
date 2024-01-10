import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
} from "react-native";
const API_KEY = "4ea27054b660de2ababeee4877493d84";
const API_URL = "https://api.themoviedb.org/3";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    color: "white",
    margin: 10,
    width: Dimensions.get("window").width / 2 - 20,
    backgroundColor: "#000",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  title: {
    color: "white",
    padding: 10,
    fontSize: 20,
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "bold",
  },
});

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/movie/popular?api_key=${API_KEY}&language=es-ES`)
      .then((response) => setMovies(response.data.results))
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Details", { movie: item })}
          >
            <Image
              style={styles.image}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
            />
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
      />
      <StatusBar style="auto" />
    </View>
  );
};
export default HomeScreen;
