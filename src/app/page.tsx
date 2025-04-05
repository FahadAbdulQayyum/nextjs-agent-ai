import Form from "./components/Form";
import Home from "./components/Home";
import Summarizer from "./components/Summarizer";
import { TabsComponent } from "./components/Tab";

// HomePage component serves as the main entry point for the home page
export default function HomePage() {
  return (
    <div className="mt-16">
      {/* <Home /> */}
      {/* <Form /> */}
      {/* <Summarizer /> */}
      <TabsComponent />
    </div>
  );
}
