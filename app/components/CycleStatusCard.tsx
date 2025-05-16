import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Circle, Calendar, Droplet } from "lucide-react-native";

interface CycleStatusCardProps {
  currentPhase?: string;
  daysUntilNextPeriod?: number;
  cycleDay?: number;
  totalCycleDays?: number;
  fertilityStatus?: string;
  phaseColor?: string;
  keyMetrics?: {
    label: string;
    value: string;
  }[];
}

const CycleStatusCard = ({
  currentPhase = "Follicular Phase",
  daysUntilNextPeriod = 14,
  cycleDay = 7,
  totalCycleDays = 28,
  fertilityStatus = "Low Fertility",
  phaseColor = "#FF6B8B",
  keyMetrics = [
    { label: "Cycle Length", value: "28 days" },
    { label: "Period Length", value: "5 days" },
    { label: "Avg. Symptoms", value: "Mild" },
  ],
}: CycleStatusCardProps) => {
  // Calculate the progress percentage for the cycle indicator
  const progressPercentage = (cycleDay / totalCycleDays) * 100;

  return (
    <View className="bg-white rounded-xl p-4 shadow-md w-full">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-bold">Your Cycle</Text>
        <TouchableOpacity>
          <Text className="text-blue-500">Details</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-between">
        {/* Left side - Cycle progress indicator */}
        <View className="items-center justify-center w-24 h-24 relative">
          <View
            className="w-24 h-24 rounded-full border-4 justify-center items-center"
            style={{ borderColor: "#EEEEEE" }}
          >
            <View
              className="absolute top-0 left-0 w-24 h-24 rounded-full border-4"
              style={{
                borderColor: phaseColor,
                borderLeftColor: "transparent",
                borderBottomColor:
                  progressPercentage < 50 ? "transparent" : phaseColor,
                borderRightColor:
                  progressPercentage < 75 ? "transparent" : phaseColor,
                transform: [{ rotate: `${progressPercentage * 3.6}deg` }],
              }}
            />
            <Text className="text-2xl font-bold">{cycleDay}</Text>
            <Text className="text-xs text-gray-500">Day</Text>
          </View>
        </View>

        {/* Right side - Cycle information */}
        <View className="flex-1 ml-4">
          <View
            className="px-3 py-1 rounded-full self-start mb-1"
            style={{ backgroundColor: `${phaseColor}20` }}
          >
            <Text style={{ color: phaseColor }}>{currentPhase}</Text>
          </View>

          <View className="flex-row items-center mt-2">
            <Calendar size={16} color="#666" />
            <Text className="ml-2 text-gray-700">
              {daysUntilNextPeriod} days until next period
            </Text>
          </View>

          <View className="flex-row items-center mt-2">
            <Droplet size={16} color="#666" />
            <Text className="ml-2 text-gray-700">{fertilityStatus}</Text>
          </View>
        </View>
      </View>

      {/* Key metrics */}
      <View className="flex-row justify-between mt-4 pt-3 border-t border-gray-100">
        {keyMetrics.map((metric, index) => (
          <View key={index} className="items-center">
            <Text className="text-xs text-gray-500">{metric.label}</Text>
            <Text className="font-semibold">{metric.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CycleStatusCard;
