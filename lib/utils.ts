import { ActionSheetIOS } from "react-native";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function wait(timeout: number) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

export default function Confirm({
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
      options: [labelCancel || "Cancel", labelConfirm],
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
