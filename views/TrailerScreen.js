import React, { useRef } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  ScrollView,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black", // Cambia el color de fondo a negro
  },
  content: {
    padding: 10,
  },
  title: {
    padding: 10,
    fontSize: 20,
    color: "white",
    textAlign: "center", // add this line
  },
  description: {
    padding: 10,
    fontSize: 16,
    color: "white",
    // add this line
  },
  details: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
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
});

const TrailerScreen = ({ route }) => {
  const playerRef = useRef(null);
  const { trailerId, title, description, actors } = route.params;
  const width = Dimensions.get("window").width;
  const height = width * (7 / 16);

  return (
    <View style={styles.container}>
      <YoutubePlayer
        ref={playerRef}
        height={height}
        width={width}
        play={true}
        videoId={trailerId}
      />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
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
      </ScrollView>
    </View>
  );
};

export default TrailerScreen;
