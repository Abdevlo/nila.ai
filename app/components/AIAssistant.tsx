import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  Mic,
  Send,
  Volume2,
  MessageCircle,
  ChevronDown,
  Languages,
} from "lucide-react-native";
import { Image } from "expo-image";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface AIAssistantProps {
  userName?: string;
  cyclePhase?: string;
  language?: "english" | "sinhala" | "tamil";
  onLanguageChange?: (language: "english" | "sinhala" | "tamil") => void;
}

const AIAssistant = ({
  userName = "Sarah",
  cyclePhase = "Follicular",
  language = "english",
  onLanguageChange = () => {},
}: AIAssistantProps) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `Hello ${userName}! I'm Nila, your reproductive health assistant. How can I help you today?`,
      isUser: false,
      timestamp: new Date(),
    },
  ]);

  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  // Suggested questions based on cycle phase
  const suggestedQuestions = {
    english: [
      `What should I expect during my ${cyclePhase} phase?`,
      "Why am I experiencing cramps today?",
      "How can I track my fertility window?",
    ],
    sinhala: [
      `මගේ ${cyclePhase} අවධියේදී මම බලාපොරොත්තු විය යුත්තේ කුමක්ද?`,
      "මට අද ඇයි කුරුළෑ හටගන්නේ?",
      "මගේ සරු කාලය ගැන සොයා බැලිය හැක්කේ කෙසේද?",
    ],
    tamil: [
      `எனது ${cyclePhase} கட்டத்தில் நான் என்ன எதிர்பார்க்க வேண்டும்?`,
      "இன்று எனக்கு ஏன் வலி ஏற்படுகிறது?",
      "எனது கருவுறுதல் சாளரத்தை எவ்வாறு கண்காணிக்க முடியும்?",
    ],
  };

  const handleSend = () => {
    if (input.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = {
        english: `Based on your ${cyclePhase} phase, this is normal. Your body is preparing for ovulation by increasing estrogen levels.`,
        sinhala: `ඔබේ ${cyclePhase} අවධිය මත පදනම්ව, මෙය සාමාන්ය දෙයකි. ඔබේ සිරුර ඊස්ට්රජන් මට්ටම වැඩි කිරීමෙන් බිත්තර නිපදවීමට සූදානම් වෙමින් සිටී.`,
        tamil: `உங்கள் ${cyclePhase} கட்டத்தின் அடிப்படையில், இது சாதாரணமானது. உங்கள் உடல் எஸ்ட்ரோஜன் அளவை அதிகரிப்பதன் மூலம் கருமுட்டைக்காக தயாராகிறது.`,
      };

      const aiMessage: Message = {
        id: Date.now().toString(),
        text: aiResponses[language],
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    // Optional: automatically send the question
    // handleSend();
  };

  const handleLanguageChange = (
    newLanguage: "english" | "sinhala" | "tamil",
  ) => {
    onLanguageChange(newLanguage);
    setShowLanguageSelector(false);
  };

  const languageNames = {
    english: "English",
    sinhala: "සිංහල",
    tamil: "தமிழ்",
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="bg-violet-50 rounded-xl overflow-hidden w-full h-[300px]"
    >
      {/* Header */}
      <View className="flex-row justify-between items-center p-3 bg-violet-600">
        <View className="flex-row items-center">
          <MessageCircle size={20} color="white" />
          <Text className="text-white font-bold ml-2 text-lg">
            Nila AI Assistant
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setShowLanguageSelector(!showLanguageSelector)}
          className="flex-row items-center"
        >
          <Languages size={18} color="white" />
          <Text className="text-white ml-1">{languageNames[language]}</Text>
          <ChevronDown size={16} color="white" />
        </TouchableOpacity>
      </View>

      {/* Language selector dropdown */}
      {showLanguageSelector && (
        <View className="absolute top-12 right-2 bg-white shadow-md rounded-md z-10">
          {(["english", "sinhala", "tamil"] as const).map((lang) => (
            <TouchableOpacity
              key={lang}
              className={`px-4 py-2 ${language === lang ? "bg-violet-100" : ""}`}
              onPress={() => handleLanguageChange(lang)}
            >
              <Text>{languageNames[lang]}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Messages */}
      <ScrollView className="flex-1 p-3">
        {messages.map((message) => (
          <View
            key={message.id}
            className={`mb-3 max-w-[85%] ${message.isUser ? "self-end ml-auto" : "self-start"}`}
          >
            <View
              className={`rounded-2xl p-3 ${message.isUser ? "bg-violet-500" : "bg-white border border-gray-200"}`}
            >
              <Text
                className={`${message.isUser ? "text-white" : "text-gray-800"}`}
              >
                {message.text}
              </Text>
            </View>
            <Text
              className={`text-xs mt-1 text-gray-500 ${message.isUser ? "text-right" : "text-left"}`}
            >
              {message.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Suggested questions */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-3 py-2 bg-violet-100"
      >
        {suggestedQuestions[language].map((question, index) => (
          <TouchableOpacity
            key={index}
            className="bg-white border border-violet-300 rounded-full px-3 py-1 mr-2"
            onPress={() => handleSuggestedQuestion(question)}
          >
            <Text className="text-violet-700">{question}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Input area */}
      <View className="flex-row items-center p-2 bg-white border-t border-gray-200">
        <TouchableOpacity className="p-2">
          <Mic size={22} color="#7c3aed" />
        </TouchableOpacity>
        <TextInput
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 mx-2"
          placeholder={
            language === "english"
              ? "Type your question..."
              : language === "sinhala"
                ? "ඔබේ ප්‍රශ්නය ටයිප් කරන්න..."
                : "உங்கள் கேள்வியை தட்டச்சு செய்யவும்..."
          }
          value={input}
          onChangeText={setInput}
          multiline
        />
        <TouchableOpacity className="p-2" onPress={handleSend}>
          <Send size={22} color="#7c3aed" />
        </TouchableOpacity>
        <TouchableOpacity className="p-2">
          <Volume2 size={22} color="#7c3aed" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AIAssistant;
