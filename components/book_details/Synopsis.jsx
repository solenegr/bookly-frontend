import React from "react";
import { View, Text } from "react-native";

const Synopsis = () => {
  return (
    <View className="mt-6">
      <Text className="text-gray-800 font-nunitoExtraBold text-xl">
        Synopsis
      </Text>
      <Text className="text-gray-700 text-[1rem] mt-2 leading-relaxed font-nunitoSemiBold">
        Dans l’archipel de Terremer, la magie repose sur la connaissance des
        vrais noms des choses. Ged, un jeune sorcier talentueux mais
        orgueilleux, libère par erreur une ombre maléfique qui le poursuit à
        travers le monde. Pour s’en débarrasser, il devra affronter des dragons,
        explorer des terres inconnues et comprendre la véritable nature du
        pouvoir.
      </Text>
    </View>
  );
};

export default Synopsis;
