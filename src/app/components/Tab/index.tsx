import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Summarizer from "../Summarizer"
import QuizCreator from "../QuizCreator"
import QuizChecker from "../QuizChecker"
import ChatInterface from "../ChatInterface"

export function TabsComponent() {
  return (
    <div className="flex h-screen">
      <Tabs defaultValue="chat" className="flex flex-row">
        <TabsList className="flex justify-start flex-col w-40 h-auto border-r">
          <TabsTrigger value="chat" className="w-full py-4">Chat</TabsTrigger>
          <TabsTrigger value="summarizer" className="w-full py-4">Summarizer</TabsTrigger>
          <TabsTrigger value="quiz-generator" className="w-full py-4">Quiz Creator</TabsTrigger>
          <TabsTrigger value="quiz-checker" className="w-full py-4">Quiz Checker</TabsTrigger>
        </TabsList>
        <div className="flex-1">
          <TabsContent value="chat">
            <ChatInterface />
          </TabsContent>
          <TabsContent value="quiz-generator">
            <QuizCreator />
          </TabsContent>
          <TabsContent value="summarizer">
            <Summarizer />
          </TabsContent>
          <TabsContent value="quiz-checker">
            <QuizChecker />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}