import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Settings, Bell } from "lucide-react-native";
import CycleStatusCard from "./components/CycleStatusCard";
import SymptomTracker from "./components/SymptomTracker";
import AIAssistant from "./components/AIAssistant";

export default function HomeScreen() {
  const [userName, setUserName] = useState("Sarah");
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }),
  );

  return (
    <SafeAreaView className="flex-1 bg-violet-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f5f3ff" />
      <ScrollView className="flex-1">
        <View className="px-4 pt-2 pb-6">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-2xl font-bold text-violet-900">Nila</Text>
              <Text className="text-sm text-violet-700">Hello, {userName}</Text>
              <Text className="text-xs text-violet-600">{currentDate}</Text>
            </View>
            <View className="flex-row">
              <TouchableOpacity
                className="w-10 h-10 rounded-full bg-violet-100 mr-2 items-center justify-center"
                onPress={() => console.log("Notifications pressed")}
              >
                <Bell size={20} color="#7c3aed" />
              </TouchableOpacity>
              <TouchableOpacity
                className="w-10 h-10 rounded-full bg-violet-100 items-center justify-center"
                onPress={() => console.log("Settings pressed")}
              >
                <Settings size={20} color="#7c3aed" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Cycle Status Card */}
          <View className="mb-4">
            <CycleStatusCard />
          </View>

          {/* Symptom Tracker */}
          <View className="mb-4">
            <Text className="text-lg font-semibold text-violet-900 mb-2">
              Track Today
            </Text>
            <SymptomTracker />
          </View>

          {/* AI Assistant */}
          <View className="mb-4">
            <Text className="text-lg font-semibold text-violet-900 mb-2">
              Nila Assistant
            </Text>
            <AIAssistant />
          </View>

          {/* Educational Content Preview */}
          <View className="mb-4">
            <Text className="text-lg font-semibold text-violet-900 mb-2">
              For You
            </Text>
            <TouchableOpacity
              className="bg-white p-4 rounded-xl shadow-sm border border-violet-100"
              onPress={() => console.log("Educational content pressed")}
            >
              <Text className="text-violet-900 font-medium mb-1">
                Understanding Your Luteal Phase
              </Text>
              <Text className="text-violet-600 text-sm mb-2">
                Learn how hormonal changes affect your body and mood during this
                phase
              </Text>
              <View className="bg-violet-100 self-start px-3 py-1 rounded-full">
                <Text className="text-violet-700 text-xs">5 min read</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
