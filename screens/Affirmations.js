import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { UserContext, alterAxios, fetchLorem } from "../utilities";
import axios from "axios";

const Affirmations = () => {
  const [affirmationPercentage, setAffirmationPercentage] = useState(0);
  const [affirmationMessages, setAffirmationMessages] = useState([]);

  useEffect(() => {
    // will use to fetch affirmation from back end
    fetchAffirmationData();
  }, []);

  const fetchAffirmationData = async () => {
    try {
      // for now using dummy text data, argument is number of paragraphs
      const response = await fetchLorem(1);
      const affirmationMessages = response.data;
      const affirmationPercentage = (affirmationMessages.length / 4) * 100;
      setAffirmationPercentage(affirmationPercentage);
      setAffirmationMessages(affirmationMessages);
    } catch (error) {
      console.error("Error fetching affirmation data:", error);
    }
  };
  return (
    <>
      <View>
        <Text>Affirmation Percentage: {affirmationPercentage}%</Text>

        {affirmationMessages.length > 0 ? (
          <View>
            <Text>Affirmation Messages:</Text>
            {affirmationMessages.map((message, index) => (
              <Text key={index}>{message}</Text>
            ))}
          </View>
        ) : (
          <Text>No affirmation messages received yet...</Text>
        )}

        <Button
          title="View Friend's Affirmations"
          onPress={handleViewFriendsAffirmations}
        />
      </View>
    </>
  );
};
