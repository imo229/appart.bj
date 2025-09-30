import { Redirect } from "expo-router";
import React from "react";

export default function AppIndexLayout() {
  // Redirect to the new tab layout
  return <Redirect href="/(tabs)" />;
}
