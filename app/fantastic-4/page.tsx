"use client"

import dynamic from "next/dynamic"
import Fantastic4LoadingScreen from "./Fantastic4LoadingScreen"

const Fantastic4PageContent = dynamic(
  () => import("./fantastic-4-content"),
  { loading: () => <Fantastic4LoadingScreen /> }
)

export default function Fantastic4Page() {
  return <Fantastic4PageContent />
}
