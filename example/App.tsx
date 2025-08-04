import * as StudyplusExpo from "studyplus-expo";
import { Button, SafeAreaView, ScrollView, Text, View } from "react-native";
import { useEffect, useState } from "react";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMessage, setAuthMessage] = useState("");
  const [postMessage, setPostMessage] = useState("");

  useEffect(() => {
    StudyplusExpo.setup(
      "ZeXtSFrcyEKxNU2wu9ZLR4qFMc5UY7TX",
      "Kcgt4rE5dm4Yg4K4tFHN5jcdABJ75Yfm3GXXSXvZTDX7J9dRVLCkPpzLM624Bs4T"
    );
  }, []);

  const checkAuthentication = async () => {
    try {
      const authenticated = await StudyplusExpo.isAuthenticated();
      setIsAuthenticated(authenticated);
      if (authenticated) {
        setAuthMessage("You are authenticated.");
      } else {
        setAuthMessage("You are not authenticated. Please log in.");
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      setAuthMessage("Error checking authentication.");
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
    } catch (error) {
      console.error("Error posting study record:", error);
      setPostMessage("Failed to post study record.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Module API Example</Text>
        <Group name="Constants">
          <Text>{authMessage}</Text>
        </Group>
        <Group name="checkAuthentication">
          <Button title="Start Authentication" onPress={checkAuthentication} />
        </Group>
        <Group name="startAuth">
          <Button title="Start Authentication" onPress={startAuth} />
        </Group>
        <Group name="postStudyRecord">
          <Button title="postStudyRecord" onPress={postStudyRecord} />
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
