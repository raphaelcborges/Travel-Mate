import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const destinations = [
  { name: "Paris, France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34" },
  { name: "Santorini, Greece", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff" },
  { name: "Kyoto, Japan", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e" }
];

async function seedDestinations() {
  const destinationsRef = collection(db, "destinations");
  for (const dest of destinations) {
    await addDoc(destinationsRef, dest);
  }
  console.log("Destinations added!");
}

seedDestinations();
