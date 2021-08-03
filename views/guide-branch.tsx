import React, { ReactNode, useEffect } from "react";
import tailwind from "tailwind-rn";
import { GUIDE_DATA } from "./guide";
import { Text, SafeAreaView, ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function GuideBranchView({
  navigation,
  route: {
    params: { id },
  },
}) {
  const branch = GUIDE_DATA.find((branch) => branch.id === id);

  useEffect(() => {
    if (branch) {
      navigation.setOptions({
        title: branch.title,
      });
    }
  }, [branch]);

  if (!branch) {
    return null;
  }

  return (
    <SafeAreaView style={tailwind("bg-gray-100")}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={tailwind("p-4 min-h-full")}>
        {branch.sections?.map((section) => (
          <View style={tailwind("mb-8")} key={section.title}>
            <Text style={tailwind("text-2xl font-semibold")}>
              {section.title}
            </Text>

            {section.text && (
              <Text
                style={tailwind("text-base text-gray-500 mt-2 font-medium")}
              >
                {section.text}
              </Text>
            )}

            {section.title === "Poäng" && (
              <View style={tailwind("mt-4")}>
                {branch.id === "shortPuts" ? <PointsGrid1 /> : <PointsGrid2 />}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function PointsGrid1() {
  return (
    <GridWrapper>
      <GridRow>
        <GridCell align="start">Puttar</GridCell>
        <GridCell>1</GridCell>
        <GridCell>2</GridCell>
        <GridCell>3</GridCell>
        <GridCell>{">3"}</GridCell>
      </GridRow>
      <GridRow>
        <GridCell align="start">Poäng</GridCell>
        <GridCell>1</GridCell>
        <GridCell>0</GridCell>
        <GridCell>-1</GridCell>
        <GridCell>-2</GridCell>
      </GridRow>
    </GridWrapper>
  );
}

function PointsGrid2() {
  return (
    <GridWrapper>
      <GridRow>
        <GridCell align="start">Avst.</GridCell>
        <GridCell>I hål</GridCell>
        <GridCell>1m</GridCell>
        <GridCell>1-2m</GridCell>
        <GridCell>2-3m</GridCell>
        <GridCell>{">3m"}</GridCell>
        <GridCell>{">green"}</GridCell>
      </GridRow>
      <GridRow>
        <GridCell align="start">Poäng</GridCell>
        <GridCell>3</GridCell>
        <GridCell>2</GridCell>
        <GridCell>1</GridCell>
        <GridCell>0</GridCell>
        <GridCell>-1</GridCell>
        <GridCell>-2</GridCell>
      </GridRow>
    </GridWrapper>
  );
}

function GridWrapper({ children }: { children: ReactNode }) {
  return (
    <View
      style={{
        borderWidth: 0.5,
        ...tailwind("border border-gray-300"),
      }}
    >
      {children}
    </View>
  );
}

function GridRow({ children }: { children: ReactNode }) {
  return <View style={tailwind("flex-row")}>{children}</View>;
}

function GridCell({
  children,
  align = "center",
}: {
  children: ReactNode;
  align?: "start" | "center" | "end";
}) {
  return (
    <View
      style={{
        borderWidth: 0.5,
        ...tailwind(
          `border-gray-300 flex-1 justify-center items-${align} p-0.5`
        ),
      }}
    >
      <Text style={tailwind("font-medium text-xs")}>{children}</Text>
    </View>
  );
}
