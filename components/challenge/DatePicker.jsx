import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import {
  DatePickerModal,
  fr,
  registerTranslation,
} from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { setDuration } from "../../reducers/challenge";
registerTranslation("fr", fr); //pour charger la langue fr bon je pense qu'en vrai vous le saviez deja

export default function DatePicker() {
  const [range, setRange] = React.useState({
    startDate: undefined,
    endDate: undefined,
  });

  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = React.useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      setRange({ startDate, endDate });

      // Dispatch une action Redux avec les dates sélectionnées
      dispatch(
        setDuration({
          startDate: startDate ? startDate.toISOString() : null,
          endDate: endDate ? endDate.toISOString() : null,
        })
      );
    },
    [setOpen, setRange, dispatch] // Ajout de dispatch dans les dépendances
  );

  console.log(range);
  return (
    <SafeAreaProvider>
      <View
        style={{
          justifyContent: "center",
          flex: 1,
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
          Choisir une période
        </Button>
        <DatePickerModal
          locale="fr"
          mode="range"
          visible={open}
          onDismiss={onDismiss}
          startDate={range.startDate}
          endDate={range.endDate}
          onConfirm={onConfirm}
        />
      </View>
    </SafeAreaProvider>
  );
}
