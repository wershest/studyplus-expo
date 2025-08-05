import StudyplusExpo from "studyplus-expo";
import { Button, SafeAreaView, ScrollView, Text, View } from "react-native";
import { useEffect, useState } from "react";

export default function App() {
  const [authMessage, setAuthMessage] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    StudyplusExpo.setup(
      "U7xO5VA4FgNKSGGOCfAd3gNvHtnfOhBd",
      "xRBSnBeTXmqbYrHxFe5GGxuW9RUUTeJuYTwvnLgKrkcXR6Z8XXf3O4PrbnFV3Dre"
    );
  }, []);

  const checkAuthentication = async () => {
    try {
      const authenticated = await StudyplusExpo.isAuthenticated();
      if (authenticated) {
        setAuthMessage("You are authenticated.");
      } else {
        setAuthMessage("You are not authenticated. Please log in.");
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      setMsg("Error checking authentication.");
    }
  };

  const startAuth = async () => {
    try {
      await StudyplusExpo.startAuth();
      await checkAuthentication();
    } catch (error) {
      console.error("Error during authentication:", error);
      setAuthMessage("Authentication failed.");
    }
  };

  const postStudyRecord = async () => {
    try {
      await StudyplusExpo.postStudyRecord(10, 20, "Hello from JS!");
      setMsg(
        `Study record posted successfully.\nDuration: 10 minutes\nAmount: 20 points\nComment: Hello from JS!`
      );
    } catch (error) {
      console.error("Error posting study record:", error);
      setMsg("Failed to post study record.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={{ height: 40 }} />
        <Text style={styles.header}>StudyPlus Example</Text>
        <Group name="Check Authentication">
          <Button title="Check" onPress={checkAuthentication} />
          <Text>{authMessage}</Text>
        </Group>
        <Group name="Start Authentication">
          <Button title="Start" onPress={startAuth} />
        </Group>
        <Group name="Post Study Record">
          <Button title="Post" onPress={postStudyRecord} />
        </Group>
        <Group name="Message">
          <Text>{msg}</Text>
        </Group>
      </ScrollView>
    </SafeAreaView>
  );
}

function Group(props: { name: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupHeader}>{props.name}</Text>
      {props.children}
    </View>
  );
}

const styles = {
  header: {
    fontSize: 30,
    margin: 20,
  },
  groupHeader: {
    fontSize: 20,
    marginBottom: 20,
  },
  group: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  view: {
    flex: 1,
    height: 200,
  },
};
