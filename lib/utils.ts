import { ActionSheetIOS, Platform } from "react-native";
import PhoneNumber from "awesome-phonenumber";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function wait(timeout: number) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

export function Confirm({
  labelCancel,
  labelConfirm,
  onConfirm,
}: {
  labelCancel?: string;
  labelConfirm: string;
  onConfirm: () => void;
}) {
  if (Platform.OS === "ios") {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [labelCancel || "Avbryt", labelConfirm],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          onConfirm();
        }
      }
    );
  } else {
    onConfirm();
  }
}

export function normalizePhoneNumber(phoneNumber: string) {
  const pn = new PhoneNumber(phoneNumber, "SE");

  if (pn.isPossible()) {
    return pn.getNumber();
  }
  return;
}

export const iosShadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.025,
  shadowRadius: 3,
  elevation: 5,
};

export const androidShadow = {
  elevation: 1,
};

export const SORT_VARIABLES = [
  {
    title: "Handicap",
    id: "handicap",
  },
  {
    title: "Korta puttar",
    id: "shortPuts",
  },
  {
    title: "Långa puttar",
    id: "longPuts",
  },
  {
    title: "Chippar",
    id: "chip",
  },
  {
    title: "Pitchar",
    id: "pitch",
  },
  {
    title: "Bunkerslag",
    id: "bunker",
  },
];
