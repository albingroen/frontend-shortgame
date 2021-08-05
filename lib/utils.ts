import { ActionSheetIOS } from "react-native";
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
}

export function normalizePhoneNumber(phoneNumber: string) {
  const pn = new PhoneNumber(phoneNumber, "SE");

  if (pn.isValid()) {
    return pn.getNumber();
  }
  return;
}
