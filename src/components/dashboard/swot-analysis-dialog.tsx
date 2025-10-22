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
import { generateSWOAnalysis } from "@/ai/flows/generate-swot-analysis";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ScanLine,
  Sparkles,
  Lightbulb,
  Zap,
  Target,
} from "lucide-react";
import type { SwoAnalysis } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";

export function SwotAnalysisDialog({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [strengths, setStrengths] = useState("");
  const [wants, setWants] = useState("");
  const [analysis, setAnalysis] = useState<SwoAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateAnalysis = async () => {
    if (!strengths.trim() || !wants.trim()) {
      toast({
        title: "Input required",
        description:
          "Please describe your strengths and what you want to achieve.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setAnalysis(null);

    try {
      const result = await generateSWOAnalysis({ strengths, wants });
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
      console.error("Error generating SWO analysis:", error);
      toast({
        title: "Error",
        description: "Failed to generate analysis. Please try again later.",
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
            Generate SWO Analysis
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">
            AI-Powered SWO Analysis
          </DialogTitle>
          <DialogDescription>
            Reflect on your strengths and wants. The AI will identify Opportunities and suggest Targets.
          </DialogDescription>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-6 py-4">
          <div className="space-y-4">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="strengths">Your Strengths (S)</Label>
              <Textarea
                placeholder="What are you good at? What are your recent accomplishments?"
                id="strengths"
                value={strengths}
                onChange={(e) => setStrengths(e.target.value)}
                rows={5}
              />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="wants">What You Want (W)</Label>
              <Textarea
                placeholder="What are your goals? What do you want to change or achieve?"
                id="wants"
                value={wants}
                onChange={(e) => setWants(e.target.value)}
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
                {[...Array(3)].map((_, i) => (
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
                    <Zap className="w-6 h-6 text-accent" />
                    <CardTitle>Opportunities (O)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {analysis.opportunities}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex-row items-center gap-4 space-y-0">
                    <Target className="w-6 h-6 text-primary" />
                    <CardTitle>Targets (T)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {analysis.targets}
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
