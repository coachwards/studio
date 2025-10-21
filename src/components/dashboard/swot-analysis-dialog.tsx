"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { generateSWOTAnalysis } from "@/ai/flows/generate-swot-analysis";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ScanLine,
  Sparkles,
  Lightbulb,
  ShieldAlert,
  Zap,
  Target,
  CloudRain,
} from "lucide-react";
import type { SwotAnalysis } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";

export function SwotAnalysisDialog({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState("");
  const [blockers, setBlockers] = useState("");
  const [analysis, setAnalysis] = useState<SwotAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateAnalysis = async () => {
    if (!userData.trim() || !blockers.trim()) {
      toast({
        title: "Input required",
        description:
          "Please fill out both your current situation and your blockers.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setAnalysis(null);

    try {
      const result = await generateSWOTAnalysis({ userData, blockers });
      if (result) {
        setAnalysis(result);
      } else {
        toast({
          title: "Analysis Failed",
          description:
            "The AI couldn't generate an analysis. Please try refining your input.",
        });
      }
    } catch (error) {
      console.error("Error generating SWOT analysis:", error);
      toast({
        title: "Error",
        description: "Failed to generate SWOT analysis. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" className="w-full max-w-xs">
            <ScanLine className="mr-2 h-4 w-4" />
            Generate SWOT Analysis
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">
            AI-Powered SWOT Analysis
          </DialogTitle>
          <DialogDescription>
            Reflect on your life across all quadrants. The AI will identify your
            Strengths, Weaknesses, Opportunities, and Threats.
          </DialogDescription>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-6 py-4">
          <div className="space-y-4">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="user-data">Your Current Situation</Label>
              <Textarea
                placeholder="Describe your goals, targets, and recent activities in health, work, finance, and social life."
                id="user-data"
                value={userData}
                onChange={(e) => setUserData(e.target.value)}
                rows={5}
              />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="blockers">Blockers & Impediments</Label>
              <Textarea
                placeholder="What's holding you back? e.g., 'Procrastination', 'Lack of funds', 'Not enough time'"
                id="blockers"
                value={blockers}
                onChange={(e) => setBlockers(e.target.value)}
                rows={3}
              />
            </div>
            <Button
              onClick={handleGenerateAnalysis}
              disabled={loading}
              className="w-full"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {loading ? "Analyzing..." : "Generate Analysis"}
            </Button>
          </div>

          <div className="space-y-4">
            {loading && (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <Skeleton className="h-6 w-1/2" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-16 w-full" />
                        </CardContent>
                    </Card>
                ))}
              </div>
            )}
            {analysis && (
              <div className="space-y-4 animate-in fade-in duration-500">
                <Card>
                  <CardHeader className="flex-row items-center gap-4 space-y-0">
                    <Target className="w-6 h-6 text-primary" />
                    <CardTitle>Strengths</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {analysis.strengths}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex-row items-center gap-4 space-y-0">
                    <ShieldAlert className="w-6 h-6 text-destructive" />
                    <CardTitle>Weaknesses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {analysis.weaknesses}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex-row items-center gap-4 space-y-0">
                    <Zap className="w-6 h-6 text-accent" />
                    <CardTitle>Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {analysis.opportunities}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex-row items-center gap-4 space-y-0">
                    <CloudRain className="w-6 h-6 text-muted-foreground" />
                    <CardTitle>Threats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {analysis.threats}
                    </p>
                  </CardContent>
                </Card>
                 <Card className="border-accent bg-accent/10">
                  <CardHeader className="flex-row items-center gap-4 space-y-0">
                    <Lightbulb className="w-6 h-6 text-accent" />
                    <CardTitle>Personalized Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/90">
                      {analysis.personalizedInsights}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
