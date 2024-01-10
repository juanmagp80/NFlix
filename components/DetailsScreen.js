import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  navigation,
  navigate,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Video } from "expo-av";

const API_KEY = "4ea27054b660de2ababeee4877493d84";
const API_YOUTUBE = "AIzaSyAAI82zwYW4hDt0QuEO9EVBKE3_w5QD73o";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  card: {
    margin: 10,
    backgroundColor: "black",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  imageContainer: {},
  image: {
    width: "100%",
    height: 550,
    borderRadius: 10,
  },
  title: {
    padding: 10,
    fontSize: 20,
    color: "white", // add this line
  },
  description: {
    padding: 10,
    fontSize: 16,
    color: "white", // add this line
  },
  // remove the second container and title here
  details: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "red",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: 200,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    textTransform: "uppercase",
  },
  actorsContainer: {
    justifyContent: "center",
    flexDirection: "row",
  },
  actor: {
    width: 70,
    margin: 5,
    alignItems: "center",
    fontSize: 14,
    color: "#fff",
  },
  actorImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  actorName: {
    marginTop: 10,
    color: "#fff",
  },
  buttonContainer: {
    alignItems: "center",
  },
});

const DetailsScreen = ({ route, navigation }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const playerRef = useRef(null);

  const [trailerId, setTrailerId] = useState(null);
  const { movie } = route.params;
  const [actors, setActors] = useState([]);

  const handlePress = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`
    );
    const data = await response.json();

    const trailerId = data.results[0].key;

    // Busca el tráiler en español en YouTube
    const youtubeResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${movie.title} tráiler español&key=${API_YOUTUBE}`
    );
    const youtubeData = await youtubeResponse.json();
    const spanishTrailer = youtubeData.items.find((item) =>
      item.snippet.title.toLowerCase().includes("español")
    );

    if (spanishTrailer) {
      navigation.navigate("TrailerScreen", {
        trailerId: spanishTrailer.id.videoId,
        title: movie.title,
        description: movie.overview,
        actors: actors,
      });
    } else {
      console.log("No se encontró un tráiler en español");
    }
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=4ea27054b660de2ababeee4877493d84`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.cast) {
          setActors(data.cast);
        }
      });
  }, [movie.id]);
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.stop();
      }
    };
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageBackground
            style={styles.image}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
          ></ImageBackground>
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{movie.title}</Text>

          <Text style={styles.description}>{movie.overview}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              title="Ver tráiler"
              onPress={handlePress}
            >
              {trailerId && (
                <YoutubePlayer
                  ref={playerRef}
                  height={200}
                  play={true}
                  videoId={trailerId}
                />
              )}
              <Text style={styles.buttonText}>Ver tráiler</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.actorsContainer}>
          {actors.slice(0, 4).map((actor, index) => (
            <View key={index} style={styles.actor}>
              <Image
                style={styles.actorImage}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${actor.profile_path}`,
                }}
              />
              <Text style={styles.actorName}>{actor.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailsScreen;
