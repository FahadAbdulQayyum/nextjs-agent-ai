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
import { BadgePlus, Layers2, MessageCircleDashed, ShieldCheck } from 'lucide-react';

export function TabsComponent() {
  return (
    <div className="flex h-screen">
      <Tabs defaultValue="chat" className="flex flex-row">
        <TabsList className="flex justify-start flex-col w-40 h-auto border-r">
          <TabsTrigger value="chat" className="flex justify-start w-full py-2 space-x-1"><MessageCircleDashed /><p>Chat</p></TabsTrigger>
          <TabsTrigger value="summarizer" className="flex justify-start w-full py-2 space-x-1"><Layers2 /><p>Summarizer</p></TabsTrigger>
          <TabsTrigger value="quiz-generator" className="flex justify-start w-full py-2 space-x-1"><BadgePlus /><p>Quiz Creator</p></TabsTrigger>
          <TabsTrigger value="quiz-checker" className="flex justify-start w-full py-2 space-x-1"><ShieldCheck /><p>Quiz Checker</p></TabsTrigger>
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