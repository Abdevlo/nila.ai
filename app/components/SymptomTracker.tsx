import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Slider } from "expo-atlas";
import {
  Activity,
  Droplet,
  Moon,
  Thermometer,
  Brain,
  Battery,
  Plus,
  Check,
} from "lucide-react-native";

interface Symptom {
  id: string;
  name: string;
  icon: React.ReactNode;
  selected: boolean;
}

interface LoggedSymptom {
  id: string;
  name: string;
  timestamp: string;
  intensity?: number;
  note?: string;
}

interface SymptomTrackerProps {
  onSymptomLogged?: (symptom: LoggedSymptom) => void;
  recentSymptoms?: LoggedSymptom[];
}

const SymptomTracker = ({
  onSymptomLogged = () => {},
  recentSymptoms = [
    { id: "1", name: "Cramps", timestamp: "2 hours ago", intensity: 3 },
    { id: "2", name: "Period Flow", timestamp: "5 hours ago", intensity: 2 },
    { id: "3", name: "Low Energy", timestamp: "Yesterday", intensity: 4 },
  ],
}: SymptomTrackerProps) => {
  const [symptoms, setSymptoms] = useState<Symptom[]>([
    {
      id: "1",
      name: "Cramps",
      icon: <Activity size={20} color="#f87171" />,
      selected: false,
    },
    {
      id: "2",
      name: "Period Flow",
      icon: <Droplet size={20} color="#f87171" />,
      selected: false,
    },
    {
      id: "3",
      name: "Mood",
      icon: <Moon size={20} color="#60a5fa" />,
      selected: false,
    },
    {
      id: "4",
      name: "Temperature",
      icon: <Thermometer size={20} color="#fbbf24" />,
      selected: false,
    },
    {
      id: "5",
      name: "Headache",
      icon: <Brain size={20} color="#a78bfa" />,
      selected: false,
    },
    {
      id: "6",
      name: "Energy",
      icon: <Battery size={20} color="#34d399" />,
      selected: false,
    },
  ]);

  const [intensity, setIntensity] = useState<number>(2);
  const [note, setNote] = useState<string>("");
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);

  const handleSymptomSelect = (id: string) => {
    setSymptoms(
      symptoms.map((symptom) =>
        symptom.id === id
          ? { ...symptom, selected: !symptom.selected }
          : symptom,
      ),
    );
    setSelectedSymptom(id);
  };

  const handleLogSymptom = () => {
    if (selectedSymptom) {
      const symptom = symptoms.find((s) => s.id === selectedSymptom);
      if (symptom) {
        const loggedSymptom: LoggedSymptom = {
          id: Date.now().toString(),
          name: symptom.name,
          timestamp: "Just now",
          intensity,
          note: note.trim() || undefined,
        };
        onSymptomLogged(loggedSymptom);

        // Reset form
        setSymptoms(symptoms.map((s) => ({ ...s, selected: false })));
        setSelectedSymptom(null);
        setIntensity(2);
        setNote("");
      }
    }
  };

  return (
    <View className="bg-white rounded-xl p-4 shadow-sm w-full">
      <Text className="text-lg font-bold mb-3 text-gray-800">
        Track Symptoms
      </Text>

      {/* Symptom selection */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-4"
      >
        {symptoms.map((symptom) => (
          <TouchableOpacity
            key={symptom.id}
            onPress={() => handleSymptomSelect(symptom.id)}
            className={`mr-3 p-3 rounded-full flex items-center justify-center ${symptom.id === selectedSymptom ? "bg-purple-100" : "bg-gray-100"}`}
          >
            <View className="items-center">
              {symptom.icon}
              <Text className="text-xs mt-1 text-gray-700">{symptom.name}</Text>
              {symptom.id === selectedSymptom && (
                <View className="absolute -top-1 -right-1 bg-purple-500 rounded-full p-1">
                  <Check size={10} color="white" />
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity className="mr-3 p-3 rounded-full bg-gray-100 flex items-center justify-center">
          <View className="items-center">
            <Plus size={20} color="#6b7280" />
            <Text className="text-xs mt-1 text-gray-700">Custom</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Intensity slider */}
      {selectedSymptom && (
        <View className="mb-4">
          <Text className="text-sm font-medium mb-2 text-gray-700">
            Intensity
          </Text>
          <Slider
            value={intensity}
            minimumValue={1}
            maximumValue={5}
            step={1}
            onValueChange={setIntensity}
            minimumTrackTintColor="#8b5cf6"
            maximumTrackTintColor="#e5e7eb"
          />
          <View className="flex-row justify-between">
            <Text className="text-xs text-gray-500">Mild</Text>
            <Text className="text-xs text-gray-500">Moderate</Text>
            <Text className="text-xs text-gray-500">Severe</Text>
          </View>
        </View>
      )}

      {/* Notes input */}
      {selectedSymptom && (
        <View className="mb-4">
          <Text className="text-sm font-medium mb-2 text-gray-700">Notes</Text>
          <TextInput
            className="border border-gray-200 rounded-lg p-2 text-gray-700"
            placeholder="Add any additional details..."
            value={note}
            onChangeText={setNote}
            multiline
          />
        </View>
      )}

      {/* Log button */}
      {selectedSymptom && (
        <TouchableOpacity
          onPress={handleLogSymptom}
          className="bg-purple-600 py-3 rounded-lg items-center"
        >
          <Text className="text-white font-medium">Log Symptom</Text>
        </TouchableOpacity>
      )}

      {/* Recent symptoms */}
      {recentSymptoms.length > 0 && (
        <View className="mt-4">
          <Text className="text-sm font-medium mb-2 text-gray-700">
            Recently Logged
          </Text>
          {recentSymptoms.map((symptom) => (
            <View
              key={symptom.id}
              className="flex-row justify-between items-center py-2 border-b border-gray-100"
            >
              <View>
                <Text className="font-medium text-gray-800">
                  {symptom.name}
                </Text>
                <Text className="text-xs text-gray-500">
                  {symptom.timestamp}
                </Text>
              </View>
              <View className="flex-row items-center">
                {symptom.intensity && (
                  <View className="flex-row">
                    {Array.from({ length: symptom.intensity }).map((_, i) => (
                      <View
                        key={i}
                        className="w-2 h-2 rounded-full bg-purple-500 mr-1"
                      />
                    ))}
                    {Array.from({ length: 5 - symptom.intensity }).map(
                      (_, i) => (
                        <View
                          key={i}
                          className="w-2 h-2 rounded-full bg-gray-200 mr-1"
                        />
                      ),
                    )}
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default SymptomTracker;
